import { Typography } from "@/shared/ui/Typography";
import styles from "./SettingsSidebar.module.scss";
import clsx from "clsx";
import { Input } from "@/shared/ui/Input";
import { Checkbox } from "@/shared/ui/Checkbox";
import { Dispatch, SetStateAction } from "react";

type TSettingsSidebarProps = {
  adjustingsObj: {
    topic: string;
    position: string;
    token: string;
    setTopic: (topic: string) => void;
    setPosition: (position: string) => void;
    setToken: (token: string) => void;
    isAllowedVolume: boolean;
    setIsAllowedVolume: Dispatch<SetStateAction<boolean>>;
  };
};

export function SettingsSidebar({ adjustingsObj }: TSettingsSidebarProps) {
  const isOpen = true;

  const { topic, position, token, setTopic, setPosition, setToken, isAllowedVolume, setIsAllowedVolume } =
    adjustingsObj;

  const isDesktop = window.innerWidth > 1024;

  return (
    <div className={clsx(styles.container, isOpen && styles.open)}>
      <div className={styles.innerContainer}>
        <Typography className={styles.settingsTitle} variant="label-2">
          Settings
        </Typography>
        <div className={styles.volumeContainer} onClick={() => setIsAllowedVolume((prev: boolean) => !prev)}>
          <Typography className={styles.volumeTitle} variant="body-3" color="greyscale500">
            Allow Volume
          </Typography>
          <Checkbox value={isAllowedVolume} onChange={() => setIsAllowedVolume((prev: boolean) => !prev)} />
        </div>
        <div className={styles.mainTopicContainer}>
          <Typography className={styles.mainTopicTitle} variant="body-3" color="greyscale500">
            Main Topic
          </Typography>
          <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={styles.input}
            inputSize={isDesktop ? "small" : "large"}
          />
        </div>
        <div className={styles.positionContainer}>
          <Typography className={styles.positionTitle} variant="body-3" color="greyscale500">
            Position
          </Typography>
          <Input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className={styles.input}
            inputSize={isDesktop ? "small" : "large"}
          />
        </div>
        <div className={styles.tokenContainer}>
          <Typography className={styles.tokenTitle} variant="body-3" color="greyscale500">
            Token
          </Typography>
          <Input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className={styles.input}
            inputSize={isDesktop ? "small" : "large"}
          />
        </div>
      </div>
      {/* <div className={styles.caretIconContainer} onClick={handleClick}>
                <SettingsIcon
                    style={{
                        transform: isOpen ? "rotate(90deg)" : "rotate(-90deg)",
                        transition: "transform 0.3s",
                    }}
                />
            </div> */}
    </div>
  );
}
