import { useContext, useEffect } from "react"
import { useHistory } from "react-router"
import { PethreonContext } from '../../PethreonContext';
import { ContributorPledges } from "./components/ContributorPledges/ContributorPledges"
import { ContributorActions } from "./components/ContributorActions/ContributorActions"
import { UserBalance } from "../../components/UserBalance/UserBalance";
import "./contribute.css"

export const ContributePage: React.FC = () => {
  const history = useHistory()
  const { userAddress, contract } = useContext(PethreonContext)

  useEffect(() => {
    if (!userAddress) history.push("/")
  }, [userAddress, history])

  return <div className="contributeLayout">
    <UserBalance balance="$0.00" />
    <ContributorActions contract={contract!} />
    <ContributorPledges />
  </div >
}