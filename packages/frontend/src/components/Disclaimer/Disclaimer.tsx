import { FormEvent } from "react"
import styles from "./Disclaimer.module.scss"

const WARNING_MESSAGE = `
1. This smart contract hasn't been professionally audited for security vulnerabilities. Please use at your own risk!

2. It will take time for this transaction to be mined on the blockchain, please be patient.

3. Creators might not get their payment on time (they might get it earlier or later). This is because Pethreon makes payments using "blocktime".

Ethereum mines 1 block every 10-19 seconds, which is roughly 4547-8640 blocks a day. Pethreon makes payments to people every 6500 blocks. 
`

interface DisclaimerProps {
  className: string
}

export const Disclaimer = ({ className }: DisclaimerProps) => {

  const warning = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setTimeout(() => {
      window.alert(WARNING_MESSAGE)
    }, 100);

  }

  return (
    <div className={`${styles.disclaimer} ${className}`}>
      <p className={styles.warning}>⚠️  Warning! <button className={styles.popup} onClick={warning}>Please read!</button></p>
    </div>
  )
}
