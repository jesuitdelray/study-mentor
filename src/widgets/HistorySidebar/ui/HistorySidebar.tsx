import styles from "./HistorySidebar.module.scss"
import { Input } from "@/shared/ui/Input"
import { useEffect, useMemo, useRef } from "react"
import { NormalButton } from "@/shared/ui/Button"
import { Message } from "./Message/Message"
import { Typography } from "@/shared/ui/Typography"
import { message } from "@/pages/HomePage/ui/HomePage"

export function HistorySidebar({
    messages,
    setMessages,
    onSuccess,
    messageText,
    setMessageText,
}: {
    messages: message[]
    setMessages: (messages: any) => void
    onSuccess: () => void
    messageText: string
    setMessageText: (message: string) => void
}) {
    const messagesEndRef = useRef<null | HTMLDivElement>(null)

    function addNewMessage() {
        setMessages((prev: message[]) => [
            ...prev,
            { role: "user", content: messageText, time: new Date().toLocaleTimeString() },
        ])
        setMessageText("")
        onSuccess()
    }

    function onPressEnter({ key }: { key: string }) {
        if (key !== "Enter") return

        if (messageText.length > 0) {
            addNewMessage()
        }
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const content = useMemo(() => {
        switch (true) {
            case messages.length === 0:
                return (
                    <div className={styles.emptySpaceContainer}>
                        <Typography variant="body-2">No messages yet</Typography>
                    </div>
                )
            case messages.length > 0:
                return messages?.map((message, index) => (
                    <div key={message.content + message.time}>
                        <Message
                            role={message.role}
                            content={message.content}
                            time={message.time}
                        />
                        {index < messages.length - 1 && <div className={styles.divider} />}
                    </div>
                ))
            default:
                null
        }
    }, [messages])

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                {content}
                <div ref={messagesEndRef} />
            </div>
            <div className={styles.inputContainer}>
                <Input
                    value={messageText}
                    onChange={e => setMessageText(e.target.value)}
                    placeholder="Type your message here"
                    className={styles.textField}
                    inputSize="small"
                    onKeyDown={onPressEnter}
                />

                <NormalButton
                    className={styles.button}
                    size="medium"
                    onClick={addNewMessage}
                    isDisabled={messageText === ""}
                >
                    Send
                </NormalButton>
            </div>
        </div>
    )
}
