import { Dispatch, SetStateAction } from "react"
import styles from "./Consent.module.scss"

interface ConsentProps {
  className?: string,
  setConsent: Dispatch<SetStateAction<boolean>>,
}

export const Consent = ({ className, setConsent }: ConsentProps) => {
  return (
    <label className={`${styles.checkbox} ${className}`} htmlFor="consent">
      🤝 I accept the risks️️
      <input
        className={`${styles.checkbox__input}`}
        required
        type="checkbox"
        id="consent"
        onChange={() => setConsent(prev => !prev)}
      />
      <span className={styles.checkbox__span} />
    </label >
  )
}