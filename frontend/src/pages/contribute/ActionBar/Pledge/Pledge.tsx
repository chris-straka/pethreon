import { useState, Dispatch, ChangeEvent, SetStateAction, FormEvent } from "react"
import { useHistory } from "react-router"
import { ReactComponent as PledgeSVG } from "../../../../assets/pledge.svg"
import { Disclaimer } from "../../../../components/Disclaimer/Disclaimer"
import { ConsentCheckbox } from "../../../../components/ConsentCheckbox/ConsentCheckbox"
import { CurrencyField } from "../../../../components/CurrencyField/CurrrencyField"
import { Submit } from "../../../../components/Submit/Submit"
import { CurrencyDenomination } from "../../../../components/CurrencyDenomination/CurrencyDenomination"

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
  const [destinationAddress, setDestinationAddress] = useState("")
  const [currency, setCurrency] = useState("")
  const [consent, setConsent] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const history = useHistory()
  const { ethereum } = window as EthereumWindow

  const getAmount = (amount: ChangeEvent<HTMLInputElement>) => setPledgeAmount(amount.target.value);

  const getCurrency = (currency: ChangeEvent<HTMLInputElement>) => {
    if (currency.target.value === "Ether") setCurrency("Ether")
    if (currency.target.value === "Gwei") setCurrency("Gwei")
    if (currency.target.value === "Wei") setCurrency("Wei")
  }

  const getConsent = (consent: ChangeEvent<HTMLInputElement>) => {
    if (consent.target.checked) {
      setConsent(true)
      setDisabled(false)
    } else {
      setConsent(false)
      setDisabled(true)
    }
  }

  const submitPledge = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (typeof ethereum === undefined) {
      window.alert("You're not signed in")
      history.push('/')
      return null
    }
    if (!pledgeAmount) window.alert("Please enter a pledge amount")
    if (!destinationAddress) window.alert("Please enter a destination address")
    if (!consent) return
    closeModal()
    try {
      setLoading(true)
      await createPledge(pledgeAmount, currency, destinationAddress)
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
    <CurrencyField amount={pledgeAmount} getAmount={getAmount}></CurrencyField>
    <div className={styles.currencyButtons} onChange={getCurrency}>
      <CurrencyDenomination defaultChecked={true} denomination="Ether" />
      <CurrencyDenomination defaultChecked={false} denomination="Gwei" />
      <CurrencyDenomination defaultChecked={false} denomination="Wei" />
    </div>
    <h3 className={styles.pledgeHeading}>Who would you like to pledge to?</h3>
    <input type="text" />
    <Disclaimer />
    <ConsentCheckbox getConsent={getConsent}></ConsentCheckbox>
    <Submit handler={submitPledge} disabled={disabled}>Pledge <PledgeSVG className={styles.pledgeSVG} /></Submit>
  </form>
}