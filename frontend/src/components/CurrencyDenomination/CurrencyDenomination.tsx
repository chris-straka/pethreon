import styles from "./CurrencyDenomination.module.css"

interface CurrencyDenominationProps {
  defaultChecked: boolean,
  denomination: string
};

export const CurrencyDenomination = ({ defaultChecked, denomination }: CurrencyDenominationProps) => {
  return <label className={styles.currencyLabelContainer}>
    <input
      type="radio"
      name="currency"
      value={denomination}
      className={styles.radioButton}
      defaultChecked={defaultChecked}
      required
    />
    <span className={styles.currencySpan}>{denomination}</span>
  </label>
}