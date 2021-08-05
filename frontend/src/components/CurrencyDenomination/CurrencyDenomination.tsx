import styles from "./CurrencyDenomination.module.css"

interface CurrencyDenominationProps {
  defaultChecked: boolean,
  checked: boolean,
  denomination: string
};

export const CurrencyDenomination = ({ defaultChecked, denomination, checked }: CurrencyDenominationProps) => {
  return <label className={styles.currencyLabelContainer}>
    <input
      type="radio"
      name="currency"
      value={denomination}
      className={styles.radioButton}
      defaultChecked={defaultChecked}
      checked={checked}
    />
    <span className={styles.currencySpan}>{denomination}</span>
  </label>
}