import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from "react"
import { CurrencyButton } from ".."
import { Denomination } from "../../utils"
import styles from "./CurrencyButtons.module.scss"

interface CurrencyButtonProps {
  className?: string,
  setCurrency: Dispatch<SetStateAction<Denomination>>,
  children: ReactNode
}

export const CurrencyButtons = ({ className, setCurrency }: CurrencyButtonProps) => {
  return (
    <div
      className={`${styles.currencyButtons} + ${className}`}
      onChange={
        (event: ChangeEvent<HTMLInputElement>) => setCurrency((event.target.value) as Denomination)
      }>
      <CurrencyButton checked denomination={Denomination.ETHER} />
      <CurrencyButton denomination={Denomination.GWEI} />
      <CurrencyButton denomination={Denomination.WEI} />
    </div>
  )
}