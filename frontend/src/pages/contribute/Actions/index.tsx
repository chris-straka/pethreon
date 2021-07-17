import { ReactComponent as DepositSVG } from "../../../assets/deposit.svg";
import { ReactComponent as WithdrawSVG } from "../../../assets/withdraw.svg"
import { ReactComponent as PledgeSVG } from "../../../assets/pledge.svg";
import { Pethreon } from "../../../types/Pethreon";
import { useEffect, useState } from 'react';
import { deposit, withdraw, pledge } from "./Actions";
import { Modal } from "../../../components/Modal/Modal";
import "./Actions.css"

interface ActionsProp {
  contract: Pethreon
}

export const Actions = ({ contract }: ActionsProp) => {
  const [open, toggleModal] = useState(false)
  const [currentModal, setCurrentModal] = useState("")

  useEffect(() => {
    if (!open) return

    return () => { }
  }, [open])

  const action = (selected: string) => {
    if (selected === "deposit") {
      setCurrentModal("deposit")
      deposit(contract, toggleModal)
    }
    if (selected === "withdraw") {
      setCurrentModal("withdraw")
      withdraw(contract, toggleModal)
    }
    if (selected === "pledge") {
      setCurrentModal("pledge")
      pledge(contract, toggleModal)
    }
  }

  return <>
    <div className="actions">
      <button className="deposit" onClick={() => action("deposit")}>Deposit <DepositSVG className="actionSVG" /></button>
      <button className="withdraw" onClick={() => action("withdraw")}>Withdraw <WithdrawSVG className="actionSVG" /></button>
      <button className="pledge" onClick={() => action("pledge")}>Pledge <PledgeSVG className="actionSVG" /></button>
    </div>
    <Modal open={open} onClose={() => toggleModal(false)}>{currentModal}</Modal>
  </>
}