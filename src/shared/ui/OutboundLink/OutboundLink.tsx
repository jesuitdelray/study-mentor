import styles from "./OutboundLink.module.scss";
import { ReactNode } from "react";
import { Typography } from "../Typography/Typography";
import { MoveIcon } from "@/shared/icons";

export type TOutboundLinkProps = {
  href: string;
  children: ReactNode;
};

export function OutboundLink(props: TOutboundLinkProps) {
  const { href, children }: TOutboundLinkProps = props;
  return (
    <a href={href} className={styles.mainLink} rel="noopener norefferer" target="_blank">
      <div>
        <Typography variant={"label-4"}>{children}</Typography>
      </div>
      <MoveIcon className={styles.moveIcon} />
    </a>
  );
}
