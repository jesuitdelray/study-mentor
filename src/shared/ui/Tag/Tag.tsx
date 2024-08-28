import clsx from "clsx";
import { Typography } from "../Typography/Typography";
import styles from "./Tag.module.scss";
import { useState } from "react";
import { PlusIcon, XIcon } from "@/shared/icons";

type TTagProps = {
  children: string | string[];
  size: "small" | "large";
  isEmpty?: boolean;
  isIcon?: boolean;
  onClose?: () => void;
  className?: string;
};

export function Tag({ children, size = "small", isEmpty = false, onClose, isIcon, className }: TTagProps) {
  const [isHidden, setIsHidden] = useState(false);

  function handleClose() {
    setIsHidden(true);
    onClose?.();
  }

  if (isEmpty) {
    return (
      <div className={styles.isEmptyContainer}>
        <PlusIcon className={styles.plusIcon} />
        <Typography variant="label-4" color="greyscale600">
          Tag
        </Typography>
      </div>
    );
  }

  return (
    <div className={clsx(styles.container, styles[size], isHidden && styles.hidden, className)}>
      <Typography variant={size === "small" ? "label-5" : "label-4"} color="greyscale800">
        {children}
      </Typography>
      {isIcon ? <XIcon onClick={handleClose} className={styles.closeIcon} /> : null}
    </div>
  );
}
