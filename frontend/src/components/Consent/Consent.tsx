import { ChangeEvent, FormEvent } from "react"
import styles from "./Consent.module.css"

const WARNING_MESSAGE = "1. This smart contract hasn't been professionally audited for security vulnerabilities. Please use at your own risk! \n\n 2. It will take time for this transaction to be mined on the blockchain, please be patient."

interface ConsentProps {
  getConsent: (consent: ChangeEvent<HTMLInputElement>) => void
}

export const Consent = ({ getConsent }: ConsentProps) => {

  const warning = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    window.alert(WARNING_MESSAGE)
  }

  return (
    <>
      <p className={styles.disclaimerText}>⚠️&nbsp;&nbsp;Warning! <button type="button" className={styles.disclaimerButton} onClick={warning}>Please read!</button>&nbsp;&nbsp;</p>
      <div className={styles.consentContainer}>
        <label className={styles.consentText} htmlFor="consent">🤝 I accept the risks️️</label>
        <input className={styles.checkbox} required type="checkbox" id="consent" onChange={getConsent} />
      </div>
    </>
  )
}