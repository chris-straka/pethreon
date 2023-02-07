import { ReactNode, FormEvent } from "react"
import styles from "./Submit.module.scss"

interface SubmitProps {
  children: ReactNode,
  className: string,
  disabled?: boolean,
  svg?: ReactNode,
  onClick: ((event: FormEvent<HTMLButtonElement>) => void),
}

export const Submit = ({ children, className, onClick, svg, disabled = false }: SubmitProps) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type="submit"
    >
      {children} {svg}
    </button>
  )
}
