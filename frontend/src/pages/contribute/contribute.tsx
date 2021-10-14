import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useHistory } from "react-router"
import { Pledge } from "../../components/Pledge/Pledge"
import { Balance } from "../../components/Balance/Balance"
import { Loading } from "../../components/Loading/Loading"
import { DepositModal } from "./Actions/DepositModal/Deposit"
import { PledgeModal } from "./Actions/PledgeModal/PledgeModal"
import { WithdrawModal } from "./Actions/WithdrawModal/WithdrawModal"
import { Modal } from "../../components/ModalOutline/ModalOutline"
import styles from "./contribute.module.css"

import { EthereumWindow, PledgeType, getContributorBalance, getContributorPledges, MetamaskError } from "../../pethreon"

import { ReactComponent as WithdrawSVG } from "../../assets/withdraw.svg"
import { ReactComponent as DepositSVG } from "../../assets/deposit.svg"
import { ReactComponent as PledgeSVG } from "../../assets/pledge.svg"

export const ContributePage = () => {
  const { ethereum } = window as EthereumWindow
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState("0.0")
  const [pledges, setPledges] = useState<PledgeType[]>([])
  const [currentModal, setCurrentModal] = useState("")
  const [modalBody, setModalBody] = useState<JSX.Element | null>(null)
  const history = useHistory()

  useEffect(() => {
    if (typeof ethereum === undefined) history.push("/")
    if (!ethereum.isConnected()) history.push("/")
  }, [ethereum, history])

  useEffect(() => {
    ethereum.on("accountsChanged", () => {
      history.push('/')
    })
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
    <motion.div
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      // transition={{ duration: 2 }}
      // role="region"
      // className={styles.contributeLayout}
    >
      <Balance className={styles.balance} balance={balance} />
      <h1 className={styles.userAccountName}>{ethereum.selectedAddress}</h1>
      <div className={styles.actionBar}>
        <button className={styles.actionButton} onClick={() => setCurrentModal("deposit")}>Deposit <DepositSVG /></button>
        <button className={styles.actionButton} onClick={() => setCurrentModal("withdraw")}>Withdraw <WithdrawSVG /></button>
        <button className={styles.actionButton} onClick={() => setCurrentModal("withdraw")}>Pledge <PledgeSVG /></button>
      </div>
      <ul className={pledges.length === 0 ? styles.emptyPledgeBox : styles.pledgeBox}>
        {pledges.map((pledge: PledgeType) => <Pledge
          pledge={pledge}
          setLoading={setLoading}
          setBalance={setBalance}
          setPledges={setPledges}
          key={pledge.creatorAddress}
        />)}
        {pledges.length === 0 ? <li className={styles.emptyPledgeText}>You need to make a pledge first...</li> : null}
      </ul>
    </motion.div>
    <Modal open={currentModal === "" ? false : true} onClose={() => setCurrentModal("")}>{modalBody}</Modal>
  </>
}