import { Typography } from "../Typography/Typography"
import styles from "./CurrencyInput.module.scss"
import clsx from "clsx"
import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react"
import { WarningCircle1Icon } from "@/shared/icons"

export type TInputProps = {
    value: string | number
    className?: string
    error?: string
    onChange: (value: string) => void
    inputSize?: "small" | "large"
    description?: string
    currencyIcon?: ReactNode
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export function CurrencyInput(props: TInputProps) {
    const {
        className,
        value,
        error,
        inputSize,
        onChange,
        description,
        currencyIcon,
        ...otherProps
    }: TInputProps = props

    function handleChange(event: ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) {
        const newValue = event.target.value
        if (/^\d*$/.test(newValue)) {
            onChange(newValue)
        }
    }

    return (
        <div className={clsx(styles.container, className)}>
            <input
                className={clsx(styles.input, !!error && styles.inputError)}
                style={inputSize === "small" ? { height: "40px" } : { height: "56px" }}
                value={value}
                onChange={event => {
                    handleChange(event, (newValue: string) => onChange(newValue))
                }}
                {...otherProps}
            />
            {!!error ? (
                <div className={styles.errorContainer}>
                    <WarningCircle1Icon className={styles.errorIcon} />
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
