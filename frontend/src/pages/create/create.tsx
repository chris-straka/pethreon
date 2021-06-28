import { useHistory } from "react-router-dom"
import { PaymentDetails } from "../../components/payment-details/payment-details"
import { UserAddress } from "../../components/user-address/user-address"
import "./create.css"

export const Create: React.FC = () => {
  const history = useHistory()
  const user = localStorage?.getItem("account") as string
  if (!user) { history.push("/") }

  const withdrawal = () => { console.log("todo") }

  return <>
    <div className="contributeLayout">
      <UserAddress user={user} />
      <h1 className="userBalance">$0.00</h1>
      <button className="pledgeButton" onClick={withdrawal}>Make Pledge</button>
      <PaymentDetails />
    </div >
  </>
}