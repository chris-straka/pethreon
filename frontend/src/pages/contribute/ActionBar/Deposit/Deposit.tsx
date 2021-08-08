import { useState, ChangeEvent, FormEvent, Dispatch, SetStateAction } from "react"
import { useHistory } from "react-router"
import { ReactComponent as DepositSVG } from "../../../../assets/deposit.svg"
import { ConsentCheckbox } from "../../../../components/ConsentCheckbox/ConsentCheckbox"
import { CurrencyField } from "../../../../components/CurrencyField/CurrrencyField"
import { CurrencyDenomination } from "../../../../components/CurrencyDenomination/CurrencyDenomination"
import { Submit } from "../../../../components/Submit/Submit"
import { Disclaimer } from "../../../../components/Disclaimer/Disclaimer"
import { Spacer } from "../../../../components/Spacer/Spacer"

import { deposit } from "../../../../ethers/deposit"
import { getBalance } from "../../../../ethers/getBalance"
import styles from "./Deposit.module.css"
import { EthereumWindow, MetamaskError } from "../../../../ethers/utility"

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
  const history = useHistory()
  const { ethereum } = window as EthereumWindow

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
    if (typeof ethereum === undefined) {
      window.alert("You're not signed in")
      history.push('/')
      return null
    }
    if (!consent) return
    if (!amount) {
      window.alert("Please insert an amount")
      return
    }
    closeModal()
    try {
      setLoading(true)
      await deposit(amount, currency)
      const newBalance = await getBalance()
      setBalance(newBalance)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      window.alert(`Error: ${(error as MetamaskError).message}`)
    }
  }

  return (
    <form className={styles.depositFormLayout}>
      <h3 className={styles.depositHeading}>How much to deposit?</h3>
      <CurrencyField amount={amount} getAmount={getAmount} />
      <div className={styles.currencyButtons} onChange={getCurrency}>
        <CurrencyDenomination defaultChecked={true} denomination="Ether" />
        <CurrencyDenomination defaultChecked={false} denomination="Gwei" />
        <CurrencyDenomination defaultChecked={false} denomination="Wei" />
      </div>
      <Spacer marginTop="1rem" marginBottom="1rem" />
      <Disclaimer />
      <ConsentCheckbox getConsent={getConsent}></ConsentCheckbox>
      <Spacer marginTop="1rem" marginBottom="1rem" />
      <Submit handler={submitDeposit} disabled={disabled}>Deposit <DepositSVG className={styles.depositSVG} /></Submit>
    </form>
  );
}