import { ChangeEvent } from 'react';
import styles from "./CurrencySelect.module.css"

interface CurrencySelectProps {
  amount: string,
  getAmount: (event: ChangeEvent<HTMLInputElement>) => void,
}

export const CurrencySelect = ({ amount, getAmount }: CurrencySelectProps) => {
  return (
    <div className={styles.currencyContainer}>
      <span className={styles.Ξ}>Ξ</span>
      <input
        autoFocus
        required
        className={styles.currencyField}
        type="number"
        placeholder="0.00"
        onChange={getAmount}
        value={amount}
      />
    </div>
  )
}