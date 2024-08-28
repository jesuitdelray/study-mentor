import { ReactNode, useEffect, useState } from "react"
import styles from "./Modal.module.scss"
import { MODAL_ANIMATION_DELAY } from "../Drawer/const/const"
import { Portal } from "../Drawer/components/Portal"
import clsx from "clsx"
import { Typography } from "../Typography/Typography"
import { XIcon } from "@/shared/icons"

interface ModalProps {
    className?: string
    children: ReactNode
    isOpen: boolean
    onClose: () => void
    width?: string
    isHeader?: boolean
    title?: string
    lazy?: boolean
}

export const Modal = (props: ModalProps) => {
    const { className, children, isOpen, onClose, lazy, title, isHeader = true, width } = props
    const [isOpening, setIsOpening] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        if (isOpen && !isMounted) {
            setIsOpening(true)
            setIsMounted(true)
            setTimeout(() => {
                setIsOpening(false)
            }, MODAL_ANIMATION_DELAY)
        } else if (!isOpen && isMounted) {
            setIsClosing(true)
            setTimeout(() => {
                setIsClosing(false)
                setIsMounted(false)
            }, MODAL_ANIMATION_DELAY)
        }
    }, [isOpen, isMounted])

    if (!isMounted) return null

    return (
        <Portal>
            <div
                className={clsx(
                    styles.Modal,
                    isMounted && styles.isOpen,
                    isClosing && styles.isClosing,
                    isOpening && styles.isOpening
                )}
            >
                <div
                    className={styles.overlay}
                    onClick={e => {
                        onClose?.()
                        e.stopPropagation()
                    }}
                >
                    <div
                        className={clsx(styles.content, className)}
                        onClick={e => e.stopPropagation()}
                        style={{ width: width ? width : "450px" }}
                    >
                        {isHeader && (
                            <div className={styles.headerContainer}>
                                <div className={styles.titleContainer}>
                                    {(title && (
                                        <div className={styles.titleSubContainer}>
                                            {/* <CaretLeftIcon
                                            onClick={() => setIsOpen(false)}
                                            style={{ width: "20px", height: "20px" }}
                                        /> */}
                                            <Typography
                                                variant="heading-7"
                                                className={styles.title}
                                            >
                                                {title}
                                            </Typography>
                                        </div>
                                    )) || <div className={styles.titleSpace} />}
                                </div>
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
                        )}
                        <div className={styles.modalContent}>{children}</div>
                    </div>
                </div>
            </div>
        </Portal>
    )
}
