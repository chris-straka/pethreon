import { ReactNode, ChangeEvent } from "react"
import styles from "./Consent.module.css"

interface ConsentProps {
  getConsent: (consent: ChangeEvent<HTMLInputElement>) => void
  children: ReactNode,
}

export const Consent = ({ getConsent, children }: ConsentProps) => {
  return (
    <>
      <div className={styles.consentContainer}>
        <label htmlFor="consent">{children}</label>
        <input type="checkbox" id="consent" onChange={getConsent} />
      </div>
    </>
  )
}