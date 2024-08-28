import { PlusIcon } from "@/shared/icons";
import styles from "./AddLogo.module.scss";
import { HTMLAttributes } from "react";

export function AddLogo({ ...otherProps }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={styles.addLogoContainer} {...otherProps}>
      <PlusIcon className={styles.addLogoContainerIcon} />
    </div>
  );
}
