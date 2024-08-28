import { useState } from "react"
import { labels } from "../const/const"
import styles from "./Header.module.scss"
import clsx from "clsx"
import { NormalButton } from "@/shared/ui/Button"
import { Typography } from "@/shared/ui/Typography"
import { message } from "@/pages/HomePage/ui/HomePage"

export type THeaderProps = {
    messages: message[]
    onSave: () => void
    onClearAll: () => void
}

export function Header({ messages, onSave, onClearAll }: THeaderProps) {
    const [activeSection, setActiveSection] = useState(labels[0])

    function calculateScoresFromMessages() {
        const scores = messages
            .filter(msg => msg.role === "Assistant")
            .flatMap(msg =>
                Array.from(msg.content.matchAll(/Оценка ответа: (\d+)/g), m => parseInt(m[1], 10))
            )
        const totalScore = scores.reduce((acc, score) => acc + score, 0)
        const averageScore = scores.length ? (totalScore / scores.length).toFixed(1) : 0
        const totalQuestions = scores.length

        return { totalQuestions, averageScore }
    }

    const { totalQuestions, averageScore } = calculateScoresFromMessages()

    const isDesktop = window.innerWidth > 768

    return (
        <div className={styles.container}>
            {labels.map(label => (
                <p
                    key={label}
                    className={clsx(styles.label, activeSection === label && styles.active)}
                    onClick={() => setActiveSection(label)}
                >
                    {label}
                </p>
            ))}
            <div className={styles.rightSideContainer}>
                {isDesktop && (
                    <>
                        <Typography variant="body-2">Total Questions: {totalQuestions}</Typography>
                        <Typography variant="body-2">Average Score: {averageScore} / 10</Typography>
                        <div className={styles.verticalDivider} />
                    </>
                )}
                <NormalButton
                    onClick={onSave}
                    size={isDesktop ? "medium" : "large"}
                    variant="primary"
                    isDisabled={messages.length === 0}
                    className={styles.saveBtn}
                >
                    Save messages
                </NormalButton>
                <NormalButton
                    onClick={onClearAll}
                    size={isDesktop ? "medium" : "large"}
                    variant="secondary"
                    isDisabled={messages.length === 0}
                    className={styles.clearBtn}
                >
                    Clear all
                </NormalButton>
            </div>
        </div>
    )
}
