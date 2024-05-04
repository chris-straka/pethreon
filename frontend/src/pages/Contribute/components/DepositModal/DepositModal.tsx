import { FormEvent, MouseEvent, useState } from "react"
import { ethers } from "ethers"
import { EtherAmount, Submit } from ".."
import { DISCLAIMER } from '../../../../messages'
import { DepositSVG } from "../../../../svgs"
import { Denomination } from "../../../../types"
import { useP } from "../../../../hooks/useP"

import styles from "./DepositModal.module.scss"

interface DepositProps {
  closeModal: (() => void),
  setLoading: ((loading: boolean) => void),
  setNewBalance: ((newBalance: string) => void)
}

export const DepositModal = ({ closeModal, setLoading, setNewBalance }: DepositProps) => {
  const [depositAmount, setDepositAmount] = useState("")
  const [denomination, setDenomination] = useState<Denomination>("Ether")
  const [consent, setConsent] = useState(false)
  const contract = useP()

  async function submitDeposit(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault()

    if (!contract) return window.alert("Contract not yet ready")
    if (+depositAmount <= 0) return window.alert("Please insert an amount")

    const amountInWei = formatAmountToWei(depositAmount, denomination)

    closeModal()
    setLoading(true)

    try {
      const deposit = await contract.deposit({ value: amountInWei })
      const receipt = await deposit.wait()
      if (!receipt) throw new Error("Receipt not found")

      const logs = receipt.logs;
      if (!logs || logs.length === 0) throw new Error("Transaction Events not found");

      // Retrieve newBalance from topics
      // topics[0] is the keccak256 hash of the event signature for identifying the event type
      const newBalance = receipt.logs[0].topics[1]
      if (!newBalance) throw new Error("Transaction Event newBalance not found")

      const newBalanceInEther = await ethers.formatEther(newBalance)
      const newBalanceInEtherString = await newBalanceInEther.toString()
      setNewBalance(newBalanceInEtherString)

    } catch (error) {
      setLoading(false)
      window.alert(error)
    }
  }

  const disclaimer = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setTimeout(() => {
      window.alert(DISCLAIMER)
    }, 100);
  }

  return (
    <form onClick={(e: MouseEvent) => e.stopPropagation()}>

      <h2 className={styles.heading}>How much to deposit?</h2>
      <EtherAmount
        etherAmount={depositAmount}
        setEtherAmount={setDepositAmount}
        setEtherDenomination={setDenomination}
        options={["Ether", "Gwei", "Wei"]}
        defaultValue="Ether"
      />

      <div className={styles.disclaimer}>
        <input
          required
          className={styles.disclaimer__checkbox}
          type="checkbox"
          id="consent"
          onChange={() => setConsent(!consent)}
        />
        <label className={styles.disclaimer__label} htmlFor="consent">
          I've read the&nbsp;
          <button className={styles.disclaimer__button} onClick={disclaimer}>disclaimer</button>
          &nbsp;and I accept the risks.
        </label>
      </div>

      <Submit
        className={styles.submit}
        onClick={submitDeposit}
        svg={<DepositSVG className={styles.svg} />}
        disabled={!consent}
        children="Deposit"
      />

    </form>
  );
}

function formatAmountToWei(amount: string, currency: Denomination) {
  let amountInWei: bigint;

  if (currency === "Ether") amountInWei = ethers.parseUnits(amount, "ether")
  else if (currency === "Gwei") amountInWei = ethers.parseUnits(amount, "gwei")
  else amountInWei = BigInt(Math.floor(+amount))

  return amountInWei
}
