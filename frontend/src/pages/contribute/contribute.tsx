import { useContext, useEffect } from "react"
import { PethreonContext } from '../../PethreonContext';
import { useHistory } from "react-router-dom"
import { PaymentDetails } from "../../components/PaymentDetails/PaymentDetails"
import { UserBalance } from "../../components/UserBalance/UserBalance";
import "./contribute.css"

export const ContributePage: React.FC = () => {
  const history = useHistory()
  const { userAddress, contract } = useContext(PethreonContext)

  useEffect(() => {
    if (!userAddress) history.push("/")
  }, [userAddress, history])

  const pledge = async () => {
    const data = await contract?.getContributorBalance()
    console.log(data?.toString())
  }

  // const getContributorBalance = () => {}

  return <div className="contributeLayout">
    <UserBalance balance="$0.00" />
    <button className="pledgeButton" onClick={pledge}>Make Pledge</button>
    <PaymentDetails />
  </div >
}