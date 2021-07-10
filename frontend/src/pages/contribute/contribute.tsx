import { useContext, useEffect } from "react"
import { useHistory } from "react-router"
import { PethreonContext } from '../../PethreonContext';
import { Pledges as Pledges } from "./Pledges/Pledges"
import { Actions } from "./Actions/Actions"
import { Balance } from "../../components/Balance/Balance"
import "./contribute.css"

export const ContributePage: React.FC = () => {
  const history = useHistory()
  const { userAddress, contract } = useContext(PethreonContext)

  useEffect(() => {
    if (!userAddress) history.push("/")
  }, [userAddress, history])

  return <div className="contributeLayout">
    <Balance contract={contract!} />
    <Actions contract={contract!} />
    <Pledges contract={contract!} />
  </div >
}