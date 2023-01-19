import { Denomination } from "../../../utils"
import styles from "./CurrencyButton.module.scss"

interface CurrencyButtonProps {
  denomination: Denomination,
  checked?: boolean,
};

export const CurrencyButton = ({ denomination, checked = false }: CurrencyButtonProps) => {
  return (
    <label className={styles.currencyContainer}>
      <input
        type="radio"
        name="currency"
        value={denomination}
        className={styles.radioButtonInput}
        defaultChecked={checked}
        required
      />
      <span className={styles.radioButtonTextSpan}>{denomination}</span>
    </label>
  )
}