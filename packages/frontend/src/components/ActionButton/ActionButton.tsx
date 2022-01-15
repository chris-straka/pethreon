import { ReactNode, Dispatch, SetStateAction } from "react"
import styles from "./ActionButton.module.scss"

interface ActionButtonInterface {
  className?: string,
  children: ReactNode,
  onClick: Dispatch<SetStateAction<any>>
}

export function ActionButton({ className, children, onClick }: ActionButtonInterface) {
  return (
    <button
      className={`${styles.actionButton} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}