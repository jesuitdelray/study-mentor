import clsx from "clsx";
import styles from "./DropshadowMenu.module.scss";
import { Typography } from "../Typography/Typography";
import { ReactNode, useEffect, useRef } from "react";

type TDropshadowMenuProps = {
  isOpen: boolean;
  options: ReactNode[];
  value?: string;
  onChange?: (option: ReactNode) => void;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width?: string;
  onClose?: () => void;
  optionClassName?: string;
  dividerIndexRate?: number | number[];
};

export function DropshadowMenu({
  options,
  isOpen,
  top,
  left,
  right,
  bottom,
  width,
  onClose,
  dividerIndexRate
}: TDropshadowMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isOpen) {
        onClose?.();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={menuRef}
      className={clsx(styles.container, !isOpen && styles.closedContainer)}
      style={{ top: top, left: left, right: right, bottom: bottom, width: width ? width : "fit-content" }}
    >
      {options?.map((option, index) => {
        function shouldShowDivider(index: number, rate?: number | number[]) {
          if (typeof rate === "number") {
            return index !== 0 && index % rate === 0;
          } else if (Array.isArray(rate)) {
            return rate.includes(index);
          }
          return false;
        }

        return (
          <div key={`${Math.floor(index * Math.random() * 123123123)}`}>
            {shouldShowDivider(index, dividerIndexRate) && <div className={styles.divider} />}
            {option}
          </div>
        );
      })}
    </div>
  );
}
