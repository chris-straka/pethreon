import { Denomination } from "../../../../types"

import styles from "./EtherDenominationSelect.module.scss"

interface EtherDenominationSelectProps {
  options: Denomination[]
  defaultValue: Denomination
  className: string
  setEtherDenomination: ((denomination: Denomination) => void)
}

export const EtherDenominationSelect = ({
  defaultValue,
  setEtherDenomination,
  options,
  className }: EtherDenominationSelectProps
) => {
  return (
    <select
      onChange={(event) => setEtherDenomination(event.target.value as Denomination)}
      className={`${styles.select} ${className}`}
      name="etherDenominations"
      defaultValue={defaultValue}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}