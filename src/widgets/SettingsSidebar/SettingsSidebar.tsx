import { Typography } from "@/shared/ui/Typography"
import styles from "./SettingsSidebar.module.scss"
import clsx from "clsx"
import { Input } from "@/shared/ui/Input"

export function SettingsSidebar({
    setTopic,
    topic,
    position,
    setPosition,
}: {
    setTopic: (topic: string) => void
    topic: string
    setPosition: (position: string) => void
    position: string
}) {
    const isOpen = true

    const isDesktop = window.innerWidth > 768

    return (
        <div className={clsx(styles.container, isOpen && styles.open)}>
            <div className={styles.innerContainer}>
                <Typography className={styles.settingsTitle} variant="label-2">
                    Settings
                </Typography>
                <div className={styles.mainTopicContainer}>
                    <Typography
                        className={styles.mainTopicTitle}
                        variant="body-3"
                        color="greyscale500"
                    >
                        Main Topic
                    </Typography>
                    <Input
                        value={topic}
                        onChange={e => setTopic(e.target.value)}
                        className={styles.input}
                        inputSize={isDesktop ? "small" : "large"}
                    />
                </div>
                <div className={styles.positionContainer}>
                    <Typography
                        className={styles.positionTitle}
                        variant="body-3"
                        color="greyscale500"
                    >
                        Position
                    </Typography>
                    <Input
                        value={position}
                        onChange={e => setPosition(e.target.value)}
                        className={styles.input}
                        inputSize={isDesktop ? "small" : "large"}
                    />
                </div>
            </div>
            {/* <div className={styles.caretIconContainer} onClick={handleClick}>
                <SettingsIcon
                    style={{
                        transform: isOpen ? "rotate(90deg)" : "rotate(-90deg)",
                        transition: "transform 0.3s",
                    }}
                />
            </div> */}
        </div>
    )
}
