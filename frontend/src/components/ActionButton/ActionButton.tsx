import { ReactNode } from "react"
import styles from "./ActionButton.module.css"

interface ActionButtonProps {
  children: ReactNode;
  creator?: boolean;
  onClick?: any;
}

export const ActionButton = ({ children, onClick, creator }: ActionButtonProps) => (
  <button
    className={`${styles.actionButton} ${creator ? styles.creatorStyles : styles.contributorStyles}`}
    onClick={onClick}
  >{children}</button>
)