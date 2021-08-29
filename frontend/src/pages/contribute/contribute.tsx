import { useState, useEffect } from "react"
import { useHistory } from "react-router"
import { Pledge } from "../../components/Pledge/Pledge"
import { Balance } from "../../components/Balance/Balance"
import { Loading } from "../../components/Loading/Loading"
import { DepositModal } from "./Actions/Deposit/Deposit"
import { PledgeModal } from "./Actions/Pledge/Pledge"
import { WithdrawModal } from "./Actions/Withdraw/Withdraw"
import { ActionButton } from "../../components/ActionButton/ActionButton"
import { Modal } from "../../components/ModalOutline/ModalOutline"
import styles from "./contribute.module.css"

import { EthereumWindow, PledgeType, getContributorBalance, getContributorPledges } from "../../myEthers"

import { ReactComponent as WithdrawSVG } from "../../assets/withdraw.svg"
import { ReactComponent as DepositSVG } from "../../assets/deposit.svg"
import { ReactComponent as PledgeSVG } from "../../assets/pledge.svg"

export const ContributePage = () => {
  const { ethereum } = window as EthereumWindow
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState("0.0")
  const [pledges, setPledges] = useState<PledgeType[]>([])
  const [currentModal, setCurrentModal] = useState("")
  const [modalBody, setModalBody] = useState<JSX.Element | null>(null)

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
        let balance = await getContributorBalance()
        let pledges = await getContributorPledges()
        setBalance(balance)
        setPledges(pledges)
      } catch (error) {
        window.alert(`${error}`)
        history.push("/")
      }
    }
    init()
  }, [history])


  useEffect(() => {
    const deposit = <DepositModal closeModal={() => setCurrentModal("")} setLoading={setLoading} setBalance={setBalance} />
    const withdraw = <WithdrawModal closeModal={() => setCurrentModal("")} setLoading={setLoading} setBalance={setBalance} />
    const pledge = <PledgeModal closeModal={() => setCurrentModal("")} setLoading={setLoading} setBalance={setBalance} setPledges={setPledges} />

    if (currentModal === "") return
    if (currentModal === "deposit") setModalBody(deposit)
    if (currentModal === "withdraw") setModalBody(withdraw)
    if (currentModal === "pledge") setModalBody(pledge)
    return () => { setModalBody(null) }
  }, [currentModal, setLoading, setBalance, setPledges])

  return <>
    {loading && <Loading />}
    <div className={styles.contributeLayout}>
      <Balance balance={balance} />
      <div className={styles.actionBar}>
        <ActionButton onClick={() => setCurrentModal("deposit")}>Deposit <DepositSVG /></ActionButton>
        <ActionButton onClick={() => setCurrentModal("withdraw")}>Withdraw <WithdrawSVG /></ActionButton>
        <ActionButton onClick={() => setCurrentModal("pledge")}>Pledge <PledgeSVG /></ActionButton>
      </div>
      <ul className={styles.transactionHistory}>
        {pledges.map((pledge: PledgeType) => <Pledge pledge={pledge} key={pledge.creatorAddress} />)}
      </ul>
    </div>
    <Modal open={currentModal === "" ? false : true} onClose={() => setCurrentModal("")}>{modalBody}</Modal>
  </>
}