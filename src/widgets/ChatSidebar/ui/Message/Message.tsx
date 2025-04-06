import { Typography } from "@/shared/ui/Typography"
import styles from "./Message.module.scss"

export function Message({ role, content, time }: { role: string; content: string; time: string }) {
    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <div className={styles.image} />
                <div className={styles.infoContainer}>
                    <Typography variant="body-1">{role}</Typography>
                    <Typography variant="body-3">{time}</Typography>
                </div>
            </div>
            <Typography variant="body-2"> {content} </Typography>
        </div>
    )
}
