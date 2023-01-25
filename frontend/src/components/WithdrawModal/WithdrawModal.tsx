import { useState, Dispatch, SetStateAction, ChangeEvent, FormEvent } from "react"
import { MetamaskError, Denomination } from "../../types"
import { CurrencyField, CurrencyButtons, CurrencyButton, Submit } from ".."
import { BigNumber, utils } from "ethers"
import { WithdrawSVG } from "../../svgs"
import { useWeb3 } from "../../context/Web3Context"
import { Pethreon } from "../../../typechain-types"
import styles from "./WithdrawModal.module.scss"

interface WithdrawProps {
  closeModal: (() => void),
  setLoading: Dispatch<SetStateAction<boolean>>,
  setBalance: Dispatch<SetStateAction<string>>
}

export const WithdrawModal = ({ closeModal, setLoading, setBalance }: WithdrawProps) => {
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState<Denomination>("Ether")
  const { contract } = useWeb3()

  async function submitWithdraw(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault()
    if (!amount && currency !== "All") return window.alert("Please insert an amount")

    const amountInWei = await getAmountInWei(currency, amount, contract)

    closeModal()
    setLoading(true)

    try {
      await contract.contributorWithdraw(amountInWei)
      const newBalance = await contract.getContributorBalanceInWei()
      const newBalanceEther = await utils.formatEther(newBalance)
      const newBalanceEtherString = await newBalanceEther.toString()
      setBalance(newBalanceEtherString)

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
        className={styles.currencyField}
        disabled={currency === "All" ? true : false}
        value={amount}
        setValue={(event: ChangeEvent<HTMLInputElement>) => setAmount(event.target.value)}
      />
      <CurrencyButtons className={styles.currencyButtons} setCurrency={setCurrency}>
        <CurrencyButton checked denomination={"Ether"} />
        <CurrencyButton denomination={"Gwei"} />
        <CurrencyButton denomination={"Wei"} />
        <CurrencyButton denomination={"All"} />
      </CurrencyButtons>
      <Submit
        className={styles.submit}
        onSubmit={submitWithdraw}> Withdraw <WithdrawSVG className={styles.withdrawSVG} /></Submit>
    </form>
  )
}

async function getAmountInWei(currency: Denomination, amount: string, contract: Pethreon) {
  let amountInWei: BigNumber;

  switch (currency) {
    case "Ether":
      amountInWei = utils.parseUnits(amount, "ether")
      break
    case "Gwei":
      amountInWei = utils.parseUnits(amount, "gwei")
      break
    case "Wei":
      amountInWei = BigNumber.from(amount)
      break
    case "All":
      amountInWei = await contract.getContributorBalanceInWei()
      break
  }

  return amountInWei
}