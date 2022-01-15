import { useState, useEffect, ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Balance, Loading, UserAddress, Modal, PledgeList } from "../../components"
import { getContributorBalance, getContributorPledges } from "../../pethreon"
import { EthereumWindow, PledgeType, MetamaskError } from "../../utils"
import { ContributorActionBar } from "./components"
import styles from "./contribute.module.scss"

interface ContributeProps {
  fadeInDuration: number,
  fadeInDelay: number,
  fadeOutDuration: number,
  fadeOutDelay: number
}

export const Contribute = (
  { fadeInDuration, fadeInDelay, fadeOutDuration, fadeOutDelay }: ContributeProps
) => {
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState("0.0")
  const [pledges, setPledges] = useState<PledgeType[]>([])
  const [modal, setModal] = useState<ReactNode | null>(null)
  const navigate = useNavigate()
  const { ethereum } = window as EthereumWindow

  useEffect(() => {
    if (typeof ethereum === undefined || !ethereum.isConnected()) navigate("/")
    ethereum.on("accountsChanged", () => navigate("/"))
    async function init() {
      if (window.location.pathname === "/") return
      try {
        const balance = await getContributorBalance()
        const pledges = await getContributorPledges()
        setBalance(balance)
        setPledges(pledges)
      } catch (error) {
        window.alert((error as MetamaskError).message)
        navigate("/")
      }
    }
    init()
  }, [ethereum, navigate])

  return (
    <>
      {loading && <Loading />}
      <motion.div
        className={styles.contributeLayout}
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
        <ContributorActionBar
          setModal={setModal}
          setBalance={setBalance}
          setLoading={setLoading}
          setPledges={setPledges}
        />
        <PledgeList
          isCreator={false}
          textForWhenItsEmpty="You need to make a pledge first..."
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
  )
}