import { useContext, useEffect } from "react"
import { PethreonContext } from "../../PethreonContext";
import { useHistory } from "react-router-dom"
import styles from "./create.module.css"

export const CreatePage = () => {
  const history = useHistory()
  const { userAccounts } = useContext(PethreonContext)

  useEffect(() => {
    if (!userAccounts) history.push("/")
  }, [userAccounts, history])

  return <>
    <div className={styles.contributeLayout}>
      <h1 className={styles.userBalance}>$0.00</h1>
      <button className={styles.pledgeButton}>Make Pledge</button>
    </div >
  </>
}