import { mockHistoryRows } from "../const/const";
import styles from "./HistoryRow.module.scss";

export function HistoryRow({ row }: { row: (typeof mockHistoryRows)[number] }) {
  return (
    <div key={row.id} className={styles.row}>
      <div className={styles.rowHeader}>
        <div className={styles.info}>
          <h2 className={styles.topic}>{row.topic}</h2>
          <p className={styles.position}>{row.position}</p>
        </div>
        <div className={styles.stats}>
          <span>Total: {row.total}</span>
          <span>Average: {row.average}</span>
        </div>
      </div>
      <div className={styles.questions}>
        {row.questions.map((q) => (
          <div key={q.id} className={styles.question}>
            <h4 className={styles.questionTitle}>{q.question}</h4>
            <p className={styles.answer}>{q.answer}</p>
            <span className={styles.score}>Score: {q.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
