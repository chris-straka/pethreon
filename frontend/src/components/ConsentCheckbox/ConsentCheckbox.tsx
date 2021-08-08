import { ChangeEvent } from "react"
import styles from "./ConsentCheckbox.module.css"

interface ConsentCheckboxProps {
  getConsent: (consent: ChangeEvent<HTMLInputElement>) => void
}

export const ConsentCheckbox = ({ getConsent }: ConsentCheckboxProps) => {

  return (
    <div className={styles.consentContainer} >
      <label className={styles.consentText} htmlFor="consent">🤝 I accept the risks️️ </label>
      <input className={styles.checkbox} required type="checkbox" id="consent" onChange={getConsent} />
    </div>
  )
}