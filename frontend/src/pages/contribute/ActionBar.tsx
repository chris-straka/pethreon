import { ReactComponent as DepositSVG } from "../../assets/deposit.svg";
import { ReactComponent as WithdrawSVG } from "../../assets/withdraw.svg"
import { ReactComponent as PledgeSVG } from "../../assets/pledge.svg";
import { DepositModal, WithdrawModal, PledgeModal } from "./Actions/Modals"
import { useEffect, useState, KeyboardEvent } from 'react';
import { Modal } from "../../components/Modal/Modal";
import "./ActionBar.css"

export const Actions = () => {
  const [currentModal, setCurrentModal] = useState("")
  const [modalBody, setModalBody] = useState<JSX.Element | null>(null)

  useEffect(() => {
    if (currentModal === "") return
    if (currentModal === "deposit") setModalBody(<DepositModal />)
    if (currentModal === "withdraw") setModalBody(<WithdrawModal />)
    if (currentModal === "pledge") setModalBody(<PledgeModal />)
    return () => {
      setModalBody(null)
    }
  }, [currentModal])

  const escapeModal = (e: KeyboardEvent) => {
    console.log(e)
  }

  return <>
    <div className="actions">
      <button className="deposit" onClick={() => setCurrentModal("deposit")}>Deposit <DepositSVG className="actionSVG" /></button>
      <button className="withdraw" onClick={() => setCurrentModal("withdraw")}>Withdraw <WithdrawSVG className="actionSVG" /></button>
      <button className="pledge" onClick={() => setCurrentModal("pledge")}>Pledge <PledgeSVG className="actionSVG" /></button>
    </div>
    <Modal open={currentModal === "" ? false : true} onClose={() => setCurrentModal("")} >{modalBody}</Modal>
  </>
}