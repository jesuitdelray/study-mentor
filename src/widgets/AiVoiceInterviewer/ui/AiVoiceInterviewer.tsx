import { useEffect, useRef, useState } from "react";
import styles from "./AiVoiceInterviewer.module.scss";
import { NormalButton } from "@/shared/ui/Button";
import { Typography } from "@/shared/ui/Typography";
import { TalkingAvatar } from "@/widgets/TalkingAvatar/ui/TalkingAvatar";

export function AiVoiceInterviewer() {
  const [isInterviewing, setIsInterviewing] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);

  const [log, setLog] = useState<string[]>([]);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);

  useEffect(() => {
    if (!isInterviewing) return;

    let localTrack: MediaStreamTrack;

    async function startSession() {
      const tokenRes = await fetch(
        "https://api.openai.com/v1/realtime/sessions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o-mini-realtime-preview",
            voice: "ash",
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
        setAudioEl(audioRef.current);
      }
      pc.ontrack = (e) => {
        if (audioRef.current) {
          audioRef.current.srcObject = e.streams[0];
        }
      };

      const ms = await navigator.mediaDevices.getUserMedia({ audio: true });
      localTrack = ms.getTracks()[0];
      pc.addTrack(localTrack);

      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;
      dc.onmessage = (e) => {
        const event = JSON.parse(e.data);
        if (event.type === "transcript") {
          setLog((prev) => [...prev, `You: ${event.transcript}`]);
        } else if (event.type === "response") {
          setLog((prev) => [...prev, `AI: ${event.content}`]);
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
      await pc.setRemoteDescription(answer);
    }

    startSession();

    return () => {
      pcRef.current?.close();
      localTrack?.stop();
    };
  }, [isInterviewing]);

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <Typography variant="body-1">AI Voice Interviewer</Typography>
        <NormalButton onClick={() => setIsInterviewing((prev) => !prev)}>
          {isInterviewing ? "Stop Interview" : "Start Interview"}
        </NormalButton>
      </div>

      {audioEl && <TalkingAvatar audio={audioEl} />}

      <div className={styles.logContainer}>
        {log.map((entry, idx) => (
          <Typography key={idx} variant="body-2">
            {entry}
          </Typography>
        ))}
      </div>
    </div>
  );
}
