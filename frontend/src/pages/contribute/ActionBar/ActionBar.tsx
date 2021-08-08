import { ReactComponent as DepositSVG } from "../../../assets/deposit.svg";
import { ReactComponent as WithdrawSVG } from "../../../assets/withdraw.svg"
import { ReactComponent as PledgeSVG } from "../../../assets/pledge.svg";
import { WithdrawModal } from './Withdraw/Withdraw';
import { DepositModal } from './Deposit/Deposit';
import { PledgeModal } from './Pledge/Pledge';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Modal } from "../../../components/ModalOutline/ModalOutline";
import styles from "./ActionBar.module.css"

interface ActionBarProps {
  setLoading: Dispatch<SetStateAction<boolean>>,
  setBalance: Dispatch<SetStateAction<string>>
}

export const ActionBar = ({ setLoading, setBalance }: ActionBarProps) => {
  const [currentModal, setCurrentModal] = useState("")
  const [modalBody, setModalBody] = useState<JSX.Element | null>(null)

  useEffect(() => {
    const deposit = <DepositModal closeModal={() => setCurrentModal("")} setLoading={setLoading} setBalance={setBalance} />
    const withdraw = <WithdrawModal closeModal={() => setCurrentModal("")} setLoading={setLoading} setBalance={setBalance} />
    const pledge = <PledgeModal closeModal={() => setCurrentModal("")} setLoading={setLoading} setBalance={setBalance} />

    if (currentModal === "") return
    if (currentModal === "deposit") setModalBody(deposit)
    if (currentModal === "withdraw") setModalBody(withdraw)
    if (currentModal === "pledge") setModalBody(pledge)
    return () => { setModalBody(null) }
  }, [currentModal, setLoading, setBalance])

  return <>
    <div className={styles.actionBar}>
      <button className={styles.deposit} onClick={() => setCurrentModal("deposit")}>Deposit <DepositSVG className={styles.actionSVG} /></button>
      <button className={styles.withdraw} onClick={() => setCurrentModal("withdraw")}>Withdraw <WithdrawSVG className={styles.actionSVG} /></button>
      <button className={styles.pledge} onClick={() => setCurrentModal("pledge")}>Pledge <PledgeSVG className={styles.actionSVG} /></button>
    </div>
    <Modal open={currentModal === "" ? false : true} onClose={() => setCurrentModal("")}>{modalBody}</Modal>
  </>
}