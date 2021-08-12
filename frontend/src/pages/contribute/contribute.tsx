import styles from "./contribute.module.css"
import { useState, useEffect } from "react"
import { useHistory } from "react-router"
import { PledgeList } from "./PledgeList/PledgeList"
import { ActionBar } from "./ActionBar/ActionBar"
import { Balance } from "../../components/Balance/Balance"
import { Loading } from "../../components/Loading/Loading"

import { EthereumWindow } from "../../ethers/utility"
import { getBalance } from "../../ethers/getBalance"
import { getPledges } from "../../ethers/getPledges"

export const ContributePage = () => {
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState("0.0")
  const [pledges, setPledges] = useState<string[]>([])
  const { ethereum } = window as EthereumWindow
  const history = useHistory()

  useEffect(() => {
    if (typeof ethereum === undefined) history.push("/")
    if (!ethereum.isConnected()) history.push("/")
  }, [ethereum, history])

  useEffect(() => {
    ethereum.on("accountsChanged", (accounts: any) => {
      history.push('/')
    })
  }, [ethereum, history])

  useEffect(() => {
    async function init() {
      try {
        let balance = await getBalance()
        let pledges = await getPledges()
        setBalance(balance)
        setPledges(pledges)
      } catch (error) {
        window.alert(`${error}`)
        history.push("/")
      }
    }
    init()
  }, [history])

  return <>
    {loading && <Loading />}
    <div className={styles.contributeLayout}>
      <Balance balance={balance} />
      <ActionBar setBalance={setBalance} setLoading={setLoading} setPledges={setPledges} />
      <PledgeList pledges={pledges} />
    </div >
  </>
}