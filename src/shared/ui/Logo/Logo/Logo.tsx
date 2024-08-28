import { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import styles from "./Logo.module.scss";
import { CompanyIcon } from "@/shared/icons";

type TLogoProps = {
  logo?: string | null;
} & DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export function Logo({ logo }: TLogoProps) {
  if (!logo) {
    return (
      <div className={styles.placeholderContainer}>
        <div className={styles.placeholder} />
        <CompanyIcon className={styles.placeholderIcon} />
      </div>
    );
  }

  return <img src={logo} alt="Logo" className={styles.logo} />;
}
