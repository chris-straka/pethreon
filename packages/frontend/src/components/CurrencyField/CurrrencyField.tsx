import { ChangeEvent, ReactNode } from 'react';
import styles from "./CurrencyField.module.scss"

interface CurrencySelectProps {
  value: string,
  className: string,
  placeholder?: string,
  disabled?: boolean,
  textInput?: boolean,
  svgComponent?: ReactNode,
  setValue: ((event: ChangeEvent<HTMLInputElement>) => void),
}

export const CurrencyField = (
  { value, className, setValue, placeholder = "0",
    textInput = false, svgComponent = null, disabled = false }: CurrencySelectProps
) => {
  return (
    <span className={styles.transitioningBorder}>
      <div className={`${styles.currencyContainer} ${className}`}>
        {svgComponent === null ? <span className={styles.Ξ}>Ξ</span> : svgComponent}
        <input
          className={styles.currencyField}
          disabled={disabled}
          autoFocus
          required
          type={disabled || textInput ? "text" : "number"}
          placeholder={placeholder}
          onChange={setValue}
          value={disabled ? "ALL" : value}
          min="0"
          spellCheck={false}
        />
      </div>
    </span>
  )
}
