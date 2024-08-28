import { ChangeEvent, useRef } from "react";
import styles from "./UploadImage.module.scss";
import { NormalButton } from "../Button";
import { Typography } from "../Typography/Typography";
import { EditIcon, PlusIcon, TrashIcon } from "@/shared/icons";

type TUploadImageProps = {
  onUpload: (data: string) => void;
  image: string;
  onRemove: () => void;
  isLoading: boolean;
};

export function UploadImage({ onUpload, image, onRemove, isLoading }: TUploadImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleUploadClick() {
    fileInputRef.current && fileInputRef.current.click();
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && typeof e.target.result === "string") {
            onUpload(e.target.result);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  function handleRemove() {
    onRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const logo = image ? (
    <img src={image} alt="logo" className={styles.pic} />
  ) : (
    <div className={styles.uploadLogoIconContainer}>
      <PlusIcon />
    </div>
  );

  return (
    <div className={styles.logoBlock}>
      <div className={styles.logoContent}>
        {logo}
        <div className={styles.logoBlockRight}>
          <div className={styles.logoActionsContent}>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept=".png, .jpg, .jpeg"
              onChange={handleFileChange}
            />
            <div className={styles.buttonsContainer}>
              <NormalButton
                variant="secondary"
                size="medium"
                color="greyscale900"
                className={styles.btn}
                onClick={handleUploadClick}
                isDisabled={isLoading}
              >
                <EditIcon /> Change
              </NormalButton>
              <NormalButton
                variant="secondary"
                size="medium"
                color="greyscale900"
                className={styles.btn}
                isDisabled={!image || isLoading}
                onClick={handleRemove}
              >
                <TrashIcon /> Remove
              </NormalButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
