import { ReactComponent as DepositSVG } from "../../../assets/deposit.svg";
import { ReactComponent as WithdrawSVG } from "../../../assets/withdraw.svg"
import { ReactComponent as PledgeSVG } from "../../../assets/pledge.svg";
import { WithdrawModal } from './Modals/Withdraw/Withdraw';
import { DepositModal } from './Modals/Deposit/Deposit';
import { PledgeModal } from './Modals/Pledge/Pledge';
import { useEffect, useState } from 'react';
import { Modal } from "../../../components/ModalOutline/ModalOutline";
import styles from "./ActionBar.module.css"

export const ActionBar = () => {
  const [currentModal, setCurrentModal] = useState("")
  const [modalBody, setModalBody] = useState<JSX.Element | null>(null)

  useEffect(() => {
    if (currentModal === "") return
    if (currentModal === "deposit") setModalBody(<DepositModal closeModal={() => setCurrentModal("")} />)
    if (currentModal === "withdraw") setModalBody(<WithdrawModal closeModal={() => setCurrentModal("")} />)
    if (currentModal === "pledge") setModalBody(<PledgeModal closeModal={() => setCurrentModal("")} />)
    return () => { setModalBody(null) }
  }, [currentModal])

  return <>
    <div className={styles.actionBar}>
      <button className={styles.deposit} onClick={() => setCurrentModal("deposit")}>Deposit <DepositSVG className={styles.actionSVG} /></button>
      <button className={styles.withdraw} onClick={() => setCurrentModal("withdraw")}>Withdraw <WithdrawSVG className={styles.actionSVG} /></button>
      <button className={styles.pledge} onClick={() => setCurrentModal("pledge")}>Pledge <PledgeSVG className={styles.actionSVG} /></button>
    </div>
    <Modal open={currentModal === "" ? false : true} onClose={() => setCurrentModal("")}>{modalBody}</Modal>
  </>
}