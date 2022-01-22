import { useState, Dispatch, SetStateAction, ChangeEvent, FormEvent } from "react"
import { MetamaskError, Denomination } from "../../utils"
import { contributorWithdraw, getContributorBalance } from "../../pethreon"
import { CurrencyField, CurrencyButtons, CurrencyButton, Submit } from "../"
import { BigNumber, utils } from "ethers"
import { WithdrawSVG } from "../../svgs"
import styles from "./WithdrawModal.module.scss"

interface WithdrawProps {
  closeModal: (() => void),
  setLoading: Dispatch<SetStateAction<boolean>>,
  setBalance: Dispatch<SetStateAction<string>>
}

export const WithdrawModal = ({ closeModal, setLoading, setBalance }: WithdrawProps) => {
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState<Denomination>(Denomination.ETHER)

  const submitWithdraw = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!amount && currency !== Denomination.ALL) return window.alert("Please insert an amount")
    if (currency === Denomination.ALL) {
      const fullBalance = await getContributorBalance()
      const fullBalanceInWei = utils.parseEther(fullBalance)
      setAmount(await fullBalanceInWei.toString())
    }
    closeModal()
    let amountInWei: BigNumber = BigNumber.from(amount)
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
    <form className={styles.form}>
      <h3 className={styles.heading}>How much to withdraw?</h3>
      <CurrencyField
        value={amount}
        className={styles.currencyField}
        disabled={currency === Denomination.ALL ? true : false}
        setValue={(event: ChangeEvent<HTMLInputElement>) => setAmount(event.target.value)}
      />
      <CurrencyButtons className={styles.currencyButtons} setCurrency={setCurrency}>
        <CurrencyButton checked denomination={Denomination.ETHER} />
        <CurrencyButton denomination={Denomination.GWEI} />
        <CurrencyButton denomination={Denomination.WEI} />
        <CurrencyButton denomination={Denomination.ALL} />
      </CurrencyButtons>
      <Submit
        className={styles.submit}
        onSubmit={submitWithdraw}> Withdraw <WithdrawSVG className={styles.withdrawSVG} /></Submit>
    </form>
  )
}