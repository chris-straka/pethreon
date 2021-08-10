import { ReactNode, ChangeEvent } from "react"
import styles from "./PledgeField.module.css"

interface PledgeFieldProps {
  type: string,
  placeholder: string,
  min?: number,
  value: string | number,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  children: ReactNode
}

export const PledgeField = ({ type, placeholder, min, value, onChange, children }: PledgeFieldProps) => {
  return <div className={styles.pledgeFieldContainer}>
    {children}
    <input
      required
      type={type}
      placeholder={placeholder}
      min={min}
      className={styles.pledgeFieldInput}
      value={value}
      onChange={onChange}
    />
  </div>
}