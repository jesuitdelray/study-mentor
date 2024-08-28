import { ButtonHTMLAttributes, ReactNode } from "react"
import styles from "./NormalButton.module.scss"
import clsx from "clsx"

type TNormalButtonProps = {
    children?: ReactNode
    className?: string
    isDisabled?: boolean
    isSubmitting?: boolean
    size?: "small" | "medium" | "large"
    variant?: "primary" | "secondary" | "tertiary"
    color?:
        | "greyscale100"
        | "greyscale200"
        | "greyscale300"
        | "greyscale400"
        | "greyscale500"
        | "greyscale600"
        | "greyscale700"
        | "greyscale800"
        | "greyscale900"
    leftIcon?: ReactNode | boolean
    rightIcon?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export function NormalButton(props: TNormalButtonProps) {
    const {
        children,
        className,
        isDisabled = false,
        isSubmitting = false,
        variant = "primary",
        size = "small",
        leftIcon,
        rightIcon,
        color,
        ...otherProps
    } = props

    return (
        <button
            className={clsx(
                styles.btn,
                isDisabled && styles.disabled,
                className,
                isSubmitting && styles.isSubmitting,
                rightIcon && !isSubmitting && styles.hasRightIcon,
                styles[variant],
                styles[size]
            )}
            disabled={isDisabled}
            style={color && { color: `var(--${color})` }}
            {...otherProps}
        >
            {leftIcon && !isSubmitting && leftIcon}
            {children}
            {rightIcon}
        </button>
    )
}
