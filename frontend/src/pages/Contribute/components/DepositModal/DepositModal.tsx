import { BigNumber, utils } from "ethers"
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react"
import { Consent, CurrencyButton, CurrencyButtons, CurrencyField, Disclaimer, Submit } from "../../../../components"
import { useWeb3 } from "../../../../context/Web3Context"
import { deposit } from "../../../../pethreon"
import { DepositSVG } from "../../../../svgs"
import { MetamaskError } from "../../../../utils"
import styles from "./DepositModal.module.scss"

type Denomination = "Ether" | "Gwei" | "Wei" | "All"

interface DepositProps {
  closeModal: (() => void),
  setLoading: Dispatch<SetStateAction<boolean>>,
  setBalance: Dispatch<SetStateAction<string>>,
}

/** 
 * This is where the contributor can deposit ether from their wallet into the smart contract
 */
export const DepositModal = ({ closeModal, setLoading, setBalance }: DepositProps) => {
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState<Denomination>("Ether")
  const [disabled, setDisabled] = useState(true)
  const { contract } = useWeb3()

  async function submitDeposit(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault()

    const weiToDeposit = validateAmount(amount, currency)

    closeModal()
    setLoading(true)

    try {
      const depositReceipt = await deposit(weiToDeposit) as any
      const newBalanceInWei = depositReceipt.events[0].args.newBalance
      const newBalanceInEther = await utils.formatEther(newBalanceInWei)
      const newBalanceInEtherString = await newBalanceInEther.toString()
      setBalance(newBalanceInEtherString)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      window.alert(`Error: ${(error as MetamaskError).message}`)
    }
  }

  return (
    <form className={styles.form}>
      <h3 className={styles.heading}>How much to deposit?</h3>
      <CurrencyField
        className={styles.currencyField}
        value={amount}
        setValue={(event: ChangeEvent<HTMLInputElement>) => setAmount(event.target.value)}
      />
      <CurrencyButtons className={styles.currencyButtons} setCurrency={setCurrency}>
        <CurrencyButton checked denomination={"Ether"} />
        <CurrencyButton denomination={"Gwei"} />
        <CurrencyButton denomination={"Wei"} />
      </CurrencyButtons>
      <Disclaimer
        className={styles.disclaimer}
      />
      <Consent
        className={styles.consent}
        setConsent={setDisabled}
      />
      <Submit
        className={styles.submit}
        disabled={disabled}
        onSubmit={submitDeposit}
      >
        Deposit <DepositSVG className={styles.depositSVG} />
      </Submit>
    </form>
  );
}

const validateAmount = (amount: string, currency: Denomination) => {
  if (+amount <= 0) return window.alert("Please insert an amount")
  let amountInWei: BigNumber;

  if (currency === "Ether") amountInWei = utils.parseUnits(amount, "ether")
  else if (currency === "Gwei") amountInWei = utils.parseUnits(amount, "gwei")
  else amountInWei = BigNumber.from(Math.floor(+amount))

  return amountInWei
}