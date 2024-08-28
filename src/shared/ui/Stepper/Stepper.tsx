import styles from "./Stepper.module.scss";
import { Typography } from "../Typography/Typography";
import { CheckIcon } from "@/shared/icons";

type TStepperProps = {
  status: "inactive" | "active" | "completed";
  step: number;
};

export function Stepper({ status = "inactive", step = 1 }: TStepperProps) {
  const indicator = () => {
    switch (status) {
      case "inactive": {
        return <div className={styles.inactive}>{step}</div>;
      }
      case "active": {
        return <div className={styles.active}>{step}</div>;
      }
      case "completed": {
        return (
          <div className={styles.completed}>
            <CheckIcon className={styles.completedIcon} />
          </div>
        );
      }
    }
  };
  return (
    <div className={styles.container}>
      {indicator()}
      <Typography variant="label-4">Overview</Typography>
    </div>
  );
}
