import { ReactNode, useEffect, useState } from "react";
import styles from "./Preview.module.scss";
import { MODAL_ANIMATION_DELAY } from "../Drawer/const/const";
import { Portal } from "../Drawer/components/Portal";
import clsx from "clsx";

interface TPreviewProps {
  className?: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Preview = (props: TPreviewProps) => {
  const { className, children, isOpen, onClose } = props;
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen && !isMounted) {
      setIsOpening(true);
      setIsMounted(true);
      setTimeout(() => {
        setIsOpening(false);
      }, MODAL_ANIMATION_DELAY);
    } else if (!isOpen && isMounted) {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setIsMounted(false);
      }, MODAL_ANIMATION_DELAY);
    }
  }, [isOpen, isMounted]);

  if (!isMounted) return null;

  return (
    <Portal>
      <div
        className={clsx(
          styles.Preview,
          isMounted && styles.isOpen,
          isClosing && styles.isClosing,
          isOpening && styles.isOpening
        )}
      >
        <div
          className={styles.overlay}
          onClick={(e) => {
            onClose?.();
            e.stopPropagation();
          }}
        >
          <div className={clsx(styles.content, className)} onClick={(e) => e.stopPropagation()}>
            <div className={styles.previewContent}>{children}</div>
          </div>
        </div>
      </div>
    </Portal>
  );
};
