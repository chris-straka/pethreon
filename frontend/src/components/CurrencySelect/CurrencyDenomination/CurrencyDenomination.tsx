import styles from "./CurrencyDenomination.module.css"

interface CurrencyDenominationProps {
  defaultChecked: boolean,
  denomination: string
};

export const CurrencyDenomination = ({ defaultChecked, denomination }: CurrencyDenominationProps) => {
  return <label className={styles.currency}>
    <input type="radio" name="currency" defaultChecked={defaultChecked} value={denomination} />
    <span>{denomination}</span>
  </label>
}