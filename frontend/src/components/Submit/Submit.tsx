import { ReactNode, FormEvent } from "react"
import styles from "./Submit.module.scss"

interface SubmitProps {
  children: ReactNode,
  className: string,
  disabled?: boolean,
  onSubmit: ((event: FormEvent<HTMLButtonElement>) => void)
}

export const Submit = ({ children, className, onSubmit, disabled = false }: SubmitProps) => {
  return <button
    type="submit"
    className={`${styles.button} ${className}`}
    onClick={onSubmit}
    disabled={disabled}
  >
    {children}
  </button>
}
