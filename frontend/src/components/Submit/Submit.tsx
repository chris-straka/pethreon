import { ReactNode, FormEvent } from "react"
import styles from "./Submit.module.css"

interface ActionSubmitProps {
  children: ReactNode,
  disabled: boolean,
  handler: (event: FormEvent<HTMLButtonElement>) => any
}

export const Submit = ({ children, handler, disabled }: ActionSubmitProps) => {
  return <button type="submit" className={styles.button} onClick={handler} disabled={disabled}>{children}</button>
}