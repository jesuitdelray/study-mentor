import { ReactNode, useEffect } from "react"
import styles from "./Drawer.module.scss"
import clsx from "clsx"
import { Portal } from "../components/Portal"
import { Typography } from "../../Typography"
import { XIcon } from "@/shared/icons"

type TDrawerProps = {
    className?: string
    children: ReactNode
    isOpen: boolean
    position: "left" | "right"
    onClose: () => void
    title?: string
}

export function Drawer({ className, children, isOpen, onClose, position, title }: TDrawerProps) {
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth

        if (isOpen) {
            document.body.style.overflow = "hidden"
            document.body.style.paddingRight = `${scrollBarWidth}px`
        } else {
            document.body.style.overflow = originalStyle
            document.body.style.paddingRight = ""
        }

        return () => {
            document.body.style.overflow = originalStyle
            document.body.style.paddingRight = ""
        }
    }, [isOpen])
    return (
        <Portal>
            <div
                className={clsx(isOpen ? styles.overlay : null)}
                onClick={() => {
                    onClose?.()
                }}
            >
                <div
                    className={clsx(styles.drawer, styles[position], isOpen && styles.isOpen)}
                    onClick={e => {
                        e.stopPropagation()
                    }}
                >
                    <div className={clsx(styles.content)}>
                        <div className={styles.headerContainer}>
                            <Typography
                                variant="heading-7"
                                color="greyscale900"
                                className={styles.title}
                            >
                                {title}
                            </Typography>
                            <div
                                className={styles.cross}
                                onClick={e => {
                                    onClose?.()
                                    e.stopPropagation()
                                }}
                            >
                                <XIcon />
                            </div>
                        </div>
                        <div className={clsx(styles.contentBlock, className)}>{children}</div>
                    </div>
                </div>
            </div>
        </Portal>
    )
}
