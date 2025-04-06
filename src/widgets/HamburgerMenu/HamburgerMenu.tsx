import { SettingsIcon } from "@/shared/icons/SettingsIcon";
import styles from "./HamburgerMenu.module.scss";
import { NormalButton } from "@/shared/ui/Button";
import { Typography } from "@/shared/ui/Typography";
import clsx from "clsx";
import { Input } from "@/shared/ui/Input";
import { Checkbox } from "@/shared/ui/Checkbox";
import { useAdjustingsStore } from "@/shared/stores/useAdjustingsStore";

export type THamburgerMenuProps = {
  isOpen: boolean;
  toggle: () => void;
  onSave: () => void;
  onClearAll: () => void;
  totalQuestions: number;
  averageScore: number;
};

export function HamburgerMenu({
  isOpen,
  toggle,
  onSave,
  onClearAll,
  totalQuestions,
  averageScore,
}: THamburgerMenuProps) {
  const {
    topic,
    setTopic,
    position,
    setPosition,
    token,
    setToken,
    isAllowedVolume,
    setIsAllowedVolume,
  } = useAdjustingsStore();

  return (
    <div className={styles.container}>
      <NormalButton
        onClick={toggle}
        className={styles.burgerButton}
        variant="tertiary"
        size="large"
      >
        <SettingsIcon
          style={{
            transform: isOpen ? "rotate(90deg)" : "rotate(-90deg)",
            transition: "transform 0.3s",
          }}
        />
      </NormalButton>

      <div className={clsx(styles.menuItems, isOpen && styles.isOpen)}>
        <div
          className={styles.volumeContainer}
          onClick={() => setIsAllowedVolume((prev: boolean) => !prev)}
        >
          <Typography
            className={styles.volumeTitle}
            variant="body-1"
            color="greyscale500"
          >
            Allow Volume
          </Typography>
          <Checkbox
            value={isAllowedVolume}
            onChange={() => setIsAllowedVolume((prev: boolean) => !prev)}
          />
        </div>
        <Typography
          className={styles.totalQuestions}
          variant="body-1"
          color="greyscale500"
        >
          Total questions: {totalQuestions}
        </Typography>
        <Typography
          className={styles.averageScore}
          variant="body-1"
          color="greyscale500"
        >
          Average score: {averageScore}
        </Typography>
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Topic"
          className={styles.input}
        />
        <Input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Position"
          className={styles.input}
        />
        <Input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Token"
          className={styles.input}
        />
        <div className={styles.buttonsContainer}>
          <NormalButton
            onClick={onSave}
            className={styles.saveButton}
            size="large"
          >
            Save
          </NormalButton>
          <NormalButton
            onClick={onClearAll}
            className={styles.clearAllButton}
            variant="secondary"
            size="large"
          >
            Clear all
          </NormalButton>
        </div>
      </div>
    </div>
  );
}
