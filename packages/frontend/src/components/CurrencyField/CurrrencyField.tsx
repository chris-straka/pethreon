import { ChangeEvent } from 'react';
import styles from "./CurrencyField.module.scss"

interface CurrencySelectProps {
  amount: string,
  className: string,
  disabled?: boolean,
  invalid?: boolean,
  getAmount: (event: ChangeEvent<HTMLInputElement>) => void,
}

export const CurrencyField = ({ amount, className, getAmount, disabled = false, invalid = false }: CurrencySelectProps) => {
  return (
    <div className={`${styles.currencyContainer} ${className}`}>
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
