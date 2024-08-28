import { NormalButton } from "../Button";
import { Modal } from "../Modal";
import { Typography } from "../Typography";
import styles from "./ConfirmationModal.module.scss";

type TConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  content: string;
  isDisabled?: boolean;
};

export function ConfirmationModal({ isOpen, onClose, onConfirm, title, content, isDisabled }: TConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} width="300px">
      <div className={styles.contentContainer}>
        <Typography variant="body-2">{content}</Typography>
        <div className={styles.buttonsContainer}>
          <NormalButton className={styles.btn} onClick={onConfirm} size="medium" isDisabled={isDisabled}>
            Confirm
          </NormalButton>
          <NormalButton className={styles.btn} onClick={onClose} size="medium" variant="secondary" color="greyscale800">
            Cancel
          </NormalButton>
        </div>
      </div>
    </Modal>
  );
}
