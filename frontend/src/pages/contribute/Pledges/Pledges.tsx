import "./ContributorPledges.css"
import { Pethreon } from "../../../types/Pethreon"

export const Pledges: React.FC<{ contract: Pethreon }> = ({ contract }) => {
  return <ul className="payment-details-layout">
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
  </ul>
}