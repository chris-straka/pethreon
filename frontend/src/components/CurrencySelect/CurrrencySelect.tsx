import { CurrencyDenomination } from "./CurrencyDenomination/CurrencyDenomination"
import { ChangeEvent } from 'react';
import styles from "./CurrencySelect.module.css"

interface CurrencySelectProps {
  amount: string,
  getAmount: (event: ChangeEvent<HTMLInputElement>) => void,
  getCurrency: (event: ChangeEvent<HTMLInputElement>) => void
}

export const CurrencySelect = ({ amount, getAmount, getCurrency }: CurrencySelectProps) => {
  return (
    <>
      <div className={styles.currencyField}>
        <span className={styles.Ξ}>Ξ</span>
        <input autoFocus required className={styles.depositAmount} type="number" placeholder="0.00" onChange={getAmount} value={amount} />
      </div>
      <div className={styles.currencyButtons} onChange={getCurrency}>
        <CurrencyDenomination defaultChecked={true} denomination="Ether" />
        <CurrencyDenomination defaultChecked={false} denomination="Gwei" />
        <CurrencyDenomination defaultChecked={false} denomination="Wei" />
      </div>
    </>
  )
}