import { useState, ChangeEvent, FormEvent, Dispatch, SetStateAction } from "react"
import { ReactComponent as DepositSVG } from "../../../../assets/deposit.svg"
import { CurrencySelect } from "../../../../components/CurrencySelect/CurrrencySelect"
import { ActionSubmit } from "../../../../components/Buttons/Action/ActionSubmit"
import { Consent } from "../../../../components/Consent/Consent"
import { Spacer } from "../../../../components/Spacer/Spacer"

import { deposit } from "../../../../ethers/deposit"
import { getBalance } from "../../../../ethers/getBalance"
import styles from "./Deposit.module.css"

interface DepositModalProps {
  closeModal: () => void,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setBalance: Dispatch<SetStateAction<string>>
}

export const DepositModal = ({ closeModal, setLoading, setBalance }: DepositModalProps) => {
  const [disabled, setDisabled] = useState(true)
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("Ether")
  const [consent, setConsent] = useState(false)

  const getAmount = (amount: ChangeEvent<HTMLInputElement>) => setAmount(amount.target.value);

  const getCurrency = (currency: ChangeEvent<HTMLInputElement>) => {
    if (currency.target.value === "Ether") setCurrency("Ether")
    if (currency.target.value === "Gwei") setCurrency("Gwei")
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

  const submitDeposit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!consent) return
    if (!amount) {
      window.alert("Please insert an amount")
      return
    }
    closeModal()
    await deposit(amount, currency, setLoading)
    const newBalance = await getBalance(setLoading)
    setBalance(newBalance)
  }

  return (
    <form className={styles.depositFormLayout}>
      <h3 className={styles.heading}>How much to deposit?</h3>
      <CurrencySelect amount={amount} getAmount={getAmount} getCurrency={getCurrency} />
      <Spacer marginTop="1rem" marginBottom="1rem" />
      <Consent getConsent={getConsent}></Consent>
      <Spacer marginTop="1rem" marginBottom="1rem" />
      <ActionSubmit handler={submitDeposit} disabled={disabled}>Deposit <DepositSVG className={styles.depositSVG} /></ActionSubmit>
    </form>
  );
}