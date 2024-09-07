import { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import { HistorySidebar } from "@/widgets/HistorySidebar/ui/HistorySidebar";
import { Header } from "@/widgets/Header";
import { SettingsSidebar } from "@/widgets/SettingsSidebar/SettingsSidebar";
import { postGptRequest } from "../model/services/postGptRequest";
import { speakMessage } from "@/shared/lib/speakMessage";

export type message = {
  role: string;
  content: string;
  time: string;
};

export function HomePage() {
  const initialMessagesString = localStorage.getItem("messages");
  const initialMessages = JSON.parse(initialMessagesString || "[]");
  const [messages, setMessages] = useState<message[]>(initialMessages);
  const [messageText, setMessageText] = useState("");

  const [isFirstMessageSent, setIsFirstMessageSent] = useState(initialMessages.length !== 0);

  const [topic, setTopic] = useState(localStorage.getItem("topic") || "React");
  const [position, setPosition] = useState(localStorage.getItem("position") || "");
  const [token, setToken] = useState("");

  const [isAllowed, setIsAllowed] = useState(false);

  function extractQuestions(messages: message[]) {
    return messages
      .filter((msg) => msg.role === "Assistant" && /вопрос/i.test(msg.content))
      .map((msg) => {
        const match = msg.content.match(/вопрос[:\s]*(.*)/i);
        return match ? match[1].trim() : "";
      })
      .filter((question) => question !== "");
  }

  useEffect(() => {
    localStorage.setItem("topic", topic);
  }, [topic]);

  useEffect(() => {
    localStorage.setItem("position", position);
  }, [position]);

  const messageContext = !isFirstMessageSent
    ? [
        {
          role: "system",
          content: `
            МОЙ ОТВЕТ НЕ ЯВЛЯЕТСЯ АДЕКВАТНЫМ ТЕКСТОМ - ПИШИ ПО ШАБЛОНУ:
            "Вопрос: ( твой следующий вопрос на тему "${topic}" ${position ? `для вакансии "${position}"` : ""} )" 
            Ты мне задаешь вопросы на тему "${topic}" ${position ? `для вакансии "${position}"` : ""}, я на них отвечаю.
            ИЗБЕГАЙ ВОПРОСОВ В СПИСКЕ: ${extractQuestions(messages)} !
            ТВОЙ ОТВЕТ ДОЛЖЕН БЫТЬ В ФОРМАТЕ:
            Вопрос: ( твой следующий вопрос на тему "${topic}" ${position ? `для вакансии "${position}"` : ""} )
            "`,
        },
        { role: "user", content: messageText },
      ]
    : [
        {
          role: "system",
          content: `
        МОЙ ОТВЕТ НЕ ЯВЛЯЕТСЯ АДЕКВАТНЫМ ТЕКСТОМ - ПИШИ ПО ШАБЛОНУ:
        "Вопрос: ( твой следующий вопрос на тему "${topic}"${position ? `для вакансии "${position}"` : ""} )"
        Продолжай задавать вопросы на тему "${topic}" ${position ? `для вакансии "${position}"` : ""}, я на них отвечаю.
        ТВОЙ ОТВЕТ ДОЛЖЕН БЫТЬ В ФОРМАТЕ:
        Оценка ответа: (0-10),
        Правильный ответ: (правильный ответ) ,
        Следующий вопрос: ( твой следующий вопрос на тему "${topic}" ${position ? `для вакансии "${position}"` : ""} )
        "`,
        },
        { role: "user", content: messageText },
      ];

  async function sendToGPT() {
    try {
      const response = await postGptRequest(messageContext, token);
      setIsFirstMessageSent(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "Assistant",
          content: response.trim(),
          time: new Date().toLocaleTimeString(),
        },
      ]);
      speakMessage(isAllowed, response);
    } catch (error) {
      console.error("Error fetching GPT response:", error);
    }
  }

  function onSaveMessages() {
    localStorage.setItem("messages", JSON.stringify(messages));
  }

  function onClearAll() {
    setMessages([]);
    localStorage.removeItem("messages");
  }

  const adjustingsObj = {
    topic,
    setTopic,
    position,
    setPosition,
    token,
    setToken,
    isAllowedVolume: isAllowed,
    setIsAllowedVolume: setIsAllowed,
  };

  return (
    <div className={styles.container}>
      <Header messages={messages} onSave={onSaveMessages} onClearAll={onClearAll} adjustingsObj={adjustingsObj} />
      <div className={styles.contentContainer}>
        <SettingsSidebar adjustingsObj={adjustingsObj} />
        <HistorySidebar
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
