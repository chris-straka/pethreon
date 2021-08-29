import { ReactNode } from "react"
import styles from "./ActionButton.module.css"

interface ActionButtonProps {
  children: ReactNode;
  creatorButton?: boolean;
  onClick?: any;
}

export const ActionButton = ({ children, onClick, creatorButton }: ActionButtonProps) => (
  <button
    className={`${styles.actionButton} ${creatorButton ? styles.creatorStyles : ""}`}
    onClick={onClick}
  >{children}</button>
)