import { Typography } from "../Typography/Typography";
import styles from "./Notification.module.scss";

type TNotificationProps = {
  message: string;
  time: string;
  img: string;
};

export function Notification({ message, img, time }: TNotificationProps) {
  return (
    <div className={styles.container}>
      <img src={img} className={styles.img} alt="avatar" />
      <div className={styles.textContainer}>
        <Typography variant="body-2">{message}</Typography>
        <Typography variant="body-3">{time}</Typography>
      </div>
    </div>
  );
}
