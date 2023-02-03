import { useState, ChangeEvent, Dispatch, SetStateAction } from "react"
import { Denomination } from "../../../../types"

import styles from "./CurrencySelect.module.scss"

interface EtherDenominationSelectProps {
  className?: string,
  setEtherDenomination: Dispatch<SetStateAction<Denomination>>,
  options: Denomination[]
}

export const EtherDenominationSelect = ({ className, setEtherDenomination, options }: EtherDenominationSelectProps) => {
  const [selectedValue, setSelectedValue] = useState("")

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const chosenDenomination = event.target.value as Denomination
    setSelectedValue(chosenDenomination)
    setEtherDenomination(chosenDenomination)
  }

  return (
    <div className={`${styles.currencyButtons} ${className}`}>
      {options.map((option) => (
        <label key={option} className={styles.currencyContainer}>
          <input
            type="radio"
            value={option}
            checked={selectedValue === option}
            className={styles.radioButtonInput}
            onChange={handleChange}
            required
          />
          <span className={styles.radioButtonTextSpan}>{option}</span>
        </label>
      ))}
    </div>
  )
}