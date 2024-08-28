import { ButtonHTMLAttributes, ReactNode } from "react"
import styles from "./SquareButton.module.scss"
import clsx from "clsx"

type TSquareButtonProps = {
    children?: ReactNode
    className?: string
    isDisabled?: boolean
    isSubmitting?: boolean
    size?: "small" | "medium" | "large"
    variant?: "primary" | "secondary" | "tertiary"
} & ButtonHTMLAttributes<HTMLButtonElement>

export function SquareButton(props: TSquareButtonProps) {
    const {
        children,
        className,
        isDisabled = false,
        isSubmitting = false,
        variant = "primary",
        size = "small",
        ...otherProps
    } = props

    return (
        <button
            className={clsx(
                styles.btn,
                { [styles.disabled]: isDisabled, [styles.isSubmitting]: isSubmitting },
                [className, styles[variant], styles[size]]
            )}
            disabled={isDisabled}
            {...otherProps}
        >
            {children}
        </button>
    )
}
