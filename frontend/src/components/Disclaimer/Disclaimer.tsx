import { FormEvent } from "react"
import styles from "./Disclaimer.module.css"

const WARNING_MESSAGE = "1. This smart contract hasn't been professionally audited for security vulnerabilities. Please use at your own risk! \n\n 2. It will take time for this transaction to be mined on the blockchain, please be patient. \n\n 3. This contract actually uses blocktime and not days, it's currently set to 6,400 blocks = 1 day."

const warning = (event: FormEvent<HTMLButtonElement>) => {
  event.preventDefault()
  window.alert(WARNING_MESSAGE)
}

export const Disclaimer = () => (
  <p className={styles.disclaimerText}>⚠️  Warning! <button type="button" className={styles.popup} onClick={warning}>Please read!</button></p>
)