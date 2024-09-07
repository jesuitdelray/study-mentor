import { useState, useEffect, useRef, useMemo } from "react";
import { Input } from "@/shared/ui/Input";
import { NormalButton } from "@/shared/ui/Button";
import { Message } from "./Message/Message";
import { Typography } from "@/shared/ui/Typography";
import styles from "./HistorySidebar.module.scss";
import clsx from "clsx";
import { message } from "@/pages/HomePage/ui/HomePage";

export function HistorySidebar({
  messages,
  setMessages,
  onSuccess,
  messageText,
  setMessageText,
}: {
  messages: message[];
  setMessages: (messages: any) => void;
  onSuccess: () => void;
  messageText: string;
  setMessageText: (message: string) => void;
}) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [transcript, setTranscript] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const isDesktop = window.innerWidth > 1024;

  useEffect(() => {
    recognitionRef.current = new (window as any).webkitSpeechRecognition();
    recognitionRef.current.lang = "ru-RU";
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event: any) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      setTranscript((prevTranscript) => prevTranscript + finalTranscript);

      if (interimTranscript) {
        console.log("Interim Transcript: ", interimTranscript);
      }
    };

    recognitionRef.current.onend = () => {
      if (listening) {
        recognitionRef.current.start();
      }
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      if (event.error === "no-speech") {
        recognitionRef.current.start();
      }
    };
  }, [listening]);

  function toggleListening() {
    if (!listening) {
      recognitionRef.current.start();
      setTranscript("");
      setMessageText("");
    } else {
      recognitionRef.current.stop();
      setMessageText(transcript);
      setTranscript("");
    }
    setListening(!listening);
  }

  function addNewMessage() {
    setMessages((prev: message[]) => [
      ...prev,
      { role: "user", content: messageText, time: new Date().toLocaleTimeString() },
    ]);
    setMessageText("");
    onSuccess();
  }

  function onPressEnter({ key }: { key: string }) {
    if (key !== "Enter") return;

    if (messageText.length > 0) {
      addNewMessage();
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const content = useMemo(() => {
    if (messages.length === 0) {
      return (
        <div className={styles.emptySpaceContainer}>
          <Typography variant="body-2">No messages yet</Typography>
        </div>
      );
    } else {
      return messages.map((message, index) => (
        <div key={message.content + message.time}>
          <Message role={message.role} content={message.content} time={message.time} />
          {index < messages.length - 1 && <div className={styles.divider} />}
        </div>
      ));
    }
  }, [messages]);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {content}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.inputContainer}>
        <Input
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message here"
          className={styles.textField}
          inputSize={isDesktop ? "small" : "large"}
          onKeyDown={onPressEnter}
        />

        <NormalButton
          className={styles.button}
          size={isDesktop ? "medium" : "large"}
          onClick={addNewMessage}
          isDisabled={messageText === ""}
        >
          Send
        </NormalButton>
        <NormalButton
          className={clsx(styles.button, listening && styles.micButtonActive)}
          size={isDesktop ? "medium" : "large"}
          onClick={toggleListening}
        >
          {listening ? "Stop Recording" : "Start Recording"}
        </NormalButton>
      </div>
    </div>
  );
}
