import { WarningCircleIcon } from "@/shared/icons";
import { Typography } from "../Typography/Typography";
import styles from "./Textarea.module.scss";
import clsx from "clsx";
import { TextareaHTMLAttributes } from "react";

type TTextareaProps = {
  className?: string;
  error?: string;
  description?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea(props: TTextareaProps) {
  const { className, children, error, description, ...otherProps } = props;

  const bottomContent = !!error ? (
    <div className={styles.errorContainer}>
      <WarningCircleIcon className={styles.errorIcon} />
      <Typography variant="body-3" color="error-red">
        {error}
      </Typography>
    </div>
  ) : (
    description && (
      <Typography className={styles.statusText} variant="body-3" color="greyscale500">
        {description}
      </Typography>
    )
  );

  return (
    <div className={styles.container}>
      <textarea
        rows={8}
        className={clsx(styles.textarea, !!error && styles.textareaError, className)}
        {...otherProps}
      />
      {bottomContent}
    </div>
  );
}
