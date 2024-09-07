import { Dispatch, SetStateAction, useState } from "react";
import { labels } from "../const/const";
import styles from "./Header.module.scss";
import clsx from "clsx";
import { NormalButton } from "@/shared/ui/Button";
import { Typography } from "@/shared/ui/Typography";
import { message } from "@/pages/HomePage/ui/HomePage";
import { HamburgerMenu } from "@/widgets/HamburgerMenu/HamburgerMenu";
import { calculateScoresFromMessages } from "@/shared/lib/calculateScoresFromMessages";

export type THeaderProps = {
  messages: message[];
  onSave: () => void;
  onClearAll: () => void;
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

export function Header({ messages, onSave, onClearAll, adjustingsObj }: THeaderProps) {
  const [activeSection, setActiveSection] = useState(labels[0]);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const { totalQuestions, averageScore } = calculateScoresFromMessages(messages);

  const isDesktop = window.innerWidth > 1024;

  function onSaveInHamburgerMenu() {
    onSave();
    setIsBurgerMenuOpen(false);
  }

  function onClearAllInHamburgerMenu() {
    onClearAll();
    setIsBurgerMenuOpen(false);
  }

  return (
    <div className={clsx(styles.container, !isDesktop && styles.mobile)}>
      {labels.map((label) => (
        <p
          key={label}
          className={clsx(styles.label, activeSection === label && styles.active)}
          onClick={() => setActiveSection(label)}
        >
          {label}
        </p>
      ))}
      <div className={styles.rightSideContainer}>
        {isDesktop && (
          <>
            <Typography variant="body-2">Total Questions: {totalQuestions}</Typography>
            <Typography variant="body-2">Average Score: {averageScore} / 10</Typography>
            <div className={styles.verticalDivider} />

            <NormalButton
              onClick={onSave}
              size={isDesktop ? "medium" : "large"}
              variant="primary"
              isDisabled={messages.length === 0}
              className={styles.saveBtn}
            >
              Save messages
            </NormalButton>
            <NormalButton
              onClick={onClearAll}
              size={isDesktop ? "medium" : "large"}
              variant="secondary"
              isDisabled={messages.length === 0}
              className={styles.clearBtn}
            >
              Clear all
            </NormalButton>
          </>
        )}
        {!isDesktop && (
          <HamburgerMenu
            isOpen={isBurgerMenuOpen}
            toggle={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
            onSave={onSaveInHamburgerMenu}
            onClearAll={onClearAllInHamburgerMenu}
            totalQuestions={totalQuestions}
            averageScore={averageScore}
            adjustingsObj={adjustingsObj}
          />
        )}
      </div>
    </div>
  );
}
