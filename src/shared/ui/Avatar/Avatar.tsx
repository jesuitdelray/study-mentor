import styles from "./Avatar.module.scss";
import { Typography } from "../Typography/Typography";
import { UserIcon } from "@/shared/icons";

type TAvatarProps = {
  avatar?: string;
  name?:
    | {
        name: string;
        surname: string;
      }
    | string;
};

export function Avatar({ avatar, name }: TAvatarProps) {
  const picture = avatar ? (
    <img src={avatar} className={styles.avatar} alt="avatar" />
  ) : (
    <div className={styles.placeholderContainer}>
      <UserIcon className={styles.placeholderIcon} />
    </div>
  );

  return (
    <div className={styles.avatarContainer}>
      {picture}
      <Typography variant="label-4">{typeof name === "string" ? name : `${name?.name} ${name?.surname}`}</Typography>
    </div>
  );
}
