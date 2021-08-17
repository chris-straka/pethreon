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

import { EtherDenomination, EthereumWindow, MetamaskError, PledgeType } from "../../../../ethers/utility"
import { getBalance } from "../../../../ethers/getBalance"
import { createPledge } from "../../../../ethers/createPledge"
import { getPledges } from "../../../../ethers/getPledges"

import styles from "./Pledge.module.css"

interface PledgeModalProps {
  closeModal: () => void,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setBalance: Dispatch<SetStateAction<string>>,
  setPledges: Dispatch<SetStateAction<PledgeType[]>>
}

export const PledgeModal = ({ closeModal, setLoading, setBalance, setPledges }: PledgeModalProps) => {
  const [pledgeAmount, setPledgeAmount] = useState("")
  const [address, setAddress] = useState("")
  const [currency, setCurrency] = useState<EtherDenomination>(EtherDenomination.ETHER)
  const [period, setPeriod] = useState("")
  const history = useHistory()
  const { ethereum } = window as EthereumWindow

  const submitPledge = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (typeof ethereum === undefined) {
      window.alert("Ethereum wallet not detected")
      history.push('/')
      return null
    }
    if (!pledgeAmount && currency !== "All") return window.alert("Please enter a pledge amount")
    if (!address) return window.alert("Please enter a destination address")
    if (!period) return window.alert("Please set a pledge duration")

    address.trim()
    if (address.indexOf(" ") >= 0) return window.alert("There is a space in the ethereum address")
    if (address.length !== 42) return window.alert(`Your ethereum address is ${address.length} characters long. It should be 42 characters long`)

    const amountPerPeriod = (+pledgeAmount / +period).toString()

    window.confirm(`The total comes to ${amountPerPeriod} per day, over ${period} day(s). Do you accept?`)

    closeModal()

    try {
      setLoading(true)
      await createPledge({ address, amountPerPeriod, period, currency })
      const newBalance = await getBalance()
      const newPledges = await getPledges()
      setBalance(newBalance)
      setPledges(newPledges)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
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
    <div className={styles.currencyButtons} onChange={(event: ChangeEvent<HTMLInputElement>) => setCurrency((event.target.value) as EtherDenomination)}>
      <CurrencyDenomination defaultChecked={true} denomination={EtherDenomination.ETHER} />
      <CurrencyDenomination defaultChecked={false} denomination={EtherDenomination.GWEI} />
      <CurrencyDenomination defaultChecked={false} denomination={EtherDenomination.WEI} />
      <CurrencyDenomination defaultChecked={false} denomination={EtherDenomination.ALL} />
    </div>
    <Spacer marginBottom="16px" />
    <h3 className={styles.pledgeHeading}>Across how many days?</h3>
    <PledgeField
      type="number"
      placeholder="0"
      min="0"
      value={period}
      onChange={(event: ChangeEvent<HTMLInputElement>) => setPeriod(event.target.value)}
    ><DateSVG className={styles.pledgeSVG} /></PledgeField>
    <Spacer marginBottom="14px" />
    <h3 className={styles.pledgeHeading}>To which ethereum address?</h3>
    <PledgeField
      type="text"
      placeholder="0x"
      spellCheck={false}
      value={address}
      onChange={(event: ChangeEvent<HTMLInputElement>) => setAddress(event.target.value)}
    ><PersonSVG className={styles.pledgeSVG} /></PledgeField>
    <Spacer marginBottom="22px" />
    <Submit handler={submitPledge}>Pledge <PledgeSVG className={styles.submitSVG} /></Submit>
  </form>
}