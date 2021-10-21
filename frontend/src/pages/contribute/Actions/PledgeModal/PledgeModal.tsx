import { useState, Dispatch, ChangeEvent, SetStateAction, FormEvent } from "react"
import { CurrencyDenomination } from "../../../../components/CurrencyDenomination/CurrencyDenomination"
import { PledgeField } from "./PledgeModalField/PledgeModalField"
import { SubmitButton } from "../../../../components/SubmitButton/Submit"
import { Spacer } from "../../../../components/Spacer/Spacer"
import { BigNumberish, utils } from "ethers"
import { CashSVG, PersonSVG, DateSVG, PledgeSVG } from "../../../../svgs"
import styles from "./PledgeModal.module.scss"

import {
  getContributorBalance, createPledge, getContributorPledges,
  EtherDenomination, MetamaskError, PledgeType
} from "../../../../pethreon"


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

  const submitPledge = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (!pledgeAmount && currency !== EtherDenomination.ALL) return window.alert("Please enter a pledge amount")
    if (!address) return window.alert("Please enter a destination address")
    if (!period) return window.alert("Please set a pledge duration")

    address.trim()
    if (address.indexOf(" ") >= 0) return window.alert("There is a space in the ethereum address")
    if (address.length !== 42) return window.alert(`Your ethereum address is ${address.length} characters long. It should be 42 characters long`)

    const amountPerPeriod = (+pledgeAmount / +period).toString()

    window.confirm(`The total comes to ${amountPerPeriod} per day, over ${period} day(s). Do you accept?`)

    closeModal()

    let amountPerPeriodInWei: BigNumberish = amountPerPeriod
    if (currency === EtherDenomination.ETHER) amountPerPeriodInWei = utils.parseEther(amountPerPeriod)
    if (currency === EtherDenomination.WEI) amountPerPeriodInWei = utils.parseUnits(amountPerPeriod, "gwei")
    if (currency === EtherDenomination.ALL) {
      const fullBalance = await getContributorBalance()
      amountPerPeriodInWei = utils.parseEther(fullBalance)
    }

    try {
      setLoading(true)
      await createPledge(address, period, amountPerPeriodInWei)
      const newBalance = await getContributorBalance()
      const newPledges = await getContributorPledges()
      setBalance(newBalance)
      setPledges(newPledges)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
      window.alert(`${(error as MetamaskError).message}`)
    }
  }

  return (
    <form className={styles.pledgeFormLayout}>
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
      <div className={styles.currencyButtons}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setCurrency((event.target.value) as EtherDenomination)}>
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
      <SubmitButton handler={submitPledge}>Pledge <PledgeSVG className={styles.submitSVG} /></SubmitButton>
    </form>
  )
}