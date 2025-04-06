import { Typography } from "@/shared/ui/Typography";
import styles from "./SettingsSidebar.module.scss";
import clsx from "clsx";
import { Input } from "@/shared/ui/Input";
import { Checkbox } from "@/shared/ui/Checkbox";
import { useState } from "react";
import { SettingsIcon } from "@/shared/icons/SettingsIcon";
import { NormalButton } from "@/shared/ui/Button";
import { EDiscussionMods, IS_DESKTOP_DEFAULT } from "@/shared/constants";
import { useAdjustingsStore } from "@/shared/stores/useAdjustingsStore";

export function SettingsSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const {
    topic,
    setTopic,
    position,
    setPosition,
    token,
    setToken,
    isAllowedVolume,
    setIsAllowedVolume,
    mode,
    setMode,
  } = useAdjustingsStore();

  const [formValues, setFormValues] = useState({
    topic,
    position,
    token,
    isAllowedVolume,
    mode,
  });

  function handleApply(event: React.FormEvent) {
    event.preventDefault();

    setTopic(formValues.topic);
    setPosition(formValues.position);
    setToken(formValues.token);
    setIsAllowedVolume(formValues.isAllowedVolume);
    setMode(formValues.mode);
  }

  function handleChange(update: Partial<typeof formValues>) {
    setFormValues((prev) => ({ ...prev, ...update }));
  }

  const isFormChanged =
    formValues.topic !== topic ||
    formValues.position !== position ||
    formValues.token !== token ||
    formValues.isAllowedVolume !== isAllowedVolume ||
    formValues.mode !== mode;

  return (
    <div className={clsx(styles.container, isOpen && styles.open)}>
      <div className={styles.innerContainer}>
        <Typography className={styles.settingsTitle} variant="label-2">
          Settings
        </Typography>
        <form onSubmit={handleApply}>
          <div
            className={styles.volumeContainer}
            onClick={() =>
              handleChange({ isAllowedVolume: !formValues.isAllowedVolume })
            }
          >
            <Typography
              className={styles.volumeTitle}
              variant="body-3"
              color="greyscale500"
            >
              Allow Volume
            </Typography>
            <Checkbox
              value={formValues.isAllowedVolume}
              onChange={() =>
                handleChange({ isAllowedVolume: !formValues.isAllowedVolume })
              }
            />
          </div>

          <div className={styles.mainTopicContainer}>
            <Typography
              className={styles.mainTopicTitle}
              variant="body-3"
              color="greyscale500"
            >
              Mode
            </Typography>
            <div className={styles.buttonsContainer}>
              <NormalButton
                className={clsx(
                  styles.modeButton,
                  formValues.mode === EDiscussionMods.WORD_MASTERY &&
                    styles.active
                )}
                variant="tertiary"
                onClick={() =>
                  handleChange({ mode: EDiscussionMods.WORD_MASTERY })
                }
                type="button"
              >
                Word mastery
              </NormalButton>
              <NormalButton
                variant="tertiary"
                className={clsx(
                  styles.modeButton,
                  formValues.mode === EDiscussionMods.QA && styles.active
                )}
                onClick={() => handleChange({ mode: EDiscussionMods.QA })}
                type="button"
              >
                Q/A
              </NormalButton>
            </div>
          </div>

          <div className={styles.mainTopicContainer}>
            <Typography
              className={styles.mainTopicTitle}
              variant="body-3"
              color="greyscale500"
            >
              Main Topic
            </Typography>
            <Input
              value={formValues.topic}
              onChange={(e) => handleChange({ topic: e.target.value })}
              className={styles.input}
              inputSize={IS_DESKTOP_DEFAULT ? "small" : "large"}
            />
          </div>

          <div className={styles.positionContainer}>
            <Typography
              className={styles.positionTitle}
              variant="body-3"
              color="greyscale500"
            >
              Position
            </Typography>
            <Input
              value={formValues.position}
              onChange={(e) => handleChange({ position: e.target.value })}
              className={styles.input}
              inputSize={IS_DESKTOP_DEFAULT ? "small" : "large"}
            />
          </div>

          <div className={styles.positionContainer}>
            <Typography
              className={styles.positionTitle}
              variant="body-3"
              color="greyscale500"
            >
              Token
            </Typography>
            <Input
              value={formValues.token}
              onChange={(e) => handleChange({ token: e.target.value })}
              className={styles.input}
              inputSize={IS_DESKTOP_DEFAULT ? "small" : "large"}
            />
          </div>

          <NormalButton type="submit" className={styles.applyButton}>
            Apply
          </NormalButton>

          {isFormChanged && (
            <Typography
              className={styles.warning}
              variant="body-3"
              color="error-red"
            >
              *Please, press Enter to apply changes
            </Typography>
          )}
        </form>
      </div>
      <div
        className={styles.caretIconContainer}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <SettingsIcon
          style={{
            transform: isOpen ? "rotate(90deg)" : "rotate(-90deg)",
            transition: "transform 0.3s",
          }}
        />
      </div>
    </div>
  );
}
