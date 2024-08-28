import clsx from "clsx";
import styles from "./Skeleton.module.scss";

type TSkeletonProps = {
  width: number;
  height: number;
  borderRadius?: number;
  className?: string;
};

export function Skeleton({ width, height, borderRadius, className }: TSkeletonProps) {
  return (
    <div
      className={clsx(styles.container, className)}
      style={{ width: `${width}px`, height: `${height}px`, borderRadius: `${borderRadius}px` }}
    />
  );
}
