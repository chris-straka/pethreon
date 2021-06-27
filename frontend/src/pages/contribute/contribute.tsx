import { useContext } from "react"
import { useHistory } from "react-router-dom"
import { PaymentDetails } from "../../components/payment-details/payment-details"
import { UserAddress } from "../../components/user-address/user-address"
import { PethreonContext } from "../../hardhat/SymfoniContext"
import "./contribute.css"

export const Contribute: React.FC = () => {
  const history = useHistory()
  const pethreon = useContext(PethreonContext)
  const user = localStorage.getItem("account") as string
  if (user == null) history.push("/")

  const pledge = () => {
    console.log(pethreon);
  }

  // const getContributorBalance = () => { }

  return <div className="contributeLayout">
    <UserAddress user={user} />
    <h1 className="userBalance">$0.00</h1>
    <button className="pledgeButton" onClick={pledge}>Make Pledge</button>
    <PaymentDetails />
  </div >
}