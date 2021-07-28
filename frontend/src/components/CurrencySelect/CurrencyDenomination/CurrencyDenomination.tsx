import styles from "./CurrencyDenomination.module.css"

interface CurrencyDenominationProps {
  defaultChecked: boolean,
  denomination: string
};

export const CurrencyDenomination = ({ defaultChecked, denomination }: CurrencyDenominationProps) => {
  return <label className={styles.denomination}>
    <input className={styles.radioButton} type="radio" name="currency" defaultChecked={defaultChecked} value={denomination} />
    <div className={styles.currencySpan}>{denomination}</div>
  </label>
}