import { useState } from "react";
import { labels } from "../const/const";
import styles from "./StudyMentorHeader.module.scss";
import clsx from "clsx";
import { NormalButton } from "@/shared/ui/Button";
import { Typography } from "@/shared/ui/Typography";
import { message } from "@/pages/StudyMentorPage/ui/StudyMentorPage";
import { HamburgerMenu } from "@/widgets/HamburgerMenu/HamburgerMenu";
import { calculateScoresFromMessages } from "@/shared/lib/calculateScoresFromMessages";
import { IS_DESKTOP_DEFAULT } from "@/shared/constants";
import { useNavigate, useLocation } from "react-router-dom";

export type THeaderProps = {
  messages: message[];
  onSave: () => void;
  onClearAll: () => void;
};

export function StudyMentorHeader({
  messages,
  onSave,
  onClearAll,
}: THeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  function getActiveKey(pathname: string): string {
    if (pathname === "/interview-sensei") return "interviewSensei";
    return "studyMentor";
  }

  const activeKey = getActiveKey(location.pathname);

  const { totalQuestions, averageScore } =
    calculateScoresFromMessages(messages);

  function onSaveInHamburgerMenu() {
    onSave();
    setIsBurgerMenuOpen(false);
  }

  function onClearAllInHamburgerMenu() {
    onClearAll();
    setIsBurgerMenuOpen(false);
  }

  function handleSectionClick(labelKey: string) {
    if (labelKey === "studyMentor") navigate("/");
    else if (labelKey === "interviewSensei") navigate("/interview-sensei");
  }

  return (
    <div
      className={clsx(styles.container, !IS_DESKTOP_DEFAULT && styles.mobile)}
    >
      {labels.map(({ key, label }) => (
        <p
          key={key}
          className={clsx(styles.label, activeKey === key && styles.active)}
          onClick={() => handleSectionClick(key)}
        >
          {label}
        </p>
      ))}
      <div className={styles.rightSideContainer}>
        {IS_DESKTOP_DEFAULT && (
          <>
            <Typography variant="body-2">
              Total Questions: {totalQuestions}
            </Typography>
            <Typography variant="body-2">
              Average Score: {averageScore} / 10
            </Typography>
            <div className={styles.verticalDivider} />

            <NormalButton
              onClick={onSave}
              size={IS_DESKTOP_DEFAULT ? "medium" : "large"}
              variant="primary"
              isDisabled={messages.length === 0}
              className={styles.saveBtn}
            >
              Save messages
            </NormalButton>
            <NormalButton
              onClick={onClearAll}
              size={IS_DESKTOP_DEFAULT ? "medium" : "large"}
              variant="secondary"
              isDisabled={messages.length === 0}
              className={styles.clearBtn}
            >
              Clear all
            </NormalButton>
          </>
        )}
        {!IS_DESKTOP_DEFAULT && (
          <HamburgerMenu
            isOpen={isBurgerMenuOpen}
            toggle={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
            onSave={onSaveInHamburgerMenu}
            onClearAll={onClearAllInHamburgerMenu}
            totalQuestions={totalQuestions}
            averageScore={averageScore}
          />
        )}
      </div>
    </div>
  );
}
