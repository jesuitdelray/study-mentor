import clsx from "clsx";
import styles from "./SelectionDropdown.module.scss";
import { Typography } from "../Typography/Typography";
import { HTMLAttributes, useEffect, useRef } from "react";
import { CaretDownIcon } from "@/shared/icons";

type TSelectionOptions = {
  value: string;
  label: string;
};

type TSelectionDropdownProps = {
  isOpen: boolean;
  options: TSelectionOptions[];
  onChange?: (value: string) => void;
  onClose?: () => void;
  onFocus?: () => void;
  inputSize?: "small" | "large";
  value?: string;
  className?: string;
  dropdownPosition?: "top" | "bottom";
  maxHeight?: number;
  isMaxWidth?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export function SelectionDropdown({
  options,
  onChange,
  onClose,
  onFocus,
  isOpen,
  value,
  inputSize = "small",
  className,
  dropdownPosition = "bottom",
  maxHeight = 320,
  isMaxWidth,
}: TSelectionDropdownProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  function handleSelect(selectedValue: string) {
    onChange?.(selectedValue);
    onClose?.();
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className={styles.upperContainer} ref={containerRef}>
      <div
        className={clsx(styles.labelContainer, className)}
        onClick={(e) => {
          e.stopPropagation();
          onFocus?.();
        }}
        style={inputSize === "small" ? { height: "40px" } : { height: "56px" }}
      >
        <Typography variant="body-2" color="greyscale900">
          {value}
        </Typography>
        <CaretDownIcon className={styles.caretDownIcon} />
      </div>
      <div
        className={clsx(
          styles.container,
          !isOpen && styles.closedContainer,
          dropdownPosition === "top" && styles.topPosition
        )}
        style={{ maxHeight, width: isMaxWidth ? "calc(100% - 4px)" : "auto" }}
      >
        {options?.map((option) => (
          <Typography
            variant="label-4"
            color="greyscale800"
            key={option.label}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect(option.value);
            }}
            className={styles.option}
          >
            {option.label}
          </Typography>
        ))}
      </div>
    </div>
  );
}
