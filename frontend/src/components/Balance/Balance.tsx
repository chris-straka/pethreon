import { Pethreon } from "../../types/Pethreon"
import "./Balance.css"

interface BalanceProps {
  contract: Pethreon
}

export const Balance = ({ contract }: BalanceProps) => {
  // TODO
  return <h1 className="balance">$0.00</h1>
}