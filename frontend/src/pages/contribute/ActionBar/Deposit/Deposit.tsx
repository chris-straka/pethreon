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
  const history = useHistory()
  const { ethereum } = window as EthereumWindow

  const submitDeposit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (typeof ethereum === undefined) {
      window.alert("You're not signed in")
      history.push('/')
      return null
    }

    if (!amount || +amount <= 0) return window.alert("Please insert an amount")

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
      <CurrencyField amount={amount} getAmount={(event: ChangeEvent<HTMLInputElement>) => setAmount(event.target.value)} />
      <Spacer marginBottom="16px" />
      <div className={styles.currencyButtons} onChange={(event: ChangeEvent<HTMLInputElement>) => setCurrency(event.target.value)}>
        <CurrencyDenomination defaultChecked={true} denomination="Ether" />
        <CurrencyDenomination defaultChecked={false} denomination="Gwei" />
        <CurrencyDenomination defaultChecked={false} denomination="Wei" />
      </div>
      <Spacer marginTop="16px" marginBottom="16px" />
      <Disclaimer />
      <Spacer marginBottom="18px"></Spacer>
      <ConsentCheckbox getConsent={(event: ChangeEvent<HTMLInputElement>) => setDisabled(!event.target.checked)} />
      <Spacer marginTop="16px" marginBottom="16px" />
      <Submit handler={submitDeposit} disabled={disabled}>Deposit <DepositSVG className={styles.depositSVG} /></Submit>
    </form>
  );
}