import { ReactNode, ChangeEvent } from "react"
import styles from "./PledgeField.module.css"

interface PledgeFieldProps {
  autofocus?: boolean,
  min?: string,
  disabled?: boolean,
  type: string,
  placeholder: string,
  value: string | number,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  children: ReactNode
}

export const PledgeField = ({ autofocus = false, disabled = false, type, placeholder, min, value, onChange, children }: PledgeFieldProps) => {
  return <div className={styles.pledgeFieldContainer}>
    {children}
    <input
      autoFocus={autofocus}
      disabled={disabled}
      required
      type={disabled ? "text" : type}
      placeholder={placeholder}
      min={min}
      className={styles.pledgeFieldInput}
      value={disabled ? "ALL" : value}
      onChange={onChange}
    />
  </div>
}