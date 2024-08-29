import { SettingsIcon } from "@/shared/icons/SettingsIcon"
import styles from "./HamburgerMenu.module.scss"
import { NormalButton } from "@/shared/ui/Button"
import { Typography } from "@/shared/ui/Typography"
import clsx from "clsx"
import { Input } from "@/shared/ui/Input"

export type THamburgerMenuProps = {
    isOpen: boolean
    toggle: () => void
    onSave: () => void
    onClearAll: () => void
    totalQuestions: number
    averageScore: number
    adjustingsObj: {
        topic: string
        position: string
        token: string
        setTopic: (topic: string) => void
        setPosition: (position: string) => void
        setToken: (token: string) => void
    }
}

export function HamburgerMenu({
    isOpen,
    toggle,
    onSave,
    onClearAll,
    totalQuestions,
    averageScore,
    adjustingsObj,
}: THamburgerMenuProps) {
    const { topic, position, token, setTopic, setPosition, setToken } = adjustingsObj

    return (
        <div className={styles.container}>
            <NormalButton
                onClick={toggle}
                className={styles.burgerButton}
                variant="tertiary"
                size="large"
            >
                <SettingsIcon
                    style={{
                        transform: isOpen ? "rotate(90deg)" : "rotate(-90deg)",
                        transition: "transform 0.3s",
                    }}
                />
            </NormalButton>

            <div className={clsx(styles.menuItems, isOpen && styles.isOpen)}>
                <Typography className={styles.totalQuestions} variant="body-1" color="greyscale500">
                    Total questions: {totalQuestions}
                </Typography>
                <Typography className={styles.averageScore} variant="body-1" color="greyscale500">
                    Average score: {averageScore}
                </Typography>
                <Input
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    placeholder="Topic"
                    className={styles.input}
                />
                <Input
                    value={position}
                    onChange={e => setPosition(e.target.value)}
                    placeholder="Position"
                    className={styles.input}
                />
                <Input
                    value={token}
                    onChange={e => setToken(e.target.value)}
                    placeholder="Token"
                    className={styles.input}
                />
                <div className={styles.buttonsContainer}>
                    <NormalButton onClick={onSave} className={styles.saveButton} size="large">
                        Save
                    </NormalButton>
                    <NormalButton
                        onClick={onClearAll}
                        className={styles.clearAllButton}
                        variant="secondary"
                        size="large"
                    >
                        Clear all
                    </NormalButton>
                </div>
            </div>
        </div>
    )
}
