import { EtherDenomination } from "../../myEthers"
import styles from "./CurrencyDenomination.module.css"

interface CurrencyDenominationProps {
  defaultChecked: boolean,
  denomination: EtherDenomination
};

export const CurrencyDenomination = ({ defaultChecked, denomination }: CurrencyDenominationProps) => {
  return <label className={styles.currencyContainer}>
    <input
      type="radio"
      name="currency"
      value={denomination}
      className={styles.radioButtonInput}
      defaultChecked={defaultChecked}
      required
    />
    <span className={styles.radioButtonTextSpan}>{denomination}</span>
  </label>
}