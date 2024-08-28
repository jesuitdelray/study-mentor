import { WarningCircleIcon } from "@/shared/icons"
import { Typography } from "../Typography/Typography"
import styles from "./Input.module.scss"
import clsx from "clsx"
import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react"

export type TInputProps = {
    value: string | number
    className?: string
    error?: string
    inputSize?: "small" | "large"
    description?: string
    currencyIcon?: ReactNode
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export function Input(props: TInputProps) {
    const {
        className,
        value,
        error,
        inputSize,
        description,
        currencyIcon,
        ...otherProps
    }: TInputProps = props
    return (
        <div className={clsx(styles.container, className)}>
            <input
                className={clsx(styles.input, !!error && styles.inputError)}
                style={inputSize === "small" ? { height: "40px" } : { height: "56px" }}
                value={value}
                {...otherProps}
            />
            {!!error ? (
                <div className={styles.errorContainer}>
                    <WarningCircleIcon className={styles.errorIcon} />
                    <Typography variant="body-3" color="error-red">
                        {error || "This is an error message"}
                    </Typography>
                </div>
            ) : (
                description && (
                    <Typography className={styles.statusText} variant="body-3">
                        {description}
                    </Typography>
                )
            )}
            {currencyIcon && <div className={styles.currencyIcon}>{currencyIcon}</div>}
        </div>
    )
}
