import { ChangeEvent, FormEvent, MouseEvent, useState } from "react"
import { BigNumber, BigNumberish, utils } from "ethers"
import { CurrencyButton, EtherDenominationSelect, CurrencyField, Disclaimer, Submit, Consent } from ".."
import { useWeb3 } from "../../../../hooks"
import { DepositSVG } from "../../../../svgs"
import { Denomination } from "../../../../types"
import styles from "./DepositModal.module.scss"

interface DepositProps {
  closeModal: (() => void),
  setLoading: ((loading: boolean) => void),
  setNewBalance: ((newBalance: string) => void)
}

export const DepositModal = ({ closeModal, setLoading, setNewBalance }: DepositProps) => {
  const [depositAmount, setDepositAmount] = useState("")
  const [currency, setCurrency] = useState<Denomination>("Ether")
  const [disabled, setDisabled] = useState(true)
  const { contract } = useWeb3()

  async function submitDeposit(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault()

    if (+depositAmount <= 0) return window.alert("Please insert an amount")

    const amountInWei = formatAmountToWei(depositAmount, currency)

    closeModal()
    setLoading(true)

    try {
      const transaction = await contract.deposit({ value: amountInWei })
      const receipt = await transaction.wait()

      if (!receipt.events) throw new Error("Transaction Events not found")
      if (!receipt.events[0].args) throw new Error("Transaction Event args not found")

      const newBalanceInWei = receipt.events[0].args.newBalance
      const newBalanceInEther = await utils.formatEther(newBalanceInWei)
      const newBalanceInEtherString = await newBalanceInEther.toString()
      setNewBalance(newBalanceInEtherString)

    } catch (error) {
      setLoading(false)
      window.alert(error)
    }
  }

  return (
    <form className={styles.form} onClick={(e: MouseEvent) => e.stopPropagation()}>
      <h3 className={styles.heading}>How much to deposit?</h3>
      <CurrencyField
        className={styles.currencyField}
        value={depositAmount}
        setValue={(event: ChangeEvent<HTMLInputElement>) => setDepositAmount(event.target.value)}
      />
      <EtherDenominationSelect
        className={styles.currencyButtons}
        setEtherDenomination={setCurrency}
        options={["Ether", "Gwei", "Wei"]}
      />
      <Disclaimer className={styles.disclaimer} />
      <Consent className={styles.consent} setConsent={setDisabled} />
      <Submit
        className={styles.submit}
        disabled={disabled}
        onClick={submitDeposit}
      >
        Deposit <DepositSVG className={styles.depositSVG} />
      </Submit>
    </form>
  );
}

function formatAmountToWei(amount: string, currency: Denomination): BigNumberish {
  let amountInWei: BigNumberish;

  if (currency === "Ether") amountInWei = utils.parseUnits(amount, "ether")
  else if (currency === "Gwei") amountInWei = utils.parseUnits(amount, "gwei")
  else amountInWei = BigNumber.from(Math.floor(+amount))

  return amountInWei
}
