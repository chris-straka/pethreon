import { ReactNode, FormEvent } from "react"
import styles from "./Submit.module.css"

interface SubmitButtonProps {
  children: ReactNode,
  disabled?: boolean,
  handler: (event: FormEvent<HTMLButtonElement>) => void
}

export const SubmitButton = ({ children, handler, disabled = false }: SubmitButtonProps) => {
  return <button type="submit" className={styles.button} onClick={handler} disabled={disabled}>{children}</button>
}