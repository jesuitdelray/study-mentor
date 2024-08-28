import clsx from "clsx"
import { Typography } from "../Typography/Typography"
import styles from "./Note.module.scss"
import { PlusIcon } from "@/shared/icons"

type TNoteProps = {
    note: string
    dayOfWeek: string
    isEmpty?: boolean
}

export function Note({ dayOfWeek, note, isEmpty = false }: TNoteProps) {
    const content = isEmpty ? (
        <div className={styles.isEmptyContainer}>
            <PlusIcon className={styles.plusIcon} />
            <Typography variant="label-4" color="greyscale600">
                Note
            </Typography>
        </div>
    ) : (
        <div className={clsx(styles.container)}>
            <Typography variant={"label-5"} color="greyscale800" className={styles.noteField}>
                {note}
            </Typography>
            <div className={styles.dividerRound} />
            <Typography variant="body-3" color="greyscale600">
                {dayOfWeek}
            </Typography>
        </div>
    )

    return <div className={styles.note}>{content}</div>
}
