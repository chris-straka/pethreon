import { useState, Dispatch, ChangeEvent, SetStateAction, FormEvent } from "react"
import { SubmitModalButton, CurrencyDenomination } from "../../../../components"
import { CashSVG, PersonSVG, DateSVG, PledgeSVG } from "../../../../svgs"
import { getContributorBalance, createPledge, getContributorPledges } from "../../../../pethreon"
import { PledgeType, Denomination, MetamaskError } from "../../../../utils"
import { BigNumber, utils } from "ethers"
import styles from "./PledgeModal.module.scss"

interface PledgeProps {
  closeModal: () => void,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setBalance: Dispatch<SetStateAction<string>>,
  setPledges: Dispatch<SetStateAction<PledgeType[]>>
}

export const PledgeModal = ({ closeModal, setLoading, setBalance, setPledges }: PledgeProps) => {
  const [currency, setCurrency] = useState<Denomination>(Denomination.ETHER)
  const [pledgeAmount, setPledgeAmount] = useState("")
  const [address, setAddress] = useState("")
  const [period, setPeriod] = useState("")

  const submitPledge = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (!pledgeAmount && currency !== Denomination.ALL) return window.alert("Please enter a pledge amount")
    if (!address) return window.alert("Please enter a destination address")
    if (!period) return window.alert("Please set a pledge duration")

    address.trim()
    if (address.indexOf(" ") >= 0) return window.alert("There is a space in the ethereum address")
    if (address.length !== 42) return window.alert(`Your ethereum address is ${address.length} characters long. It should be 42 characters long`)

    const amountPerPeriod = (+pledgeAmount / +period).toString()

    window.confirm(`The total comes to ${amountPerPeriod} per day, over ${period} day(s). Do you accept?`)

    closeModal()

    let amountPerPeriodInWei: BigNumber = BigNumber.from(amountPerPeriod)
    if (currency === Denomination.ETHER) amountPerPeriodInWei = utils.parseEther(amountPerPeriod)
    if (currency === Denomination.WEI) amountPerPeriodInWei = utils.parseUnits(amountPerPeriod, "gwei")
    if (currency === Denomination.ALL) {
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
      <div className={styles.pledgeInputContainer}>
        <input
          autoFocus={true}
          className={styles.pledgeInput}
          type="number"
          placeholder="0"
          min="0"
          disabled={currency === Denomination.ALL ? true : false}
          value={pledgeAmount}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setPledgeAmount(event.target.value)}
        />
        <CashSVG className={styles.pledgeSVG} />
      </div>
      <div
        className={styles.currencyButtons}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setCurrency((event.target.value) as Denomination)}>
        <CurrencyDenomination defaultChecked={true} denomination={Denomination.ETHER} />
        <CurrencyDenomination defaultChecked={false} denomination={Denomination.GWEI} />
        <CurrencyDenomination defaultChecked={false} denomination={Denomination.WEI} />
        <CurrencyDenomination defaultChecked={false} denomination={Denomination.ALL} />
      </div>
      <h3 className={styles.pledgeHeading}>Across how many days?</h3>
      <div className={styles.pledgeInputContainer}>
        <input
          className={styles.pledgeInput}
          type="number"
          placeholder="0"
          min="0"
          value={period}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setPeriod(event.target.value)}
        />
        <DateSVG className={styles.pledgeSVG} />
      </div>
      <h3 className={styles.pledgeHeading}>To which ethereum address?</h3>
      <div className={styles.pledgeInputContainer}>
        <input
          className={styles.pledgeInput}
          type="text"
          placeholder="0x"
          spellCheck={false}
          value={address}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setAddress(event.target.value)}
        />
        <PersonSVG className={styles.pledgeSVG} />
      </div>
      <SubmitModalButton className={styles.submit} onSubmit={submitPledge}>Pledge <PledgeSVG className={styles.submitSVG} /></SubmitModalButton>
    </form>
  )
}