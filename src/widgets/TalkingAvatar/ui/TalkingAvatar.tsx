import { useEffect, useRef, useState } from "react";
import styles from "./TalkingAvatar.module.scss";
import clsx from "clsx";

export function TalkingAvatar({ audio }: { audio: HTMLAudioElement }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrame = useRef<number>();

  useEffect(() => {
    if (!audio) return;

    if (!contextRef.current) {
      contextRef.current = new AudioContext();
    }

    const ctx = contextRef.current;

    if (!sourceRef.current) {
      try {
        sourceRef.current = ctx.createMediaElementSource(audio);
      } catch (e) {
        console.warn("Audio already connected:", e);
        return;
      }
    }

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;

    sourceRef.current.connect(analyser);
    analyser.connect(ctx.destination);
    analyserRef.current = analyser;

    const buffer = new Uint8Array(analyser.frequencyBinCount);

    function tick() {
      analyser.getByteFrequencyData(buffer);
      const avg = buffer.reduce((a, b) => a + b, 0) / buffer.length;
      setIsSpeaking(avg > 20);
      animationFrame.current = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      cancelAnimationFrame(animationFrame.current!);
    };
  }, [audio]);

  return (
    <div className={styles.avatar}>
      <div className={styles.face}>
        <div className={styles.eyes} />
        <div className={clsx(styles.mouth, isSpeaking && styles.mouthOpen)} />
      </div>
    </div>
  );
}
