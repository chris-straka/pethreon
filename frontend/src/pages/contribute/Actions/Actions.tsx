import { Pethreon } from "../../../types/Pethreon"
import "./UserActions.css"

export const Actions: React.FC<{ contract: Pethreon }> = ({ contract }) => {

  const pledge = async () => {
    contract.contract.
      console.log("TODO")
  }

  return <>
    <button className="deposit">Deposit</button>
    <button className="contributorWithdrawal">Withdraw</button>
    <button className="pledge" onClick={pledge}>Pledge</button>
  </>
}