import { ReactNode, FormEvent } from "react"
import styles from "./SubmitModalButton.module.scss"

interface SubmitModalButtonProps {
  children: ReactNode,
  className: string,
  disabled?: boolean,
  onSubmit: ((event: FormEvent<HTMLButtonElement>) => void)
}

export const SubmitModalButton = ({ children, className, onSubmit, disabled = false }: SubmitModalButtonProps) => {
  return <button type="submit" className={styles.button} onClick={onSubmit} disabled={disabled}>{children}</button>
}
