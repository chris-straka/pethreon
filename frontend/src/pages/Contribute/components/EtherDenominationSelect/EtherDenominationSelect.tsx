import { useState, ChangeEvent, Dispatch, SetStateAction } from "react"
import { Denomination } from "../../../../types"

import styles from "./EtherDenominationSelect.module.scss"

interface EtherDenominationSelectProps {
  setEtherDenomination: Dispatch<SetStateAction<Denomination>>,
  options: Denomination[]
}

export const EtherDenominationSelect = ({ setEtherDenomination, options }: EtherDenominationSelectProps) => {
  const [selectedValue, setSelectedValue] = useState("")

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const chosenDenomination = event.target.value as Denomination
    setSelectedValue(chosenDenomination)
    setEtherDenomination(chosenDenomination)
  }

  return (
    <div className={styles.container}>
      {options.map((option) => (
        <label key={option} className={styles.label}>
          <input
            className={styles.input}
            type="radio"
            value={option}
            checked={selectedValue === option}
            onChange={handleChange}
            required
          />
          <span className={styles.span}>{option}</span>
        </label>
      ))}
    </div>
  )
}