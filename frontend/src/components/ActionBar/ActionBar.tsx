import { ReactNode } from "react"
import styles from "./ActionBar.module.scss"

interface ActionBarProps {
  className?: string,
  children: ReactNode,
}

export const ActionBar = ({ className, children }: ActionBarProps) => {
  return (
    <div className={`${styles.actionBar} ${className}`}>
      {children}
    </div>
  );
}