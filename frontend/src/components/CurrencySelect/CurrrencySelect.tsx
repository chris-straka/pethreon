import { ChangeEvent } from 'react';
import { CurrencyDenomination } from "./CurrencyDenomination/CurrencyDenomination"
import styles from "./CurrencySelect.module.css"

interface CurrencySelectProps {
  amount: string,
  getAmount: (event: ChangeEvent<HTMLInputElement>) => void,
  getCurrency: (event: ChangeEvent<HTMLInputElement>) => void
}

export const CurrencySelect = ({ amount, getAmount, getCurrency }: CurrencySelectProps) => {


  return (
    <>
      <input className={styles.depositField} type="number" placeholder="0.00" onChange={getAmount} value={amount} />
      <div className={styles.currencyRadios} onChange={getCurrency}>
        <CurrencyDenomination defaultChecked={true} denomination="USD" />
        <CurrencyDenomination defaultChecked={false} denomination="Ether" />
        <CurrencyDenomination defaultChecked={false} denomination="Wei" />
      </div>
    </>
  )
}