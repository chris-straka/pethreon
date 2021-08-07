import { ChangeEvent } from 'react';
import styles from "./CurrencyField.module.css"

interface CurrencySelectProps {
  amount: string,
  getAmount: (event: ChangeEvent<HTMLInputElement>) => void,
}

export const CurrencyField = ({ amount, getAmount }: CurrencySelectProps) => {
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
        min="0"
      />
    </div>
  )
}
