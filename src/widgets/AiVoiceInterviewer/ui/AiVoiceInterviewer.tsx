import { useEffect, useRef, useState } from "react";
import throttle from "lodash.throttle";
import styles from "./AiVoiceInterviewer.module.scss";
import { NormalButton } from "@/shared/ui/Button";
import { GPTWaveVisualizer } from "@/widgets/GPTWaveVisualizer";
import { useAiVoiceStore } from "@/shared/stores/useAiVoiceStore";
import { Input } from "@/shared/ui/Input";
import { Textarea } from "@/shared/ui/Textarea/Textarea";
import clsx from "clsx";
import { postGptRequest } from "@/pages/StudyMentorPage/model/services/postGptRequest";
import { useAdjustingsStore } from "@/shared/stores/useAdjustingsStore";

export function AiVoiceInterviewer() {
  const [isInterviewing, setIsInterviewing] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [volume, setVolume] = useState(0);
  const [scoreList, setScoreList] = useState<number[]>([]);
  const [averageScore, setAverageScore] = useState<number | null>(null);

  const {
    position,
    setPosition,
    stack,
    setStack,
    description,
    setDescription,
  } = useAiVoiceStore();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const { token } = useAdjustingsStore();

  const throttledSetVolume = useRef(
    throttle((newVolume: number) => {
      setVolume(newVolume);
    }, 100)
  ).current;

  useEffect(() => {
    if (!isInterviewing) return;

    let localTrack: MediaStreamTrack;

    async function startSession() {
      const instructions = `You are an interviewer for ${
        position ||
        "senior frontend developer with more than 5 years of experience."
      }  
${description || ""}
Your questions should touch ${
        stack || "React, Typescript, Javascript, Next.js"
      }.
Start with a phrase:
Hi. Please, introduce yourself.
AND BE CLEAR THAT I RESPOND YOU WITH NAME, EXPERIENCE, MAIN STACK AND DESCRIPTION.
If my answer is not clear, ask that part again to remind me about it.
DO NOT ACCEPT ANSWERS WITHOUT CLEAR INFORMATION AND PUSH ME AGAIN.
YOU ARE STRICT INTERVIEWER WHICH ONLY ASK QUESTIONS AND PUSH.
IF I CANNOT ANSWER THE QUESTION, PUSH ME AGAIN AND ONLY AFTER IT TELL ME THE ANSWER.
AFTER MY RESPONSE START WITH: "Very good | good | bad | very bad answer.
"
`;

      const tokenRes = await fetch(
        "https://api.openai.com/v1/realtime/sessions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${
              token || import.meta.env.VITE_OPENAI_API_KEY
            }`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o-mini-realtime-preview",
            voice: "ash",
            instructions,
          }),
        }
      );

      const tokenData = await tokenRes.json();
      const EPHEMERAL_KEY = tokenData.client_secret.value;

      if (!pcRef.current || pcRef.current.signalingState === "closed") {
        pcRef.current = new RTCPeerConnection();
      }
      const pc = pcRef.current;

      if (!audioRef.current) {
        audioRef.current = document.createElement("audio");
        audioRef.current.autoplay = true;
      }

      pc.ontrack = (e) => {
        const stream = e.streams[0];
        if (audioRef.current) {
          audioRef.current.srcObject = stream;
        }

        if (!audioContextRef.current) {
          audioContextRef.current = new AudioContext();
          audioContextRef.current.resume().catch(console.error);
        }

        const ctx = audioContextRef.current;
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        analyserRef.current = analyser;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const checkSpeaking = () => {
          analyser.getByteFrequencyData(dataArray);
          const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          throttledSetVolume(Math.round(avg));
          animationRef.current = requestAnimationFrame(checkSpeaking);
        };
        checkSpeaking();
      };

      const ms = await navigator.mediaDevices.getUserMedia({ audio: true });
      localTrack = ms.getTracks()[0];
      pc.addTrack(localTrack);

      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;
      dc.onmessage = (e) => {
        const event = JSON.parse(e.data);
        console.log("event:", JSON.stringify(event));

        if (
          event.type === "conversation.item.created" &&
          event.item?.role === "user"
        ) {
          const text =
            event.item?.content?.[0]?.text ??
            event.item?.content?.[0]?.transcript;
          if (text) {
            setLog((prev) => [...prev, `You: ${text}`]);
          } else {
            console.warn(
              "User message received, but no transcript available:",
              event
            );
          }
        } else if (event.type === "response") {
          setLog((prev) => [...prev, `AI: ${event.content}`]);
        } else if (event.type === "response.done") {
          const message = event.response?.output?.[0]?.content?.[0]?.transcript;
          if (message) {
            setLog((prev) => [...prev, `AI: ${message}`]);
          }
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const sdpRes = await fetch(
        `https://api.openai.com/v1/realtime?model=gpt-4o-mini-realtime-preview`,
        {
          method: "POST",
          body: offer.sdp,
          headers: {
            Authorization: `Bearer ${EPHEMERAL_KEY}`,
            "Content-Type": "application/sdp",
          },
        }
      );

      const answer = {
        type: "answer",
        sdp: await sdpRes.text(),
      };
      await pc.setRemoteDescription(answer as RTCSessionDescriptionInit);
    }

    startSession();

    return () => {
      pcRef.current?.close();
      localTrack?.stop();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      audioContextRef.current?.close();
    };
  }, [isInterviewing, position, stack, description, throttledSetVolume]);

  useEffect(() => {
    const aiMessages = log.filter((l) => l.startsWith("AI:"));
    const questionsPerScore = 2;

    if (!isInterviewing || aiMessages.length === 0) return;
    if (aiMessages.length % questionsPerScore !== 0) return;

    const recentAiQuestions = aiMessages
      .slice(-questionsPerScore)
      .map((q) => q.replace("AI: ", ""));

    postGptRequest(
      [
        {
          role: "system",
          content:
            "Based on the interview questions you asked, estimate how well the candidate is performing from 0 to 100. The more clarifying questions you had to ask, the worse they are doing. BE STRICT WITH THE ANSWER. Return only a number.",
        },
        {
          role: "user",
          content: recentAiQuestions.join("\n"),
        },
      ],
      ""
    ).then((res: string) => {
      const score = parseInt(res.match(/\d+/)?.[0] || "0");
      const newScores = [...scoreList, score];
      setScoreList(newScores);
      const avg = Math.round(
        newScores.reduce((a, b) => a + b, 0) / newScores.length
      );
      setAverageScore(avg);
    });
  }, [log, isInterviewing]);

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <Input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Stack"
          value={stack}
          onChange={(e) => setStack(e.target.value)}
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className={styles.buttonContainer}>
        <NormalButton
          onClick={() => setIsInterviewing((prev) => !prev)}
          className={clsx(styles.activeButton, isInterviewing && styles.active)}
        >
          {isInterviewing ? "" : "Start Interview"}
        </NormalButton>

        <GPTWaveVisualizer volume={volume} isInterviewing={isInterviewing} />
      </div>

      <p>
        Chances to pass an interview:{" "}
        <strong>
          {averageScore !== null && log.length > 0
            ? `${averageScore}%`
            : "100%"}
        </strong>
      </p>

      {scoreList.length > 0 && <p>Past scores: {scoreList.join(", ")}</p>}

      {/* <div className={styles.logContainer}>
        {log.map((entry, idx) => (
          <Typography key={idx} variant="body-2">
            {entry}
          </Typography>
        ))}
      </div> */}
    </div>
  );
}
