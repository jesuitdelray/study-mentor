import clsx from "clsx"
import styles from "./DropdownInput.module.scss"
import {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
    useEffect,
    useRef,
    useState,
} from "react"
import { Typography } from "../Typography/Typography"
import { CaretRightIcon, WarningCircleIcon } from "@/shared/icons"

type TDropdownOption = {
    value: string
    label: string
}

type TDropdownInputProps = {
    className?: string
    error?: string
    options?: TDropdownOption[]
    selected?: string
    isOpen?: boolean
    onClick?: () => void
    description?: string
    rightCaretIcon?: boolean
    onSelect?: (selected: string) => void
    onClose?: () => void
    value?: string
    placeholder?: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    inputSize?: "small" | "large"
    onKeyDown?: (
        event: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    ) => void
}

export function DropdownInput({
    error,
    options = [],
    onSelect,
    className,
    description,
    rightCaretIcon,
    onClose,
    onChange,
    placeholder,
    onClick,
    value,
    inputSize = "small",
    onKeyDown,
}: TDropdownInputProps) {
    const [filteredOptions, setFilteredOptions] = useState<TDropdownOption[]>([])
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownOpen &&
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                onClose?.()
                setDropdownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [dropdownOpen, onClose])

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        onChange(e)
        const inputValue = e.target.value

        const newFilteredOptions = options.filter(
            option =>
                option.label.toLowerCase().startsWith(inputValue.toLowerCase()) &&
                option.label !== inputValue
        )

        setFilteredOptions(newFilteredOptions)
        setDropdownOpen(newFilteredOptions.length > 0 && inputValue.length > 0)
    }

    function handleOptionSelect(optionLabel: string) {
        onSelect?.(optionLabel)
        onClose?.()
        setDropdownOpen(false)
    }

    function onKeyDownHandler(
        e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    ) {
        onKeyDown?.(e)
        if (e.key === "Enter") {
            setDropdownOpen(false)
        }
    }

    function inputHandler() {
        setDropdownOpen(prev => !prev)
        onClick?.()

        if (!dropdownOpen) {
            setFilteredOptions(options)
        }
    }

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.inputContainer}>
                <div className={styles.inputBlock}>
                    <input
                        className={clsx(styles.input, !!error && styles.inputError, className)}
                        style={{
                            paddingRight: rightCaretIcon ? "38px" : "16px",
                            height: inputSize === "small" ? "40px" : "56px",
                        }}
                        value={value}
                        onChange={handleInputChange}
                        onClick={inputHandler}
                        placeholder={placeholder}
                        onKeyDown={onKeyDownHandler}
                    />

                    {rightCaretIcon && (
                        <CaretRightIcon className={styles.caretRightIcon} onClick={inputHandler} />
                    )}
                </div>
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
            </div>
            <div
                className={clsx(
                    styles.dropdownContainer,
                    (!dropdownOpen || filteredOptions.length === 0 || !!error) &&
                        styles.closedContainer
                )}
            >
                {filteredOptions.map((option, index) => (
                    <Typography
                        variant="label-4"
                        color="greyscale800"
                        key={`${option.label}-${index}`}
                        onClick={() => handleOptionSelect(option.label)}
                        className={styles.option}
                    >
                        {option.label}
                    </Typography>
                ))}
            </div>
        </div>
    )
}
