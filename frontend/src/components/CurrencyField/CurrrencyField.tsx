import { ChangeEvent } from 'react';
import styles from "./CurrencyField.module.css"

interface CurrencySelectProps {
  amount: string,
  disabled?: boolean,
  getAmount: (event: ChangeEvent<HTMLInputElement>) => void,
}

export const CurrencyField = ({ amount, getAmount, disabled = false }: CurrencySelectProps) => {
  return (
    <div className={styles.currencyContainer}>
      <span className={styles.Ξ}>Ξ</span>
      <input
        disabled={disabled}
        autoFocus
        required
        className={styles.currencyField}
        type={disabled ? "text" : "number"}
        placeholder="0"
        onChange={getAmount}
        value={disabled ? "ALL" : amount}
        min="0"
      />
    </div>
  )
}
