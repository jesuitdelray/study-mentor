import { create } from "zustand";
import { persist } from "zustand/middleware";
import { EDiscussionMods, ELocalStorageKeys } from "@/shared/constants";
import { Dispatch, SetStateAction } from "react";

type AdjustingsStore = {
  topic: string;
  setTopic: (value: string) => void;
  position: string;
  setPosition: (value: string) => void;
  token: string;
  setToken: (value: string) => void;
  isAllowedVolume: boolean;
  setIsAllowedVolume: Dispatch<SetStateAction<boolean>>;
  mode: EDiscussionMods;
  setMode: (value: EDiscussionMods) => void;
};

export const useAdjustingsStore = create<AdjustingsStore>()(
  persist(
    (set) => ({
      topic: "React",
      setTopic: (value) => set({ topic: value }),
      position: "",
      setPosition: (value) => set({ position: value }),
      token:
        new URLSearchParams(window.location.search).get(
          ELocalStorageKeys.TOKEN
        ) || "",
      setToken: (value) => set({ token: value }),
      isAllowedVolume: false,
      setIsAllowedVolume: (value) => set({ isAllowedVolume: value as boolean }),
      mode: EDiscussionMods.QA,
      setMode: (value) => set({ mode: value }),
    }),
    {
      name: "adjustings-storage",
    }
  )
);
