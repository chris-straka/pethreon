import { useState, useEffect, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Loading, Balance, UserAddress } from "../../components"
import { ActionBar, PledgeList } from "./components"
import { creatorWithdraw, getCreatorBalance, getCreatorPledges } from "../../pethreon"
import { EthereumWindow, MetamaskError, PledgeType, extractPledgesToCSV } from "../../utils"
import styles from "./create.module.scss"

interface CreateProps {
  transitionDelay: number,
  transitionDuration: number
}

export const Create = (
  { transitionDelay, transitionDuration }: CreateProps
) => {
  const { ethereum } = window as EthereumWindow
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState("0.0")
  const [pledges, setPledges] = useState<PledgeType[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    if (typeof ethereum === undefined) navigate("/")
    if (!ethereum.isConnected()) navigate("/")
  }, [ethereum, navigate])

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
        navigate("/")
      }
    }
    init()
  }, [navigate])

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
      transition={{ duration: transitionDuration }}
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