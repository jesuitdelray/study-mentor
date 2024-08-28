import { HTMLAttributes, ReactNode } from "react";
import styles from "./Typography.module.scss";
import clsx from "clsx";

type TTypographyVariant =
  | "body-1"
  | "body-2"
  | "body-3"
  | "label-1"
  | "label-2"
  | "label-3"
  | "label-4"
  | "label-5"
  | "heading-1"
  | "heading-2"
  | "heading-3"
  | "heading-4"
  | "heading-5"
  | "heading-6"
  | "heading-7";

type TTypographyColor =
  | "greyscale100"
  | "greyscale200"
  | "greyscale300"
  | "greyscale400"
  | "greyscale500"
  | "greyscale600"
  | "greyscale700"
  | "greyscale800"
  | "greyscale900"
  | "error-red";

export type ITypographyProps = {
  variant?: TTypographyVariant;
  color?: TTypographyColor;
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLParagraphElement>;

export function Typography({
  className,
  children,
  variant = "body-1",
  color = "greyscale600",
  ...otherProps
}: ITypographyProps) {
  return (
    <p className={clsx(styles.text, className, styles[variant], styles[color])} {...otherProps}>
      {children}
    </p>
  );
}
