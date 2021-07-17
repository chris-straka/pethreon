import { Pethreon } from "../../../types/Pethreon"
import "./Pledges.css"

interface PledgesProps {
  contract: Pethreon
}

export const Pledges = ({ contract }: PledgesProps) => {

  return <ul className="payment-details-layout">
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
  </ul>
}