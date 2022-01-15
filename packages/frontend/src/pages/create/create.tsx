import { useState, useEffect, ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { UserBalance, UserAddress, Loading, PledgeList, Modal } from "../../components"
import { CreatorActionBar } from "./components"
import { getCreatorBalance, getCreatorPledges } from "../../pethreon"
import { EthereumWindow, PledgeType, extractPledgesToCSV } from "../../utils"
import styles from "./Create.module.scss"

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
  const [modal, setModal] = useState<ReactNode | null>(null)
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

  return <>
    {loading && <Loading />}
    <motion.div
      className={styles.createLayout}
      role="region"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: fadeInDuration, delay: fadeInDelay } }}
      exit={{ opacity: 0, transition: { duration: fadeOutDuration, delay: fadeOutDelay } }}
    >
      <UserBalance
        className={styles.balance}
        balance={balance}
      />
      <UserAddress
        className={styles.userAddress}
        userAccountAddress={ethereum.selectedAddress}
      />
      <CreatorActionBar
        className={styles.actionBar}
        makeCSV={() => extractPledgesToCSV(pledges)}
        setModal={setModal}
        setBalance={setBalance}
        setLoading={setLoading}
      />
      <PledgeList
        isCreator={true}
        textForWhenItsEmpty="Nobody has pledged to you yet..."
        pledges={pledges}
      />
    </motion.div>
    <AnimatePresence
      initial={false}
      exitBeforeEnter={true}
    >
      {modal !== null && <Modal closeModal={() => setModal(null)} children={modal} />}
    </AnimatePresence>
  </>
}