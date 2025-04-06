import { create } from "zustand";
import { persist } from "zustand/middleware";

type AiVoiceStore = {
  position: string;
  setPosition: (value: string) => void;
  stack: string;
  setStack: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
};

export const useAiVoiceStore = create<AiVoiceStore>()(
  persist(
    (set) => ({
      position: "",
      setPosition: (value: string) => set({ position: value }),
      stack: "",
      setStack: (value: string) => set({ stack: value }),
      description: "",
      setDescription: (value: string) => set({ description: value }),
    }),
    {
      name: "aiVoice-store",
    }
  )
);
