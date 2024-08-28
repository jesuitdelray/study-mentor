import clsx from "clsx"
import { Typography } from "../Typography"
import styles from "./Hint.module.scss"
import { CSSProperties } from "react"
import { CheckIcon } from "@/shared/icons"

export function Hint({
    label,
    isActive,
    className,
    style,
}: {
    label?: string
    isActive?: boolean
    className?: string
    style?: CSSProperties
}) {
    return (
        <div className={clsx(styles.container, className)} style={style}>
            <div className={clsx(styles.iconContainer, isActive && styles.activeIconContainer)}>
                <CheckIcon className={styles.icon} />
            </div>
            <Typography variant={"body-3"} color={"greyscale500"}>
                {label}
            </Typography>
        </div>
    )
}
