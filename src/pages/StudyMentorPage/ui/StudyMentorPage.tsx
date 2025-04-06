import { useState } from "react";
import styles from "./StudyMentorPage.module.scss";
import { StudyMentorHeader } from "@/widgets/StudyMentorHeader";
import { SettingsSidebar } from "@/widgets/SettingsSidebar/SettingsSidebar";
import { postGptRequest } from "../model/services/postGptRequest";
import { speakMessage } from "@/shared/lib/speakMessage";
import { ELocalStorageKeys } from "@/shared/constants";
import { generateMessageContext } from "../lib/lib";
import { ChatSidebar } from "@/widgets/ChatSidebar";
import { useAdjustingsStore } from "@/shared/stores/useAdjustingsStore";

export type message = {
  role: string;
  content: string;
  time: string;
};

export function StudyMentorPage() {
  const initialMessagesString = localStorage.getItem(
    ELocalStorageKeys.MESSAGES
  );
  const initialMessages = JSON.parse(initialMessagesString || "[]");
  const [messages, setMessages] = useState<message[]>(initialMessages);
  const [messageText, setMessageText] = useState("");

  const [isFirstMessageSent, setIsFirstMessageSent] = useState(
    initialMessages.length !== 0
  );

  const { topic, position, token, mode, isAllowedVolume } =
    useAdjustingsStore();

  const messageContext = generateMessageContext(
    mode,
    topic,
    position,
    messages,
    messageText,
    isFirstMessageSent
  );

  async function sendToGPT() {
    if (messageText.trim().length === 0) return;

    try {
      const response = await postGptRequest(messageContext, token);
      const trimmed = response.trim();

      setIsFirstMessageSent(true);
      setMessages((prev) => [
        ...prev,
        {
          role: "Assistant",
          content: trimmed,
          time: new Date().toLocaleTimeString(),
        },
      ]);

      await speakMessage(isAllowedVolume, trimmed, "en-US", token);
    } catch (error) {
      console.error("Error fetching GPT response:", error);
    }
  }

  function onSaveMessages() {
    localStorage.setItem(ELocalStorageKeys.MESSAGES, JSON.stringify(messages));
  }

  function onClearAll() {
    setMessages([]);
    localStorage.removeItem(ELocalStorageKeys.MESSAGES);
  }

  return (
    <div className={styles.container}>
      <StudyMentorHeader
        messages={messages}
        onSave={onSaveMessages}
        onClearAll={onClearAll}
      />
      <div className={styles.contentContainer}>
        <SettingsSidebar />
        <ChatSidebar
          messages={messages}
          setMessages={setMessages}
          onSuccess={sendToGPT}
          messageText={messageText}
          setMessageText={setMessageText}
        />
      </div>
    </div>
  );
}
