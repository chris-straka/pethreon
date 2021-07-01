import { useContext, useEffect } from "react"
import { PethreonContext } from "../../PethreonContext";
import { useHistory } from "react-router-dom"
import { PaymentDetails } from "../../components/payment-details/payment-details"
import { UserAddress } from "../../components/user-address/user-address"
import "./create.css"

export const Create: React.FC = () => {
  const history = useHistory()
  const { userAddress } = useContext(PethreonContext)

  useEffect(() => {
    if (!userAddress) history.push("/")
  }, [userAddress, history])

  const withdrawal = () => { console.log("todo") }

  return <>
    <div className="contributeLayout">
      <UserAddress user={userAddress!} />
      <h1 className="userBalance">$0.00</h1>
      <button className="pledgeButton" onClick={withdrawal}>Make Pledge</button>
      <PaymentDetails />
    </div >
  </>
}