import { BigNumber, utils } from "ethers"
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react"
import { CurrencyButton, CurrencyButtons, CurrencyField, Submit } from "../../../../components"
import { createPledge, getContributorBalance, getContributorPledges } from "../../../../pethreon"
import { DateSVG, PersonSVG, PledgeSVG } from "../../../../svgs"
import { Denomination, MetamaskError, PledgeType } from "../../../../utils"
import styles from "./PledgeModal.module.scss"

interface PledgeProps {
  closeModal: () => void,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setBalance: Dispatch<SetStateAction<string>>,
  setPledges: Dispatch<SetStateAction<PledgeType[]>>
}

export const PledgeModal = ({ closeModal, setLoading, setBalance, setPledges }: PledgeProps) => {
  const [currency, setCurrency] = useState<Denomination>(Denomination.ETHER)
  const [amount, setAmount] = useState("")
  const [address, setAddress] = useState("")
  const [period, setPeriod] = useState("")

  const submitPledge = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (!amount && currency !== Denomination.ALL) return window.alert("Please enter a pledge amount")
    if (!address) return window.alert("Please enter a destination address")
    if (!period) return window.alert("Please set a pledge duration")

    address.trim()
    if (address.indexOf(" ") >= 0) return window.alert("There is a space in the ethereum address")
    if (address.length !== 42) return window.alert(`Your ethereum address is ${address.length} characters long. It should be 42 characters long`)

    const amountPerPeriod = (+amount / +period).toString()

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
    <form className={styles.form}>

      <h3 className={styles.currencyHeading}>How much to pledge?</h3>
      <CurrencyField
        className={styles.currencyField}
        disabled={currency === Denomination.ALL ? true : false}
        value={amount}
        setValue={(event: ChangeEvent<HTMLInputElement>) => setAmount(event.target.value)}
      />
      <CurrencyButtons
        className={styles.currencyButtons}
        setCurrency={() => setCurrency(Denomination.GWEI)}
      >
        <CurrencyButton checked denomination={Denomination.ETHER} />
        <CurrencyButton denomination={Denomination.GWEI} />
        <CurrencyButton denomination={Denomination.WEI} />
        <CurrencyButton denomination={Denomination.ALL} />
      </CurrencyButtons>

      <h3 className={styles.dateHeading}>Across how many days?</h3>
      <CurrencyField
        className={styles.dateField}
        value={period}
        setValue={(event: ChangeEvent<HTMLInputElement>) => setPeriod(event.target.value)}
        svgComponent={<DateSVG className={styles.dateSVG} />}
      />

      <h3 className={styles.pledgeHeading}>To which ethereum address?</h3>
      <CurrencyField
        className={styles.pledgeInput}
        value={address}
        placeholder="0x"
        textInput
        setValue={(event: ChangeEvent<HTMLInputElement>) => setAddress(event.target.value)}
        svgComponent={<PersonSVG className={styles.addressSVG} />}
      />

      <Submit
        className={styles.submit}
        onSubmit={submitPledge}
      >Pledge <PledgeSVG className={styles.submitSVG} /></Submit>
    </form>
  )
}