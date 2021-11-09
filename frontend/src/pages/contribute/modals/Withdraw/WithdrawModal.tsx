import { useState, Dispatch, SetStateAction, ChangeEvent, FormEvent } from "react"
import { BigNumberish, utils } from "ethers"
import { CurrencyField, CurrencyDenomination, Spacer, Disclaimer, ConsentCheckbox, SubmitButton } from "../../../../components"
import { WithdrawSVG } from "../../../../svgs"
import { MetamaskError, EtherDenomination } from "../../../../utils"
import { contributorWithdraw, getContributorBalance, } from "../../../../pethreon"
import styles from "./WithdrawModal.module.scss"


interface WithdrawModalProps {
  closeModal: () => void,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setBalance: Dispatch<SetStateAction<string>>
}

export const WithdrawModal = ({ closeModal, setLoading, setBalance }: WithdrawModalProps) => {
  const [disabled, setDisabled] = useState(true)
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState<EtherDenomination>(EtherDenomination.ETHER)

  const submitWithdraw = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!amount && currency !== EtherDenomination.ALL) return window.alert("Please insert an amount")
    closeModal()
    let amountInWei: BigNumberish = amount
    if (currency === EtherDenomination.ETHER) amountInWei = utils.parseEther(amount)
    if (currency === EtherDenomination.ALL) {
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