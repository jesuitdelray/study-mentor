import {
  useState,
  useEffect,
  useRef,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";
import { NormalButton } from "@/shared/ui/Button";
import { Message } from "./Message/Message";
import { Typography } from "@/shared/ui/Typography";
import styles from "./ChatSidebar.module.scss";
import clsx from "clsx";
import { message } from "@/pages/StudyMentorPage/ui/StudyMentorPage";
import { Textarea } from "@/shared/ui/Textarea/Textarea";
import { cancelSpeakMessage } from "@/shared/lib/cancelSpeakMessage";
import { IS_DESKTOP_DEFAULT } from "@/shared/constants";

export function ChatSidebar({
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
  setMessageText: Dispatch<SetStateAction<string>>;
}) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    recognitionRef.current = new (window as any).webkitSpeechRecognition();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.continuous = true;
    recognitionRef.current.maxAlternatives = 1;

    recognitionRef.current.onresult = (event: any) => {
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        setMessageText((prev) => prev + ` ${finalTranscript}`);
      }
    };

    recognitionRef.current.onend = () => {
      setListening(false);
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      if (event.error === "no-speech") {
        recognitionRef.current.start();
      }
    };
  }, [setMessageText]);

  function toggleListening() {
    if (!listening) {
      recognitionRef.current.start();
      cancelSpeakMessage();
      setListening(true);
    } else {
      recognitionRef.current.stop();
      setListening(false);
    }
  }

  function addNewMessage(event: React.FormEvent) {
    event.preventDefault();
    if (messageText.trim().length === 0) return;

    setMessages((prev: message[]) => [
      ...prev,
      {
        role: "user",
        content: messageText,
        time: new Date().toLocaleTimeString(),
      },
    ]);
    setMessageText("");
    recognitionRef.current.stop();
    setListening(false);
    onSuccess();
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
          <Message
            role={message.role}
            content={message.content}
            time={message.time}
          />
          {index < messages.length - 1 && <div className={styles.divider} />}
        </div>
      ));
    }
  }, [messages]);

  const actionButton = messageText ? (
    <NormalButton
      className={styles.button}
      size={IS_DESKTOP_DEFAULT ? "medium" : "large"}
      type="submit"
      isDisabled={messageText === ""}
    >
      Send
    </NormalButton>
  ) : (
    <NormalButton
      className={styles.talkButton}
      size={IS_DESKTOP_DEFAULT ? "medium" : "large"}
      type="submit"
      isDisabled={!!messageText}
    >
      💬
    </NormalButton>
  );

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {content}
        <div ref={messagesEndRef} />
      </div>
      <form className={styles.inputContainer} onSubmit={addNewMessage}>
        <Textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              addNewMessage(e as any);
            }
          }}
          placeholder="Type your message here"
          className={styles.textField}
        />
        <div className={styles.buttonsContainer}>
          {actionButton}
          <NormalButton
            className={clsx(styles.button, listening && styles.micButtonActive)}
            size={IS_DESKTOP_DEFAULT ? "medium" : "large"}
            onClick={toggleListening}
            variant="secondary"
            type="button"
          >
            {listening ? "Stop Recording" : "Start Recording"}
          </NormalButton>
        </div>
      </form>
    </div>
  );
}
