import { Pethreon } from "../../../types/Pethreon";
import { useState } from 'react';
import { deposit, withdraw, pledge } from "./Actions";
import { Modal } from "../../../components/Modal/Modal";
import { ReactComponent as DepositSVG } from "../../../assets/deposit.svg";
import { ReactComponent as WithdrawSVG } from "../../../assets/withdraw.svg"
import { ReactComponent as PledgeSVG } from "../../../assets/pledge.svg";
import "./Actions.css"

interface ActionsProp {
  contract: Pethreon
}

export const Actions = ({ contract }: ActionsProp) => {
  const [openModal, setOpenModal] = useState(false)

  return <>
    <div className="actions">
      <button className="deposit" onClick={() => deposit(contract)} >Deposit <DepositSVG className="actionSVG" /></button>
      <button className="withdraw" onClick={() => withdraw(contract)} >Withdraw <WithdrawSVG className="actionSVG" /></button>
      <button className="pledge" onClick={() => pledge(contract)}>Pledge <PledgeSVG className="actionSVG" /></button>
    </div>
    <Modal open={openModal} onClose={() => setOpenModal(false)} />
  </>
}