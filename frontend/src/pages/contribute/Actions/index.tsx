import { Pethreon } from "../../../types/Pethreon"
import { deposit, withdraw, pledge } from "./Actions"
import { ReactComponent as DepositSVG } from "../../../assets/deposit.svg";
import { ReactComponent as WithdrawSVG } from "../../../assets/withdraw.svg"
import { ReactComponent as PledgeSVG } from "../../../assets/pledge.svg";
import "./Actions.css"

export const Actions: React.FC<{ contract: Pethreon }> = ({ contract }) => {
  return <div className="actions">
    <button className="deposit" onClick={() => deposit(contract)} tabIndex={2}>Deposit <DepositSVG className="actionSVG" /></button>
    <button className="withdraw" onClick={() => withdraw(contract)} tabIndex={2}>Withdraw <WithdrawSVG className="actionSVG" /></button>
    <button className="pledge" onClick={() => pledge(contract)} tabIndex={2}>Pledge <PledgeSVG className="actionSVG" /></button>
  </div>
}