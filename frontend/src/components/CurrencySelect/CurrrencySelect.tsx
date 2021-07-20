import { FormEvent } from 'react';

interface CurrencySelectProps {
  amount: (money: number) => void
}

export const CurrencySelect = ({ amount }: CurrencySelectProps) => {
  // const [currency, setCurrency] = useState("USD")

  const foo = (e: FormEvent<HTMLDivElement>) => console.log('a')

  return (
    <>
      <div className="currencyRadios" onChange={foo}>
        <label>
          <input type="radio" name="currency" defaultChecked />
          <span>USD</span>
        </label>
        <label>
          <input type="radio" name="currency" />
          <span>Ether</span>
        </label>
      </div>
      <input className="depositField" type="number" placeholder="0.00" />
    </>
  )
}