import { ReactNode, FormEvent } from "react"
import styles from "./Submit.module.scss"

interface SubmitButtonProps {
  children: ReactNode,
  disabled?: boolean,
  onClick: (event: FormEvent<HTMLButtonElement>) => void
}

export const SubmitButton = ({ children, onClick: handler, disabled = false }: SubmitButtonProps) => {
  return <button type="submit" className={styles.button} onClick={handler} disabled={disabled}>{children}</button>
}