import styles from "./Checkbox.module.scss"
import clsx from "clsx"
import { Typography } from "../Typography/Typography"
import { Dispatch, SetStateAction, type ReactNode, MouseEvent } from "react"
import { CheckIcon } from "@/shared/icons"

type TCheckboxProps = {
    label?: string | ReactNode
    value: boolean
    onChange: Dispatch<SetStateAction<boolean>>
}

export function Checkbox({ label, value, onChange }: TCheckboxProps) {
    function toggleCheckbox(e: MouseEvent) {
        e.stopPropagation()
        onChange(prev => !prev)
    }

    return (
        <div
            className={styles.checkboxContainer}
            onClick={(e: MouseEvent) => {
                toggleCheckbox(e)
            }}
        >
            <div className={clsx(styles.checkbox, value && styles.checked)}>
                {value && <CheckIcon className={styles.checkmark} />}
            </div>
            {label && (
                <Typography variant="label-4" color="greyscale800" className={styles.label}>
                    {label}
                </Typography>
            )}
        </div>
    )
}
