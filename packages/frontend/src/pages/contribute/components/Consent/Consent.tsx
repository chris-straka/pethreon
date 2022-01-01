import { Dispatch, SetStateAction } from "react"
import styles from "./Consent.module.scss"

interface ConsentProps {
  className: string,
  setDisabled: Dispatch<SetStateAction<boolean>>,
}

export const Consent = ({ className, setDisabled }: ConsentProps) => {
  return (
    <label
      className={`${styles.label} ${className}`}
      htmlFor="consent"
    >🤝 I accept the risks️️ <input
        className={`${styles.checkbox} ${className}`}
        required type="checkbox" id="consent"
        onChange={() => setDisabled(prev => !prev)}
      /></label>
  )
}