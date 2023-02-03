import { ReactNode, FormEvent } from "react"
import styles from "./Submit.module.scss"

interface SubmitProps {
  children: ReactNode,
  className: string,
  disabled?: boolean,
  onClick: ((event: FormEvent<HTMLButtonElement>) => void)
}

export const Submit = ({ children, className, onClick, disabled = false }: SubmitProps) => {
  return <button
    type="submit"
    className={`${styles.button} ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
}
