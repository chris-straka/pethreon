import { useState, Dispatch, SetStateAction, ChangeEvent, FormEvent } from "react"
import { useHistory } from "react-router"
import { BigNumberish, utils } from "ethers"
import { CurrencyField } from "../../../../components/CurrencyField/CurrrencyField"
import { CurrencyDenomination } from "../../../../components/CurrencyDenomination/CurrencyDenomination"
import { Spacer } from "../../../../components/Spacer/Spacer"
import { Disclaimer } from "../../../../components/Disclaimer/Disclaimer"
import { ConsentCheckbox } from "../../../../components/ConsentCheckbox/ConsentCheckbox"
import { SubmitButton } from "../../../../components/SubmitButton/Submit"
import styles from "./Withdraw.module.css"

import {
  contributorWithdraw, getContributorBalance, MetamaskError,
  EthereumWindow, EtherDenomination
} from "../../../../myEthers"

import { ReactComponent as WithdrawSVG } from "../../../../assets/withdraw.svg"

interface WithdrawModalProps {
  closeModal: () => void,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setBalance: Dispatch<SetStateAction<string>>
}

export const WithdrawModal = ({ closeModal, setLoading, setBalance }: WithdrawModalProps) => {
  const [disabled, setDisabled] = useState(true)
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState<EtherDenomination>(EtherDenomination.ETHER)
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
    let amountInWei: BigNumberish = amount
    if (currency === "Ether") amountInWei = utils.parseEther(amount)
    if (currency === "All") {
      const fullBalance = await getContributorBalance()
      amountInWei = utils.parseEther(fullBalance)
    }
    try {
      setLoading(true)
      await contributorWithdraw(amountInWei)
      const newBalance = await getContributorBalance()
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
        onChange={(event: ChangeEvent<HTMLInputElement>) => setCurrency((event.target.value) as EtherDenomination)} >
        <CurrencyDenomination defaultChecked={true} denomination={EtherDenomination.ETHER} />
        <CurrencyDenomination defaultChecked={false} denomination={EtherDenomination.GWEI} />
        <CurrencyDenomination defaultChecked={false} denomination={EtherDenomination.ALL} />
      </div>
      <Spacer marginBottom="32px" />

      <Disclaimer />
      <Spacer marginBottom="18px" />
      <ConsentCheckbox getConsent={(event: ChangeEvent<HTMLInputElement>) => setDisabled(!event.target.checked)} />
      <Spacer marginBottom="32px" />
      <SubmitButton handler={submitWithdraw} disabled={disabled}>Withdraw <WithdrawSVG className={styles.withdrawSVG} /></SubmitButton>
    </form>
  )
}