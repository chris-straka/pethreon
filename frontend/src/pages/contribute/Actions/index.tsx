import { Pethreon } from "../../../types/Pethreon"
import { deposit, withdraw, pledge } from "./Actions"
import { ReactComponent as DepositSVG } from "../../../assets/deposit.svg";
import { ReactComponent as WithdrawSVG } from "../../../assets/withdraw.svg"
import { ReactComponent as PledgeSVG } from "../../../assets/pledge.svg";
import "./Actions.css"

export const Actions: React.FC<{ contract: Pethreon }> = ({ contract }) => {
  return <div className="actions">
    <button className="deposit" onClick={() => deposit(contract)} >Deposit <DepositSVG className="actionSVG" /></button>
    <button className="withdraw" onClick={() => withdraw(contract)} >Withdraw <WithdrawSVG className="actionSVG" /></button>
    <button className="pledge" onClick={() => pledge(contract)}>Pledge <PledgeSVG className="actionSVG" /></button>
  </div>
}