import clsx from "clsx";
import styles from "./UsersAvatar.module.scss";

type Props = {
  img?: string;
  onClick?: () => void;
  className?: string;
  nameInitials: string;
};

export function UsersAvatar({ img, onClick, className, nameInitials }: Props) {
  if (!img)
    return (
      <div className={clsx(styles.container, className)} onClick={onClick}>
        {nameInitials}
      </div>
    );

  return (
    <div className={clsx(styles.container, className)} onClick={onClick}>
      <img src={img} alt="avatar" />
    </div>
  );
}
