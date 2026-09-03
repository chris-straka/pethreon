import { ethers } from "ethers"
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react"
import { EtherAmount, FormField, Submit } from "../"
import { usePethreon } from "../../../../hooks/usePethreon"
import { DateSVG, PersonSVG, PledgeSVG } from "../../../../svgs"
import { Denomination, Pethreon, PledgeType } from "../../../../types"

import styles from "./PledgeModal.module.css"

interface PledgeProps {
  closeModal: (() => void),
  setLoading: ((loading: boolean) => void),
  setNewBalanceAndPledges: ((balance: string, pledges: PledgeType[]) => void)
}

export const PledgeModal = (
  { closeModal, setLoading, setNewBalanceAndPledges }: PledgeProps
) => {
  const [denomination, setDenomination] = useState<Denomination>("Ether")
  const [amountPerPeriod, setAmountPerPeriod] = useState("")
  const [address, setAddress] = useState("")
  const [period, setPeriod] = useState("")
  const contract = usePethreon()

  const submitPledge = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!contract) return window.alert("Contract not yet ready")

    // `address.trim()` used to be called and thrown away (strings are immutable),
    // and validateInputs' result was ignored, so bad input still hit the chain.
    const trimmedAddress = address.trim()
    const validationError = validateInputs(denomination, amountPerPeriod, trimmedAddress, period)
    if (validationError) return window.alert(validationError)

    const amountPerPeriodInWei = await formatAmountToWei(denomination, amountPerPeriod, contract, period)

    const finalAmount = denomination !== "All" ? amountPerPeriod : amountPerPeriodInWei
    const finalCurrency = denomination !== "All" ? denomination : "Wei"
    const GRAND_TOTAL = `The total comes to ${finalAmount} ${finalCurrency} per day, over ${period} day(s). Do you accept?`

    if (!window.confirm(GRAND_TOTAL)) return

    closeModal()
    setLoading(true)

    try {
      await contract.createPledge(trimmedAddress, amountPerPeriodInWei, period)

      const [newBalance, newPledges] = await Promise.all([
        contract.getContributorBalanceInWei(),
        contract.getContributorPledges(),
      ])

      setNewBalanceAndPledges(ethers.formatEther(newBalance), newPledges)

    } catch (error) {
      setLoading(false)
      window.alert(error)
    }
  }

  return (
    <form onClick={(e: MouseEvent) => e.stopPropagation()}>
      <h2 className={styles.heading}>How much to pledge per day?</h2>
      <EtherAmount
        etherAmount={amountPerPeriod}
        setEtherAmount={setAmountPerPeriod}
        options={["All", "Ether", "Gwei", "Wei"]}
        defaultValue="Wei"
        setEtherDenomination={setDenomination}
        disabled={denomination === "All" ? true : false}
      />

      <h2 className={styles.heading}>Across how many days?</h2>
      <div className={styles.container}>
        <DateSVG className={styles.svg} />
        <FormField
          className={styles.field}
          value={period}
          setValue={(event: ChangeEvent<HTMLInputElement>) => setPeriod(event.target.value)}
        />
      </div>

      <h2 className={styles.heading}>To which ethereum address?</h2>
      <div className={styles.container}>
        <PersonSVG className={styles.svg} />
        <FormField
          address
          className={styles.field}
          value={address}
          setValue={(event: ChangeEvent<HTMLInputElement>) => setAddress(event.target.value)}
        />
      </div>

      <Submit
        className={styles.submit}
        onClick={submitPledge}
        svg={<PledgeSVG className={styles.submitSVG} />}
        children="Pledge"
      />
    </form>
  )
}

/** Returns an error message, or null when the inputs are usable. */
function validateInputs(
  currency: Denomination,
  amountPerPeriod: string,
  address: string,
  period: string
): string | null {
  if (!amountPerPeriod && currency !== "All") return "Please enter a pledge amount"
  if (currency !== "All" && +amountPerPeriod <= 0) return "Please enter a pledge amount greater than zero"
  if (!address) return "Please enter a destination address"
  if (!period) return "Please set a pledge duration"
  if (!Number.isInteger(+period) || +period <= 0) return "The duration must be a whole number of days"
  if (+period >= 36525) return "This pledge would last over 100 years, please pick something smaller"

  // ethers validates the checksum too, which the old length check missed
  if (!ethers.isAddress(address)) return `"${address}" is not a valid ethereum address`
  return null
}

async function formatAmountToWei(currency: Denomination, amountPerPeriod: string, contract: Pethreon, period: string) {
  let amountPerPeriodInWei: bigint

  switch (currency) {
    case "Ether":
      amountPerPeriodInWei = ethers.parseUnits(amountPerPeriod, "ether")
      break
    case "Gwei":
      amountPerPeriodInWei = ethers.parseUnits(amountPerPeriod, "gwei")
      break
    case "Wei":
      amountPerPeriodInWei = BigInt(amountPerPeriod)
      break
    case "All": {
      // Integer division on bigint keeps full precision; the old
      // Number(fullBalance) conversion lost it on large balances.
      const fullBalance = await contract.getContributorBalanceInWei()
      amountPerPeriodInWei = fullBalance / BigInt(period)
      break
    }
  }

  return amountPerPeriodInWei
}