import { useState, Dispatch, SetStateAction, ChangeEvent, FormEvent } from "react"
import { useHistory } from "react-router"
import { ReactComponent as WithdrawSVG } from "../../../../assets/withdraw.svg"
import { CurrencyField } from "../../../../components/CurrencyField/CurrrencyField"
import { CurrencyDenomination } from "../../../../components/CurrencyDenomination/CurrencyDenomination"
import { Spacer } from "../../../../components/Spacer/Spacer"
import { Disclaimer } from "../../../../components/Disclaimer/Disclaimer"
import { ConsentCheckbox } from "../../../../components/ConsentCheckbox/ConsentCheckbox"
import { Submit } from "../../../../components/Submit/Submit"

import { MetamaskError, EthereumWindow } from "../../../../ethers/utility"
import { contributorWithdraw } from "../../../../ethers/contributorWithdraw"
import { getBalance } from "../../../../ethers/getBalance"

import styles from "./Withdraw.module.css"

interface WithdrawModalProps {
  closeModal: () => void,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setBalance: Dispatch<SetStateAction<string>>
}

export const WithdrawModal = ({ closeModal, setLoading, setBalance }: WithdrawModalProps) => {
  const [disabled, setDisabled] = useState(true)
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("Ether")
  const history = useHistory()
  const { ethereum } = window as EthereumWindow

  const submitWithdraw = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (typeof ethereum === undefined) {
      window.alert("You're not signed in")
      history.push('/')
      return null
    }
    if (!amount && currency !== "All") {
      window.alert("Please insert an amount")
      return
    }
    closeModal()
    try {
      setLoading(true)
      await contributorWithdraw(amount, currency)
      const newBalance = await getBalance()
      setBalance(newBalance)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      window.alert(`Error: ${(error as MetamaskError).message}`)
    }
  }

  return (
    <form className={styles.withdrawFormLayout}>

      <h3 className={styles.withdrawHeading}>How much to withdraw?</h3>
      <CurrencyField
        amount={amount}
        disabled={currency === "All" ? true : false}
        getAmount={(event: ChangeEvent<HTMLInputElement>) => setAmount(event.target.value)}
      />
      <Spacer marginBottom="16px" />
      <div className={styles.currencyButtons}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setCurrency(event.target.value)} >
        <CurrencyDenomination defaultChecked={true} denomination="Ether" />
        <CurrencyDenomination defaultChecked={false} denomination="Gwei" />
        <CurrencyDenomination defaultChecked={false} denomination="All" />
      </div>
      <Spacer marginBottom="32px" />

      <Disclaimer />
      <Spacer marginBottom="18px" />
      <ConsentCheckbox getConsent={(event: ChangeEvent<HTMLInputElement>) => setDisabled(!event.target.checked)} />
      <Spacer marginBottom="32px" />
      <Submit handler={submitWithdraw} disabled={disabled}>Withdraw <WithdrawSVG className={styles.withdrawSVG} /></Submit>
    </form>
  )
}