import { useState, FormEvent } from "react"
import styles from "./Disclaimer.module.scss"

const WARNING_MESSAGE = `
1. This smart contract hasn't been professionally audited for security vulnerabilities. Please use at your own risk!

2. It will take time for this transaction to be mined on the blockchain, please be patient.

3. Creators might not get their payment on time (they might get it earlier or later). This is because Pethreon makes payments using "blocktime".

Ethereum mines 1 block every 10-19 seconds, which is roughly 8640-4547 blocks a day. Pethreon makes payments to people every 6500 blocks. 
`

export const Disclaimer = () => {
  const [disabled, setDisabled] = useState(true)

  const warning = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    window.alert(WARNING_MESSAGE)
  }

  // This needs to be one element for flexbox
  return (
    <div className={styles.disclaimer}>
      <p>⚠️  Warning! <button className={styles.disclaimerPopup} onClick={warning}>Please read!</button></p>
      <label className={styles.consentLabel} htmlFor="consent" >🤝 I accept the risks️️ </label>
      <input className={styles.consentCheckbox} required type="checkbox" id="consent" onChange={() => setDisabled(!disabled)} />
    </div>
  )
}
