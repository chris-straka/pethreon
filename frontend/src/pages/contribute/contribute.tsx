import { useState, useEffect } from "react"
import { useHistory } from "react-router"
import { motion } from "framer-motion"
import { Balance, Loading, ModalOutline } from "../../components"
import { Circles, PledgeList, ActionBar } from "./components"
import { getContributorBalance, getContributorPledges } from "../../pethreon"
import { EthereumWindow, PledgeType, MetamaskError } from "../../utils/EtherTypes"
import { DepositModal, WithdrawModal, PledgeModal } from "./modals"
import styles from "./contribute.module.scss"

const CONTRIBUTE_PAGE_FADEOUT_DURATION = 1


export const ContributePage = () => {
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState("0.0")
  const [pledges, setPledges] = useState<PledgeType[]>([])
  const [currentModal, setCurrentModal] = useState("")
  const [modalBody, setModalBody] = useState<JSX.Element | null>(null)
  const history = useHistory()

  const { ethereum } = window as EthereumWindow

  useEffect(() => {
    if (typeof ethereum === undefined || !ethereum.isConnected()) history.push("/")
  }, [ethereum, history])

  useEffect(() => {
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

  useEffect(() => {
    const depositModal = <DepositModal closeModal={() => setCurrentModal("")} setLoading={setLoading} setBalance={setBalance} />;
    const withdrawModal = <WithdrawModal closeModal={() => setCurrentModal("")} setLoading={setLoading} setBalance={setBalance} />;
    const pledgeModal = <PledgeModal closeModal={() => setCurrentModal("")} setLoading={setLoading} setBalance={setBalance} setPledges={setPledges} />;

    if (currentModal === "") {
      return
    } else if (currentModal === "deposit") {
      setModalBody(depositModal)
    } else if (currentModal === "withdraw") {
      setModalBody(withdrawModal)
    } else if (currentModal === "pledge") {
      setModalBody(pledgeModal)
    }
    return () => { setModalBody(null) }
  }, [currentModal, setLoading, setBalance, setPledges])

  return <>
    {loading && <Loading />}
    <Circles
      animationDelay={CONTRIBUTE_PAGE_FADEOUT_DURATION}
    />
    <motion.div
      className={styles.contributeLayout}
      initial={{ opacity: 0 }}
      transition={{ duration: 2 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="region"
    >
      <Balance className={styles.balance} balance={balance} />
      <h1 className={styles.userAccountName}>{ethereum.selectedAddress}</h1>
      <ActionBar
        actionBarClassName={styles.actionBar}
        actionButtonClassName={styles.actionButon}
      />
      <PledgeList
        className={pledges.length === 0 ? styles.emptyPledgeBox : styles.pledgeBox}
        emptyListTextStyles={styles.emptyPledgeText}
        pledges={pledges}
      />
    </motion.div>
    <ModalOutline
      open={currentModal === "" ? false : true}
      onClose={() => setCurrentModal("")}
    >{modalBody}</ModalOutline>
  </>
}