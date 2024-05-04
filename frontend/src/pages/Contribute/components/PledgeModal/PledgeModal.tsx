import { ChangeEvent, FormEvent, MouseEvent, useState } from "react"
import { ethers } from "ethers"
import { EtherAmount, FormField, Submit } from "../"
import { DateSVG, PersonSVG, PledgeSVG } from "../../../../svgs"
import { Denomination, PledgeType, Pethreon } from "../../../../types"
import { useP } from "../../../../hooks/useP"

import styles from "./PledgeModal.module.scss"

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
  const contract = useP()

  const submitPledge = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!contract) return window.alert("Contract not yet ready")

    address.trim()
    validateInputs(denomination, amountPerPeriod, address, period)

    const amountPerPeriodInWei = await formatAmountToWei(denomination, amountPerPeriod, contract, period)

    const finalAmount = denomination !== "All" ? amountPerPeriod : amountPerPeriodInWei
    const finalCurrency = denomination !== "All" ? denomination : "Wei"
    const GRAND_TOTAL = `The total comes to ${finalAmount} ${finalCurrency} per day, over ${period} day(s). Do you accept?`

    if (!window.confirm(GRAND_TOTAL)) return

    closeModal()
    setLoading(true)

    try {
      await contract.createPledge(address, amountPerPeriodInWei, period)

      const newBalance = await contract.getContributorBalanceInWei()
      const newBalanceEther = await ethers.formatEther(newBalance)
      const newBalanceEtherString = await newBalanceEther.toString()

      const newPledges = await contract.getContributorPledges()

      setNewBalanceAndPledges(newBalanceEtherString, newPledges)

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

function validateInputs(
  currency: Denomination,
  amountPerPeriod: string,
  address: string,
  period: string
) {
  if (!amountPerPeriod && currency !== "All") return window.alert("Please enter a pledge amount")
  if (!address) return window.alert("Please enter a destination address")
  if (!period) return window.alert("Please set a pledge duration")
  if (+period >= 36525) return window.alert("This pledge would last over 100 years, please pick something smaller")

  if (address.indexOf(" ") >= 0) return window.alert("There is a space in the ethereum address")
  if (address.length !== 42) return window.alert(`Your ethereum address is ${address.length} characters long. It should be 42 characters long`)
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
    case "All":
      const fullBalance = await contract.getContributorBalanceInWei()
      let fullBalancePerPeriod = (Number(fullBalance) / +period)
      amountPerPeriodInWei = BigInt(fullBalancePerPeriod)
  }

  return amountPerPeriodInWei
}