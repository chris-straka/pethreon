import { BigNumberish, utils } from "ethers"
import { useState, ChangeEvent, FormEvent, Dispatch, SetStateAction } from "react"
import { Spacer, Disclaimer, SubmitButton, CurrencyDenomination, CurrencyField, ConsentCheckbox } from "../../../../components"
import { DepositSVG } from "../../../../svgs"
import { deposit, getContributorBalance, } from "../../../../pethreon"
import { EtherDenomination, MetamaskError } from "../../../../utils/EtherTypes"
import styles from "./Deposit.module.scss"

interface DepositModalProps {
  closeModal: () => void,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setBalance: Dispatch<SetStateAction<string>>
}

export const DepositModal = ({ closeModal, setLoading, setBalance }: DepositModalProps) => {
  const [disabled, setDisabled] = useState(true)
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState<EtherDenomination>(EtherDenomination.ETHER)
  const [invalid, setInvalid] = useState(false)

  const submitDeposit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (+amount <= 0) {
      setInvalid(true)
      return window.alert("Please insert an amount")
    }

    closeModal()

    let amountInWei: BigNumberish = amount
    if (currency === EtherDenomination.ETHER) amountInWei = utils.parseEther(amount)
    if (currency === EtherDenomination.GWEI) amountInWei = utils.parseUnits(amount, "gwei")

    try {
      setLoading(true)
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
    <form className={styles.depositFormLayout}>
      <h3 className={styles.depositHeading}>How much to deposit?</h3>
      <CurrencyField
        invalid={invalid}
        amount={amount}
        getAmount={(event: ChangeEvent<HTMLInputElement>) => setAmount(event.target.value)}
      />
      <Spacer marginBottom="16px" />
      <div
        className={styles.currencyButtons}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setCurrency((event.target.value) as EtherDenomination)}
      >
        <CurrencyDenomination defaultChecked={true} denomination={EtherDenomination.ETHER} />
        <CurrencyDenomination defaultChecked={false} denomination={EtherDenomination.GWEI} />
        <CurrencyDenomination defaultChecked={false} denomination={EtherDenomination.WEI} />
      </div>
      <Spacer marginTop="16px" marginBottom="16px" />
      <Disclaimer />
      <Spacer marginBottom="18px"></Spacer>
      <ConsentCheckbox getConsent={(event: ChangeEvent<HTMLInputElement>) => setDisabled(!event.target.checked)} />
      <Spacer marginTop="16px" marginBottom="16px" />
      <SubmitButton handler={submitDeposit} disabled={disabled}>Deposit <DepositSVG className={styles.depositSVG} /></SubmitButton>
    </form>
  );
}