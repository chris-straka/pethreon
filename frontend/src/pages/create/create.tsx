import { useState, useEffect, FormEvent } from "react"
import { motion } from "framer-motion"
import { useHistory } from "react-router"
import { extractPledgesToCSV } from "../../utils/extractPledgesToCSV"
import { Loading, Balance, UserAddress } from "../../components"
import { ActionBar, PledgeList } from "./components"
import { creatorWithdraw, getCreatorBalance, getCreatorPledges } from "../../pethreon"
import { EthereumWindow, MetamaskError, PledgeType } from "../../utils/EtherTypes"
import styles from "./create.module.scss"

// const CREATE_PAGE_FADEOUT_DURATION = 1
// const CIRCLE_ANIMATION_DURATION = 1

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
      className={styles.createLayout}
      role="region"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Balance
        className={styles.balance}
        balance={balance}
      />
      <UserAddress
        className={styles.userAccountName}
        userAccountAddress={ethereum.selectedAddress}
      />
      <ActionBar
        actionBarClassName={styles.actionBar}
        actionButtonClassName={styles.actionButton}
        makeCSV={() => extractPledgesToCSV(pledges)}
        withdraw={() => withdrawBalance}
      />
      <PledgeList
        className={pledges.length === 0 ? styles.emptyPledgeBox : styles.pledgeBox}
        emptyListTextStyle={styles.emptyPledgeText}
        pledges={pledges}
      />
    </motion.div>
  </>
}