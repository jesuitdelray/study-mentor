import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import { labels } from "../const/const";
import styles from "./InterviewSenseiHeader.module.scss";

export function InterviewSenseiHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeKey = getActiveKey(location.pathname);

  function handleSectionClick(labelKey: string) {
    if (labelKey === "studyMentor") navigate("/");
    else if (labelKey === "interviewSensei") navigate("/interview-sensei");
  }

  return (
    <div className={clsx(styles.container)}>
      {labels.map(({ key, label }) => (
        <p
          key={key}
          className={clsx(styles.label, activeKey === key && styles.active)}
          onClick={() => handleSectionClick(key)}
        >
          {label}
        </p>
      ))}
    </div>
  );
}

function getActiveKey(pathname: string): string {
  if (pathname === "/interview-sensei") return "interviewSensei";
  return "studyMentor";
}
