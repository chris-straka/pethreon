import { ReactNode, FormEventHandler, } from "react"
import styles from "./ActionButton.module.scss"

interface ActionButtonInterface {
  className?: string,
  children: ReactNode,
  svg: ReactNode,
  onClick: FormEventHandler<HTMLButtonElement>
}

export function ActionButton({ className, children, svg, onClick }: ActionButtonInterface) {
  return (
    <button className={`${styles.actionButton} ${className}`} onClick={onClick}>
      {children} {svg}
    </button>
  )
}