import { ChangeEvent } from "react"
import { Denomination } from "../../../../types"
import { FormField, EtherDenominationSelect } from ".."

import styles from "./EtherAmount.module.scss"

interface EtherAmountProps {
  etherAmount: string
  setEtherAmount: ((amount: string) => void)
  setEtherDenomination: ((amount: Denomination) => void)
  options: Denomination[]
  defaultValue: Denomination
  disabled?: boolean
}

export const EtherAmount = ({
  etherAmount,
  setEtherAmount,
  setEtherDenomination,
  options,
  defaultValue,
  disabled
}: EtherAmountProps
) => {
  return (
    <div className={styles.container}>
      <span className={styles.container__Ξ}>Ξ</span>
      <div className={styles.container__inputs}>
        <FormField
          className={styles.formInput}
          setValue={(event: ChangeEvent<HTMLInputElement>) => setEtherAmount(event.target.value)}
          value={etherAmount}
          autoFocus
          disabled={disabled}
        />
        <EtherDenominationSelect
          className={styles.denomination}
          setEtherDenomination={setEtherDenomination}
          options={options}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  )
}