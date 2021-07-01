import { useContext, useEffect } from "react"
import { PethreonContext } from '../../PethreonContext';
import { useHistory } from "react-router-dom"
import { PaymentDetails } from "../../components/payment-details/payment-details"
import { UserAddress } from "../../components/user-address/user-address"
import "./contribute.css"

export const Contribute: React.FC = () => {
  const history = useHistory()
  const { userAddress, contract } = useContext(PethreonContext)

  useEffect(() => {
    if (!userAddress) history.push("/")
  }, [userAddress, history])

  const pledge = () => { console.log(contract) }

  // const getContributorBalance = () => { }

  return <div className="contributeLayout">
    <UserAddress user={userAddress!} />
    <h1 className="userBalance">$0.00</h1>
    <button className="pledgeButton" onClick={pledge}>Make Pledge</button>
    <PaymentDetails />
  </div >
}