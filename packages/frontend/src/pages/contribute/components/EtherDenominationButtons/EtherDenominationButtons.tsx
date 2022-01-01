import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { CurrencyDenomination } from "../../../../components"
import { Denomination } from "../../../../utils"
import styles from "./EtherDenominationButtons.module.scss"

interface EtherDenominationProps {
  className: string,
  setCurrency: Dispatch<SetStateAction<Denomination>>,
}

export const EtherDenominationButtons = ({ className, setCurrency }: EtherDenominationProps) => {
  return (
    <div
      className={`${styles.currencyButtons} + ${className}`}
      onChange={
        (event: ChangeEvent<HTMLInputElement>) => setCurrency((event.target.value) as Denomination)
      }>
      <CurrencyDenomination defaultChecked={true} denomination={Denomination.ETHER} />
      <CurrencyDenomination defaultChecked={false} denomination={Denomination.GWEI} />
      <CurrencyDenomination defaultChecked={false} denomination={Denomination.WEI} />
    </div>
  )
}