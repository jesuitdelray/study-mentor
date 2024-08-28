import { CSSProperties } from "react";
import styles from "./Loader.module.scss";

export function Loader({ baseColor }: { baseColor?: string }) {
  const style = {
    "--base-color": baseColor || "white"
  } as CSSProperties;

  return <div className={styles.loader} style={style} />;
}
