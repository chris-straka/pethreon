import { useState, Dispatch, ChangeEvent, SetStateAction, FormEvent } from "react"
import { useHistory } from "react-router"
import { ReactComponent as PledgeSVG } from "../../../../assets/pledge.svg"
import { CurrencyDenomination } from "../../../../components/CurrencyDenomination/CurrencyDenomination"
import { PledgeField } from "./PledgeField/PledgeField"
import { Submit } from "../../../../components/Submit/Submit"
import { Spacer } from "../../../../components/Spacer/Spacer"
import { ReactComponent as CashSVG } from "../../../../assets/cash.svg"
import { ReactComponent as PersonSVG } from "../../../../assets/person.svg"
import { ReactComponent as DateSVG } from "../../../../assets/date.svg"

import { EthereumWindow, MetamaskError } from "../../../../ethers/utility"
import { getBalance } from "../../../../ethers/getBalance"
import { createPledge } from "../../../../ethers/createPledge"

import styles from "./Pledge.module.css"

interface PledgeModalProps {
  closeModal: () => void,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setBalance: Dispatch<SetStateAction<string>>
}

export const PledgeModal = ({ closeModal, setLoading, setBalance }: PledgeModalProps) => {
  const [pledgeAmount, setPledgeAmount] = useState("")
  const [address, setAddress] = useState("")
  const [currency, setCurrency] = useState("")
  const [duration, setDuration] = useState("")
  const history = useHistory()
  const { ethereum } = window as EthereumWindow

  const submitPledge = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (typeof ethereum === undefined) {
      window.alert("Ethereum wallet not detected")
      history.push('/')
      return null
    }
    if (!pledgeAmount && currency === "All") return window.alert("Please enter a pledge amount")
    if (!address) return window.alert("Please enter a destination address")
    if (!duration) return window.alert("Please set a pledge duration")

    address.trim()

    if (address.indexOf(" ") >= 0) return window.alert("There is a space in the ethereum address")
    if (address.length !== 42) return window.alert(`Your ethereum address is ${address.length} characters long. It should be 42 characters long`)

    closeModal()

    try {
      setLoading(true)
      await createPledge(pledgeAmount, currency, address, duration)
      const newBalance = await getBalance()
      setBalance(newBalance)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      window.alert(`Error: ${(error as MetamaskError).message}`)
    }
  }

  return <form className={styles.pledgeFormLayout}>
    <h3 className={styles.pledgeHeading}>How much to pledge?</h3>
    <PledgeField
      autofocus={true}
      type="number"
      placeholder="0"
      min="0"
      disabled={currency === "All" ? true : false}
      value={pledgeAmount}
      onChange={(event: ChangeEvent<HTMLInputElement>) => setPledgeAmount(event.target.value)}
    ><CashSVG className={styles.pledgeSVG} /></PledgeField>
    <Spacer marginBottom="13px" />
    <div className={styles.currencyButtons} onChange={(event: ChangeEvent<HTMLInputElement>) => setCurrency(event.target.value)}>
      <CurrencyDenomination defaultChecked={true} denomination="Ether" />
      <CurrencyDenomination defaultChecked={false} denomination="Gwei" />
      <CurrencyDenomination defaultChecked={false} denomination="Wei" />
      <CurrencyDenomination defaultChecked={false} denomination="All" />
    </div>
    <Spacer marginBottom="16px" />
    <h3 className={styles.pledgeHeading}>Across how many days?</h3>
    <PledgeField
      type="number"
      placeholder="0"
      min="0"
      value={duration}
      onChange={(event: ChangeEvent<HTMLInputElement>) => setDuration(event.target.value)}
    ><DateSVG className={styles.pledgeSVG} /></PledgeField>
    <Spacer marginBottom="14px" />
    <h3 className={styles.pledgeHeading}>To which ethereum address?</h3>
    <PledgeField
      type="text"
      placeholder="0x"
      value={address}
      onChange={(event: ChangeEvent<HTMLInputElement>) => setAddress(event.target.value)}
    ><PersonSVG className={styles.pledgeSVG} /></PledgeField>
    <Spacer marginBottom="22px" />
    <Submit handler={submitPledge}>Pledge <PledgeSVG className={styles.submitSVG} /></Submit>
  </form>
}