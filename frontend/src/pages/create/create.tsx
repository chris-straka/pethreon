import { useContext, useEffect } from "react"
import { PethreonContext } from "../../PethreonContext";
import { useHistory } from "react-router-dom"
import { PaymentDetails } from "../../components/payment-details/PaymentDetails"
import { UserAddress } from "../../components/user-address/UserAddress"
import "./create.css"

export const CreatePage: React.FC = () => {
  const history = useHistory()
  const { userAddress, contract } = useContext(PethreonContext)

  useEffect(() => {
    if (!userAddress) history.push("/")
  }, [userAddress, history])

  const withdrawal = () => { console.log(contract) }

  return <>
    <div className="contributeLayout">
      <UserAddress hexAddress={userAddress!} />
      <h1 className="userBalance">$0.00</h1>
      <button className="pledgeButton" onClick={withdrawal}>Make Pledge</button>
      <PaymentDetails />
    </div >
  </>
}