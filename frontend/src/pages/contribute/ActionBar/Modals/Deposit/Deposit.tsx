import { useState, ChangeEvent, FormEvent } from "react"
import { ReactComponent as DepositSVG } from "../../../../../assets/deposit.svg"
import { CurrencySelect } from "../../../../../components/CurrencySelect/CurrrencySelect"
import { ActionSubmit } from "../../../../../components/Buttons/Action/ActionSubmit"
import { Consent } from "../../../../../components/Consent/Consent"
import { Spacer } from "../../../../../components/Spacer/Spacer"
import styles from "./Deposit.module.css"

interface DepositModalProps {
  closeModal: () => void
}

export const DepositModal = ({ closeModal }: DepositModalProps) => {
  const [disabled, setDisabled] = useState(true)
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [consent, setConsent] = useState(false)

  const getAmount = (amount: ChangeEvent<HTMLInputElement>) => setAmount(amount.target.value);

  const getCurrency = (currency: ChangeEvent<HTMLInputElement>) => {
    if (currency.target.value === "USD") setCurrency("USD")
    if (currency.target.value === "Ether") setCurrency("Ether")
    if (currency.target.value === "Wei") setCurrency("Wei")
  }

  const getConsent = (consent: ChangeEvent<HTMLInputElement>) => {
    if (consent.target.checked) {
      setConsent(true)
      setDisabled(false)
    } else {
      setConsent(false)
      setDisabled(true)
    }
  }

  const deposit = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log(consent)
    console.log(amount)
    console.log(currency)
    closeModal()
  }

  return (
    <form className={styles.depositFormLayout}>
      <h3 className={styles.heading}>How much to deposit?</h3>
      <CurrencySelect amount={amount} getAmount={getAmount} currency={currency} getCurrency={getCurrency} />
      <Spacer marginTop="1rem" marginBottom="1rem" />
      <Consent getConsent={getConsent}></Consent>
      <Spacer marginTop="1rem" marginBottom="1rem" />
      <ActionSubmit handler={deposit} disabled={disabled}>Deposit <DepositSVG className={styles.depositSVG}/></ActionSubmit>
    </form>
  );
}