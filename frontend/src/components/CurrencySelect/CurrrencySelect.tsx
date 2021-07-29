import { ChangeEvent } from 'react';
import { CurrencyDenomination } from "./CurrencyDenomination/CurrencyDenomination"
import styles from "./CurrencySelect.module.css"

interface CurrencySelectProps {
  amount: string,
  currency: string,
  getAmount: (event: ChangeEvent<HTMLInputElement>) => void,
  getCurrency: (event: ChangeEvent<HTMLInputElement>) => void
}

export const CurrencySelect = ({ amount, currency, getAmount, getCurrency }: CurrencySelectProps) => {
  return (
    <>
      <div className={styles.currencyField}>
        <span className={styles.Ξ}>{currency === "USD" ? "$" : "Ξ"}</span>
        <input autoFocus required className={styles.depositAmount} type="number" placeholder="0.00" onChange={getAmount} value={amount} />
      </div>
      <div className={styles.currencyButtons} onChange={getCurrency}>
        <CurrencyDenomination defaultChecked={true} denomination="USD" />
        <CurrencyDenomination defaultChecked={false} denomination="Ether" />
        <CurrencyDenomination defaultChecked={false} denomination="Wei" />
      </div>
    </>
  )
}