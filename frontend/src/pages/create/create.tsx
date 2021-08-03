import { useEffect } from "react"
import { useHistory } from "react-router"
import { EthereumWindow } from "../../ethers/utility"
import styles from "./create.module.css"

export const CreatePage = () => {
  const history = useHistory()
  const { ethereum } = window as EthereumWindow

  useEffect(() => {
    if (ethereum === undefined) history.push("/")
    if (!ethereum.isConnected()) history.push("/")
  }, [ethereum, history])

  return <>
    <div className={styles.contributeLayout}>
      <h1 className={styles.userBalance}>$0.00</h1>
      <button className={styles.pledgeButton}>Make Pledge</button>
    </div>
  </>
}