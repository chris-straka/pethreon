import { ReactNode } from "react"
import styles from "./ActionButton.module.css"

interface ActionButtonProps {
  children: ReactNode;
  onClick: any;
}

export const ActionButton = ({ children, onClick }: ActionButtonProps) => (
  <button className={styles.actionButton} onClick={onClick}>{children}</button>
)