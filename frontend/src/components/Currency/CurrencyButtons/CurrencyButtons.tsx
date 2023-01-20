import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from "react"
import styles from "./CurrencyButtons.module.scss"

type Denomination = "Ether" | "Gwei" | "Wei" | "All"

interface CurrencyButtonProps {
  className?: string,
  setCurrency: Dispatch<SetStateAction<Denomination>>,
  children: ReactNode
}

export const CurrencyButtons = ({ className, setCurrency, children }: CurrencyButtonProps) => {
  return (
    <div
      className={`${styles.currencyButtons} ${className}`}
      onChange={(event: ChangeEvent<HTMLInputElement>) => setCurrency((event.target.value) as Denomination)}>
      {children}
    </div>
  )
}