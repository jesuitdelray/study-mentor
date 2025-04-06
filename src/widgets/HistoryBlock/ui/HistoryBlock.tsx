import { mockHistoryRows } from "../const/const";
import styles from "./HistoryBlock.module.scss";
import { HistoryRow } from "./HistoryRow";

export function HistoryBlock() {
  return (
    <div className={styles.container}>
      {mockHistoryRows.map((row) => (
        <HistoryRow key={row.id} row={row} />
      ))}
    </div>
  );
}
