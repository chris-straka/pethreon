import { ReactNode, FormEvent } from "react"
import styles from "./SubmitModalButton.module.scss"

interface SubmitModalButtonProps {
  children: ReactNode,
  disabled?: boolean,
  onSubmit: ((event: FormEvent<HTMLButtonElement>) => void)
}

export const SubmitModalButton = ({ children, onSubmit, disabled = false }: SubmitModalButtonProps) => {
  return <button type="submit" className={styles.button} onClick={onSubmit} disabled={disabled}>{children}</button>
}
