import { useState, FormEvent, MouseEvent } from "react"
import { ethers } from "ethers"
import { MetamaskError, Denomination, Pethreon } from "../../../../types"
import { WithdrawSVG } from "../../../../svgs"
import { usePethreon } from "../../../../hooks"
import { EtherAmount, Submit } from ".."

import styles from "./WithdrawModal.module.scss"

interface WithdrawProps {
  closeModal: (() => void),
  setLoading: ((loading: boolean) => void)
  setNewBalance: ((balance: string) => void),
}

export const WithdrawModal = ({ closeModal, setLoading, setNewBalance }: WithdrawProps) => {
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [denomination, setDenomination] = useState<Denomination>("Ether")
  const contract = usePethreon()

  async function submitWithdraw(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault()

    if (!contract) return window.alert("Contract not yet ready")
    if (!withdrawAmount && denomination !== "All") return window.alert("Please insert an amount")

    const amountInWei = await getAmountInWei(denomination, withdrawAmount, contract)

    closeModal()
    setLoading(true)

    try {
      await contract.contributorWithdraw(amountInWei)
      const newBalance = await contract.getContributorBalanceInWei()
      const newBalanceEther = await ethers.formatEther(newBalance)
      const newBalanceEtherString = await newBalanceEther.toString()
      setNewBalance(newBalanceEtherString)
    } catch (error) {
      setLoading(false)
      window.alert(`Error: ${(error as MetamaskError).message}`)
    }
  }

  return (
    <form onClick={(e: MouseEvent) => e.stopPropagation()}>
      <h2 className={styles.heading}>How much to withdraw?</h2>
      <EtherAmount
        etherAmount={withdrawAmount}
        setEtherAmount={setWithdrawAmount}
        setEtherDenomination={setDenomination}
        options={["All", "Ether", "Gwei", "Wei"]}
        defaultValue="Wei"
        disabled={denomination === "All" ? true : false}
      />
      <Submit
        className={styles.submit}
        onClick={submitWithdraw}
        svg={<WithdrawSVG className={styles.withdrawSVG} />}
        children="Withdraw"
      />
    </form>
  )
}

async function getAmountInWei(currency: Denomination, amount: string, contract: Pethreon) {
  let amountInWei: bigint;

  switch (currency) {
    case "Ether":
      amountInWei = ethers.parseUnits(amount, "ether")
      break
    case "Gwei":
      amountInWei = ethers.parseUnits(amount, "gwei")
      break
    case "Wei":
      amountInWei = BigInt(amount)
      break
    case "All":
      amountInWei = await contract.getContributorBalanceInWei()
      break
  }

  return amountInWei
}