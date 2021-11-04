import { useState, useEffect } from "react"
import { useHistory } from "react-router"
import { motion } from "framer-motion"
import { Balance, Loading, UserAddress } from "../../components"
import { PledgeList, ActionBar } from "./components"
import { getContributorBalance, getContributorPledges } from "../../pethreon"
import { EthereumWindow, PledgeType, MetamaskError } from "../../utils/EtherTypes"
import { DepositModal, WithdrawModal, PledgeModal, MODAL_TYPE } from "./modals"
import styles from "./contribute.module.scss"

const CONTRIBUTE_PAGE_FADEIN_DURATION = 1
// const CIRCLE_ANIMATION_DURATION = 1

export const ContributePage = () => {
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState("0.0")
  const [pledges, setPledges] = useState<PledgeType[]>([])
  const [currentModal, setCurrentModal] = useState("")
  const history = useHistory()

  const { ethereum } = window as EthereumWindow

  useEffect(() => {
    if (typeof ethereum === undefined || !ethereum.isConnected()) history.push("/")
    ethereum.on("accountsChanged", () => history.push('/'))
  }, [ethereum, history])

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
        history.push("/")
      }
    }
    init()
  }, [history])

  return <>
    {loading && <Loading />}
    <motion.div
      className={styles.contributeLayout}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: CONTRIBUTE_PAGE_FADEIN_DURATION }}
      exit={{ opacity: 0 }}
      role="region"
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

    {currentModal === MODAL_TYPE.DEPOSIT ?
      <DepositModal
        closeModal={() => setCurrentModal(MODAL_TYPE.NONE)}
        setLoading={setLoading}
        setBalance={setBalance}
      /> : ""}

    {currentModal === MODAL_TYPE.WITHDRAW ?
      <WithdrawModal
        closeModal={() => setCurrentModal(MODAL_TYPE.NONE)}
        setLoading={setLoading}
        setBalance={setBalance}
      /> : ""
    }

    {currentModal === MODAL_TYPE.PLEDGE ?
      <PledgeModal
        closeModal={() => setCurrentModal(MODAL_TYPE.NONE)}
        setLoading={setLoading}
        setBalance={setBalance}
        setPledges={setPledges}
      /> : ""
    }

  </>
}