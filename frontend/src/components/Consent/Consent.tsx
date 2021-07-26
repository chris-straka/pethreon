import { ReactNode, ChangeEvent } from "react"
import styles from "./Consent.module.css"

interface ConsentProps {
  getConsent: (consent: ChangeEvent<HTMLInputElement>) => void
  children: ReactNode,
}

export const Consent = ({ getConsent, children }: ConsentProps) => {
  return (
    <>
      <p>{children}</p>
      <div className={styles.consentContainer}>
        <label htmlFor="consent">I understand and accept the risks</label>
        <input required type="checkbox" id="consent" onChange={getConsent} />
      </div>
    </>
  )
}