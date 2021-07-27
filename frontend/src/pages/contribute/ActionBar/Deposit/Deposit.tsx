import { useState, ChangeEvent, FormEvent } from "react"
import { CurrencySelect } from "../../../../components/CurrencySelect/CurrrencySelect"
import { Consent } from "../../../../components/Consent/Consent"
import styles from "./Deposit.module.css"

const WARNING_MESSAGE = "This smart contract hasn't been professionally audited for security vulnerabilities. Please use at your own risk! It will also take time for your transaction to be mined on the blockchain, please be patient."

export const DepositModal = () => {
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [consent, setConsent] = useState(false)
  const [disable, setDisable] = useState(true)

  const getAmount = (amount: ChangeEvent<HTMLInputElement>) => {
    setAmount(amount.target.value)
  }

  const getCurrency = (currency: ChangeEvent<HTMLInputElement>) => {
    if (currency.target.value === "USD") setCurrency("USD")
    if (currency.target.value === "Ether") setCurrency("Ether")
    if (currency.target.value === "Wei") setCurrency("Wei")
  }

  const getConsent = (consent: ChangeEvent<HTMLInputElement>) => {
    if (consent.target.checked) {
      setConsent(true)
      setDisable(false)
    } else {
      setConsent(false)
      setDisable(true)
    }
  }

  const deposit = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log(consent)
    console.log(amount)
    console.log(currency)
  }

  const warning = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    window.alert(WARNING_MESSAGE)
  }

  return (
    <form className={styles.depositForm}>
      <h3 className={styles.modalHeading}>How much to deposit?</h3>
      <CurrencySelect amount={amount} getAmount={getAmount} currency={currency} getCurrency={getCurrency} />
      <Consent getConsent={getConsent}>⚠️ I have read and accept the <button className={styles.disclaimer} onClick={warning}>following risks</button>⚠️️️</Consent>
      <button className={styles.depositButton} onClick={deposit} disabled={disable}>Deposit</button>
    </form>
  );
}