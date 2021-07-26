import { useState, ChangeEvent } from 'react';
import styles from "./CurrencySelect.module.css"

interface CurrencySelectProps {
  getAmount: (money: number) => void
}

export const CurrencySelect = ({ getAmount }: CurrencySelectProps) => {
  const [amount, setAmount] = useState("0.00")
  // const [currency, setCurrency] = useState("USD")
  const updateAmount = (event: ChangeEvent<HTMLInputElement>) => setAmount(event.target.value)
  const foo = (event: ChangeEvent<HTMLInputElement>) => console.log(event.target.value)

  return (
    <>
      <input className={styles.depositField} type="number" placeholder="0.00" onChange={updateAmount} value={amount} />
      <div className={styles.currencyRadios} onChange={foo}>
        <label>
          <input type="radio" name="currency" defaultChecked value="USD" />
          <span>USD</span>
        </label>
        <label>
          <input type="radio" name="currency" value="Ether" />
          <span>Ether</span>
        </label>
      </div>
    </>
  )
}