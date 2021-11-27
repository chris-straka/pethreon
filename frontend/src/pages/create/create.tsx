import { useState, useEffect, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Loading, Balance, UserAddress, PledgeList } from "../../components"
import { ActionBar } from "./components"
import { creatorWithdraw, getCreatorBalance, getCreatorPledges } from "../../pethreon"
import { EthereumWindow, MetamaskError, PledgeType, extractPledgesToCSV } from "../../utils"
import styles from "./create.module.scss"

interface CreateProps {
  fadeInDuration: number,
  fadeInDelay: number,
  fadeOutDuration: number,
  fadeOutDelay: number
}

export const Create = (
  { fadeInDuration, fadeInDelay, fadeOutDuration, fadeOutDelay }: CreateProps
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
      animate={{ opacity: 1, transition: { duration: fadeInDuration, delay: fadeInDelay } }}
      exit={{ opacity: 0, transition: { duration: fadeOutDuration, delay: fadeOutDelay } }}
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
        isCreator={true}
        textForWhenItsEmpty="Nobody has pledged to you yet..."
        pledges={pledges}
      />
    </motion.div>
  </>
}