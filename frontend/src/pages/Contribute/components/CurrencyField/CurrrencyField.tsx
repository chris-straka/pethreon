import { ChangeEvent, ReactNode } from 'react';
import styles from "./CurrencyField.module.scss"

interface CurrencySelectProps {
  value: string,
  className: string,
  placeholder?: string,
  disabled?: boolean,
  textInput?: boolean,
  autoFocus?: boolean,
  svgComponent?: ReactNode,
  setValue: ((event: ChangeEvent<HTMLInputElement>) => void),
}

export const CurrencyField = ({
  value,
  className,
  setValue,
  placeholder = "0",
  textInput = false,
  svgComponent = null,
  disabled = false,
  autoFocus = true
}: CurrencySelectProps
) => {
  return (
    <span className={styles.transitioningBorder}>
      <div className={`${styles.currencyContainer} ${className}`}>
        {svgComponent === null ? <span className={styles.Ξ}>Ξ</span> : svgComponent}
        <input
          required
          min="0"
          className={styles.currencyField}
          disabled={disabled}
          autoFocus={autoFocus}
          type={disabled || textInput ? "text" : "number"}
          placeholder={placeholder}
          onChange={setValue}
          value={disabled ? "ALL" : value}
          spellCheck={false}
        />
      </div>
    </span>
  )
}
