import "./UserActions.css"
import { Pethreon } from "../../../../types/Pethreon"

export const ContributorActions: React.FC<{ contract: Pethreon }> = (contract) => {

  const pledge = async () => {
    console.log("TODO")
  }

  return <>
  <button className="deposit"></button>
  <button className="contributorWithdrawal"></button>
  <button className="pledgeButton" onClick={pledge}>Make Pledge</button>
  </>
}