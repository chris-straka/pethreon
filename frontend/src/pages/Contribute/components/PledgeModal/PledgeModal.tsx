import { BigNumber, utils } from "ethers"
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react"
import { Pethreon } from "../../../../../typechain-types"
import { CurrencyButton, CurrencyButtons, CurrencyField, Submit } from "../../../../components"
import { useWeb3 } from "../../../../context/Web3Context"
import { DateSVG, PersonSVG, PledgeSVG } from "../../../../svgs"
import { Denomination, PledgeType } from "../../../../types"
import styles from "./PledgeModal.module.scss"

interface PledgeProps {
  closeModal: (() => void),
  setLoading: Dispatch<SetStateAction<boolean>>,
  setBalance: Dispatch<SetStateAction<string>>,
  setPledges: Dispatch<SetStateAction<PledgeType[]>>
}

export const PledgeModal = (
  { closeModal, setLoading, setBalance, setPledges }: PledgeProps
) => {
  const [currency, setCurrency] = useState<Denomination>("Ether")
  const [amountPerPeriod, setAmountPerPeriod] = useState("")
  const [address, setAddress] = useState("")
  const [period, setPeriod] = useState("")
  const { contract } = useWeb3()

  const submitPledge = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()

    address.trim()
    validateInputs(currency, amountPerPeriod, address, period)

    const amountPerPeriodInWei = await formatAmountToWei(currency, amountPerPeriod, contract, period)

    const finalAmount = currency !== "All" ? amountPerPeriod : amountPerPeriodInWei
    const finalCurrency = currency !== "All" ? currency : "Wei"
    const GRAND_TOTAL = `The total comes to ${finalAmount} ${finalCurrency} per day, over ${period} day(s). Do you accept?`

    if (!window.confirm(GRAND_TOTAL)) return

    closeModal()
    setLoading(true)

    try {
      await contract.createPledge(address, amountPerPeriodInWei, period)

      const newBalance = await contract.getContributorBalanceInWei()
      const newBalanceEther = await utils.formatEther(newBalance)
      const newBalanceEtherString = await newBalanceEther.toString()
      setBalance(newBalanceEtherString)

      const newPledges = await contract.getContributorPledges()
      setPledges(newPledges)

      setLoading(false)

    } catch (error) {
      setLoading(false)
      console.log(error)
      window.alert(error)
    }
  }

  return (
    <form className={styles.form}>
      <h3 className={styles.currencyHeading}>How much to pledge per day?</h3>
      <CurrencyField
        className={styles.currencyField}
        disabled={currency === "All" ? true : false}
        value={amountPerPeriod}
        setValue={(event: ChangeEvent<HTMLInputElement>) => setAmountPerPeriod(event.target.value)}
      />
      <CurrencyButtons className={styles.currencyButtons} setCurrency={setCurrency}>
        <CurrencyButton checked denomination={"Ether"} />
        <CurrencyButton denomination={"Gwei"} />
        <CurrencyButton denomination={"Wei"} />
        <CurrencyButton denomination={"All"} />
      </CurrencyButtons>

      <h3 className={styles.dateHeading}>Across how many days?</h3>
      <CurrencyField
        autoFocus={false}
        className={styles.currencyField}
        value={period}
        setValue={(event: ChangeEvent<HTMLInputElement>) => setPeriod(event.target.value)}
        svgComponent={<DateSVG className={styles.dateSVG} />}
      />

      <h3 className={styles.pledgeHeading}>To which ethereum address?</h3>
      <CurrencyField
        autoFocus={false}
        className={styles.currencyField}
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
  let amountPerPeriodInWei: BigNumber

  switch (currency) {
    case "Ether":
      amountPerPeriodInWei = utils.parseUnits(amountPerPeriod, "ether")
      break
    case "Gwei":
      amountPerPeriodInWei = utils.parseUnits(amountPerPeriod, "gwei")
      break
    case "Wei":
      amountPerPeriodInWei = BigNumber.from(amountPerPeriod)
      break
    case "All":
      const fullBalance = await contract.getContributorBalanceInWei()
      let fullBalancePerPeriod = (+fullBalance / +period)
      amountPerPeriodInWei = BigNumber.from(fullBalancePerPeriod)
  }

  return amountPerPeriodInWei
}