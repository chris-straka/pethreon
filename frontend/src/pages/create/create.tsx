import { useContext, useEffect } from "react"
import { PethreonContext } from "../../PethreonContext";
import { useHistory } from "react-router-dom"
import "./create.css"

export const CreatePage = () => {
  const history = useHistory()
  const { userAccounts } = useContext(PethreonContext)

  useEffect(() => {
    if (!userAccounts) history.push("/")
  }, [userAccounts, history])

  return <>
    <div className="contributeLayout">
      <h1 className="userBalance">$0.00</h1>
      <button className="pledgeButton">Make Pledge</button>
    </div >
  </>
}