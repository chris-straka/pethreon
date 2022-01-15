import { useState, ChangeEvent, FormEvent, Dispatch, SetStateAction } from "react"
import { CurrencyButtons, CurrencyButton, CurrencyField, SubmitModalButton, Disclaimer, Consent } from "../../../../components"
import { deposit, getContributorBalance } from "../../../../pethreon"
import { MetamaskError, Denomination } from "../../../../utils"
import { BigNumber, utils } from "ethers"
import { DepositSVG } from "../../../../svgs"
import styles from "./DepositModal.module.scss"

interface DepositProps {
  closeModal: (() => void),
  setLoading: Dispatch<SetStateAction<boolean>>,
  setBalance: Dispatch<SetStateAction<string>>,
}

export const DepositModal = ({ closeModal, setLoading, setBalance }: DepositProps) => {
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState<Denomination>(Denomination.ETHER)
  const [disabled, setDisabled] = useState(true)

  const submitDeposit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (+amount <= 0) {
      setDisabled(true)
      return window.alert("Please insert an amount")
    }

    closeModal()

    let amountInWei: BigNumber = BigNumber.from(amount)
    if (currency === Denomination.ETHER) amountInWei = utils.parseEther(amount)
    if (currency === Denomination.GWEI) amountInWei = utils.parseUnits(amount, "gwei")
    setLoading(true)

    try {
      await deposit(amountInWei)
      const newBalance = await getContributorBalance()
      setBalance(newBalance)
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
        className={styles.depositAmount}
        amount={amount}
        getAmount={(event: ChangeEvent<HTMLInputElement>) => setAmount(event.target.value)}
      />
      <CurrencyButtons className={styles.etherButtons} setCurrency={setCurrency}>
        <CurrencyButton checked denomination={Denomination.ETHER} />
        <CurrencyButton denomination={Denomination.GWEI} />
        <CurrencyButton denomination={Denomination.WEI} />
      </CurrencyButtons>
      <Disclaimer
        className={styles.disclaimer}
      />
      <Consent
        className={styles.consent}
        setConsent={setDisabled}
      />
      <SubmitModalButton
        className={styles.submit}
        disabled={disabled}
        onSubmit={submitDeposit}
      >
        Deposit <DepositSVG className={styles.depositSVG} />
      </SubmitModalButton>
    </form>
  );
}