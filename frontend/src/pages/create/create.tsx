import { useState, useEffect } from "react"
import { useHistory } from "react-router"
import { EthereumWindow } from "../../ethers/utility"
import { Loading } from "../../components/Loading/Loading"
import { Balance } from "../../components/Balance/Balance"
import { Pledge } from "../contribute/Pledge/Pledge"
import styles from "./create.module.css"

export const CreatePage = () => {
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState("")
  const [pledges, setPledges] = useState<string[]>([])
  const history = useHistory()
  const { ethereum } = window as EthereumWindow

  useEffect(() => {
    if (typeof ethereum === undefined) history.push("/")
    if (!ethereum.isConnected()) history.push("/")
  }, [ethereum, history])

  return <>
    {loading && <Loading />}
    <div className={styles.contributeLayout}>
      <Balance balance={balance} />
      <ul className={styles.transactionHistory}>
        {pledges.map((pledge: any) => <Pledge pledge={pledge} key={pledge.creatorAddress} />)}
      </ul>
    </div >
  </>

}