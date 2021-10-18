import { ReactNode, ChangeEvent } from "react"
import styles from "./PledgeModalField.module.scss"

interface PledgeFieldProps {
  autofocus?: boolean,
  min?: string,
  disabled?: boolean,
  type: string,
  placeholder: string,
  value: string | number,
  spellCheck?: boolean,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  children: ReactNode
}

export const PledgeField = ({ autofocus = false, disabled = false, type, spellCheck, placeholder, min, value, onChange, children }: PledgeFieldProps) => {
  return <div className={styles.pledgeFieldContainer}>
    {children}
    <input
      autoFocus={autofocus}
      disabled={disabled}
      required
      type={disabled ? "text" : type}
      placeholder={placeholder}
      min={min}
      spellCheck={spellCheck}
      className={styles.pledgeFieldInput}
      value={disabled ? "ALL" : value}
      onChange={onChange}
    />
  </div>
}