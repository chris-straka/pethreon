import { useState, ChangeEvent, FormEvent } from "react"
import { BigNumber, utils } from "ethers"
import { MetamaskError, Denomination, Pethreon } from "../../../../types"
import { WithdrawSVG } from "../../../../svgs"
import { useWeb3 } from "../../../../hooks"
import { EtherDenominationSelect, CurrencyField, Submit } from ".."
import styles from "./WithdrawModal.module.scss"

interface WithdrawProps {
  closeModal: (() => void),
  setLoading: ((loading: boolean) => void)
  setNewBalance: ((balance: string) => void),
}

export const WithdrawModal = ({ closeModal, setLoading, setNewBalance }: WithdrawProps) => {
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
      setNewBalance(newBalanceEtherString)

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
      <EtherDenominationSelect
        className={styles.currencyButtons}
        setEtherDenomination={setCurrency}
        options={["All", "Ether", "Gwei", "Wei"]}
      />
      <Submit className={styles.submit} onClick={submitWithdraw}>Withdraw <WithdrawSVG className={styles.withdrawSVG} /></Submit>
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