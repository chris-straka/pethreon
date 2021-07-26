import { useState, ChangeEvent, FormEvent } from "react"
import { CurrencySelect } from "../../../../components/CurrencySelect/CurrrencySelect"
import { Consent } from "../../../../components/Consent/Consent"
import styles from "./Deposit.module.css"

const WARNING_MESSAGE = "This smart contract hasn't been professionally audited for security vulnerabilities. Please use at your own risk!"

export const DepositModal = () => {
  const [amount, setAmount] = useState("")
  const [consent, setConsent] = useState(false)
  const [currency, setCurrency] = useState("USD")
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


  return (
    <form className={styles.depositModal}>
      <h3>How much to deposit?</h3>
      <CurrencySelect amount={amount} getAmount={getAmount} getCurrency={getCurrency} />
      <Consent getConsent={getConsent}>⚠️ Warning! Please read! ⚠️ ️️</Consent>
      <button onClick={deposit} disabled={disable}>Deposit</button>
    </form>
  );
}