import { useContext, useEffect } from "react"
import { PethreonContext } from '../../PethreonContext';
import { useHistory } from "react-router-dom"
import { PaymentDetails } from "../../components/payment-details/PaymentDetails"
import { UserAddress } from "../../components/user-address/UserAddress"
import { UserBalance } from "../../components/user-balance/UserBalance";
import "./contribute.css"

export const ContributePage: React.FC = () => {
  const history = useHistory()
  const { userAddress, contract } = useContext(PethreonContext)

  useEffect(() => {
    if (!userAddress) history.push("/")
  }, [userAddress, history])

  const pledge = () => { console.log(contract) }

  // const getContributorBalance = () => {}

  return <div className="contributeLayout">
    <UserAddress hexAddress={userAddress!} />
    <UserBalance balance="$0.00" />
    <button className="pledgeButton" onClick={pledge}>Make Pledge</button>
    <PaymentDetails />
  </div >
}