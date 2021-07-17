import { useContext, useEffect } from "react"
import { useHistory } from "react-router"
import { PethreonContext } from '../../PethreonContext';
import { Pledges } from "./Pledges/Pledges"
import { Actions } from "./Actions/ActionBar"
import { Balance } from "../../components/Balance/Balance"
import "./contribute.css"

export const ContributePage = () => {
  const history = useHistory()
  const { userAddress } = useContext(PethreonContext)

  useEffect(() => {
    if (!userAddress) history.push("/")
  }, [userAddress, history])

  return <div className="contributeLayout">
    <Balance />
    <Actions />
    <Pledges />
  </div >
}