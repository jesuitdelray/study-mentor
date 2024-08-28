import { ChangeEvent, useRef } from "react";
import styles from "./UploadLogo.module.scss";
import { NormalButton } from "../Button";
import { Typography } from "../Typography/Typography";
import { PlusIcon, TrashIcon } from "@/shared/icons";

type TUploadLogoProps = {
  onUpload: (data: string) => void;
  image: string;
  onRemove: () => void;
  text: string;
};

export function UploadLogo({ onUpload, image, onRemove, text }: TUploadLogoProps) {
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
            <NormalButton
              size="medium"
              variant="secondary"
              className={styles.uploadLogoBtn}
              onClick={handleUploadClick}
              color="greyscale800"
            >
              {text || "Upload logo"}
            </NormalButton>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept=".png, .jpg, .jpeg"
              onChange={handleFileChange}
            />
            {image && (
              <NormalButton
                className={styles.removeLogoBtn}
                color="greyscale600"
                variant="tertiary"
                leftIcon={<TrashIcon className={styles.trashIcon} />}
                onClick={handleRemove}
              >
                Remove
              </NormalButton>
            )}
          </div>
          <Typography variant="body-3" color="greyscale600">
            Accepted files PNG, JPG, JPEG
          </Typography>
          <Typography variant="body-3" color="greyscale600">
            Ideal size 256x256 px
          </Typography>
        </div>
      </div>
    </div>
  );
}
