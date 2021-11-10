import { useState, Dispatch, SetStateAction, ChangeEvent, FormEvent } from "react"
import { CurrencyField } from "../../../../components"
import { BigNumberish, utils } from "ethers"
import { MetamaskError, Denomination } from "../../../../utils"
import { contributorWithdraw, getContributorBalance, } from "../../../../pethreon"
import { WithdrawSVG } from "../../../../svgs"
import { DisclaimerAndSubmit, EtherDenominationButtons } from ".."
import styles from "./Withdraw.module.scss"

interface WithdrawProps {
  closeModal: (() => void),
  setLoading: Dispatch<SetStateAction<boolean>>,
  setBalance: Dispatch<SetStateAction<string>>
}

export const Withdraw = ({ closeModal, setLoading, setBalance }: WithdrawProps) => {
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState<Denomination>(Denomination.ETHER)

  const submitWithdraw = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!amount && currency !== Denomination.ALL) return window.alert("Please insert an amount")
    closeModal()
    let amountInWei: BigNumberish = amount
    if (currency === Denomination.ETHER) amountInWei = utils.parseEther(amount)
    if (currency === Denomination.ALL) {
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
      <EtherDenominationButtons setCurrency={setCurrency} />
      <DisclaimerAndSubmit onSubmit={submitWithdraw}>Withdraw <WithdrawSVG className={styles.withdrawSVG}/></DisclaimerAndSubmit>
    </form>
  )
}