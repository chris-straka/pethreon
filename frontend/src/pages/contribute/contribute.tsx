import { useContext, useEffect } from "react"
import { useHistory } from "react-router"
import { PethreonContext } from '../../PethreonContext';
import { Pledges } from "./Pledges/Pledges"
import { ActionBar } from "./ActionBar/ActionBar"
import { Balance } from "../../components/Balance/Balance"
import "./contribute.css"

export const ContributePage = () => {
  const history = useHistory()
  const { userAccounts } = useContext(PethreonContext)

  useEffect(() => {
    if (!userAccounts) history.push("/")
  }, [userAccounts, history])

  return <div className="contributeLayout">
    <Balance />
    <ActionBar />
    <Pledges />
  </div >
}