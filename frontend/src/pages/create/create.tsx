import { useState, useEffect, FormEvent } from "react"
import { motion } from "framer-motion"
import { useHistory } from "react-router"
import { Loading } from "../../components/Loading/Loading"
import { Balance } from "../../components/Balance/Balance"
import { Pledge } from "../../components/Pledge/Pledge"
import { extractPledgesToCSV } from "./extractPledgesToCSV"
import { WithdrawSVG, CsvSVG } from "../../svgs"
import styles from "./create.module.scss"

import {
  MetamaskError, EthereumWindow, PledgeType,
  creatorWithdraw, getCreatorBalance, getCreatorPledges
} from "../../pethreon"

export const CreatePage = () => {
  const { ethereum } = window as EthereumWindow
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState("0.0")
  const [pledges, setPledges] = useState<PledgeType[]>([])
  const history = useHistory()

  useEffect(() => {
    if (typeof ethereum === undefined) history.push("/")
    if (!ethereum.isConnected()) history.push("/")
  }, [ethereum, history])

  useEffect(() => {
    async function init() {
      if (window.location.pathname === "/") return
      try {
        let balance = await getCreatorBalance()
        let pledges = await getCreatorPledges()
        setBalance(balance)
        setPledges(pledges)
      } catch (error) {
        window.alert(`${error}`)
        history.push("/")
      }
    }
    init()
  }, [history])

  const withdrawBalance = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      setLoading(true)
      await creatorWithdraw()
      const newBalance = await getCreatorBalance()
      setBalance(newBalance)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      window.alert(`Error: ${(error as MetamaskError).message}`)
    }
  }

  return <>
    {loading && <Loading />}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .5 }}
      role="region"
      className={styles.createLayout}
    >
      <Balance className={styles.balance} balance={balance} />
      <h2 className={styles.userAccountName}>{ethereum.selectedAddress}</h2>
      <div className={styles.actionBar}>
        <button className={styles.actionButton} onClick={() => withdrawBalance}>Withdraw <WithdrawSVG /></button>
        <button className={styles.actionButton} onClick={() => extractPledgesToCSV(pledges)}>Extract to CSV <CsvSVG /></button>
      </div>
      <ul className={pledges.length === 0 ? styles.emptyPledgeBox : styles.pledgeBox}>
        {pledges.map((pledge: PledgeType) => <Pledge pledge={pledge} creator={true} key={pledge.contributorAddress} />)}
        {pledges.length === 0 ? <li className={styles.emptyPledgeText}>Nobody has pledged to you yet...</li> : null}
      </ul>
    </motion.div>
  </>
}