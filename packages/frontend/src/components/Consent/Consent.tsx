import { Dispatch, SetStateAction } from "react"
import styles from "./Consent.module.scss"

interface ConsentProps {
  className: string,
  setConsent: Dispatch<SetStateAction<boolean>>,
}

export const Consent = ({ className, setConsent }: ConsentProps) => {
  return (
    <label className={`${styles.label} ${className}`} htmlFor="consent">
      🤝 I accept the risks️️
      <input
        className={`${styles.checkboxInput} ${className}`}
        required
        type="checkbox"
        id="consent"
        onChange={() => setConsent(prev => !prev)}
      />
      <span className={styles.checkbox} />
    </label >
  )
}