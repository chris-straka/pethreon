import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Balance, Loading, UserAddress } from "../../components"
import { PledgeList, ActionBar } from "./components"
import { getContributorBalance, getContributorPledges } from "../../pethreon"
import { EthereumWindow, PledgeType, MetamaskError } from "../../utils"
import { DepositModal, WithdrawModal, PledgeModal, MODAL_TYPE } from "./modals"
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
  const [currentModal, setCurrentModal] = useState("")
  const navigate = useNavigate()

  const { ethereum } = window as EthereumWindow

  useEffect(() => {
    if (typeof ethereum === undefined || !ethereum.isConnected()) navigate("/")
    ethereum.on("accountsChanged", () => navigate("/"))
  }, [ethereum, navigate])

  useEffect(() => {
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
  }, [navigate])

  return <>
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
        balance={balance} />
      <UserAddress
        className={styles.userAccountName}
        userAccountAddress={ethereum.selectedAddress}
      />
      <ActionBar
        actionBarClassName={styles.actionBar}
        actionButtonClassName={styles.actionButton}
        setCurrentModal={setCurrentModal}
      />
      <PledgeList
        className={pledges.length === 0 ? styles.emptyPledgeBox : styles.pledgeBox}
        emptyListTextStyles={styles.emptyPledgeText}
        pledges={pledges}
      />
    </motion.div>

    {
      currentModal === MODAL_TYPE.DEPOSIT ?
        <DepositModal
          closeModal={() => setCurrentModal(MODAL_TYPE.NONE)}
          setLoading={setLoading}
          setBalance={setBalance}
        /> : ""
    }

    {
      currentModal === MODAL_TYPE.WITHDRAW ?
        <WithdrawModal
          closeModal={() => setCurrentModal(MODAL_TYPE.NONE)}
          setLoading={setLoading}
          setBalance={setBalance}
        /> : ""
    }

    {
      currentModal === MODAL_TYPE.PLEDGE ?
        <PledgeModal
          closeModal={() => setCurrentModal(MODAL_TYPE.NONE)}
          setLoading={setLoading}
          setBalance={setBalance}
          setPledges={setPledges}
        /> : ""
    }

  </>
}