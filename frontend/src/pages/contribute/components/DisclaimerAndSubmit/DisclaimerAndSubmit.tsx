import { useState, ReactNode, FormEvent } from "react"
import styles from "./DisclaimerAndSubmit.module.scss"

interface DisclaimerAndSubmitProps {
  children: ReactNode,
  onSubmit: ((event: FormEvent<HTMLButtonElement>) => Promise<void>)
}

const WARNING_MESSAGE = `
1. This smart contract hasn't been professionally audited for security vulnerabilities. Please use at your own risk!

2. It will take time for this transaction to be mined on the blockchain, please be patient.

3. Creators might not get their payment on time (they might get it earlier or later). This is because Pethreon makes payments using "blocktime".

Ethereum mines 1 block every 10-19 seconds, which is roughly 8640-4547 blocks a day. Pethreon makes payments to people every 6500 blocks. 
`

export const DisclaimerAndSubmit = ({ children, onSubmit }: DisclaimerAndSubmitProps) => {
  const [disabled, setDisabled] = useState(true)

  const warning = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    window.alert(WARNING_MESSAGE)
  }

  return (
    <div className={styles.disclaimerAndSubmitLayout}>
      <p
        className={styles.disclaimerText}
      >⚠️  Warning! <button className={styles.popup} onClick={warning}>Please read!</button></p>
      <div className={styles.consentContainer} >
        <label className={styles.consentText} htmlFor="consent">🤝 I accept the risks️️ </label>
        <input className={styles.checkbox} required type="checkbox" id="consent" onChange={() => setDisabled(!disabled)} />
      </div>
      <button onClick={onSubmit} disabled={disabled}>{children}</button>
    </div>
  )
}


