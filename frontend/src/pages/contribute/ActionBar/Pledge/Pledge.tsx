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
    if (!pledgeAmount) window.alert("Please enter a pledge amount")
    if (!address) window.alert("Please enter a destination address")
    if (!duration) window.alert("Please set a pledge duration")

    closeModal()
    try {
      setLoading(true)
      await createPledge(pledgeAmount, currency, address)
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
      type="number"
      placeholder="0"
      min={0}
      value={pledgeAmount}
      onChange={(event: ChangeEvent<HTMLInputElement>) => setPledgeAmount(event.target.value)}
    ><CashSVG /></PledgeField>
    <Spacer marginBottom="8px" />
    <div className={styles.currencyButtons} onChange={(event: ChangeEvent<HTMLInputElement>) => setCurrency(event.target.value)}>
      <CurrencyDenomination defaultChecked={true} denomination="Ether" />
      <CurrencyDenomination defaultChecked={false} denomination="Gwei" />
      <CurrencyDenomination defaultChecked={false} denomination="Wei" />
    </div>
    <h3 className={styles.pledgeHeading}>Over how many days?</h3>
    <PledgeField
      type="number"
      placeholder="0"
      min={0}
      value={duration}
      onChange={(event: ChangeEvent<HTMLInputElement>) => setDuration(event.target.value)}
    ><DateSVG /></PledgeField>
    <Spacer marginBottom="16px" />
    <h3 className={styles.pledgeHeading}>To which ethereum address?</h3>
    <PledgeField
      type="text"
      placeholder="0x"
      value={address}
      onChange={(event: ChangeEvent<HTMLInputElement>) => setAddress(event.target.value)}
    ><PersonSVG /></PledgeField>
    <Spacer marginBottom="16px" />
    <Submit handler={submitPledge} disabled={address && pledgeAmount && duration ? true : false}>Pledge <PledgeSVG className={styles.pledgeSVG} /></Submit>
  </form>
}