import { DepositModal } from "./Deposit/Deposit";
import { PledgeModal } from "./Pledge/PledgeModal"
import { Pledge } from "../../../components";
import { WithdrawModal } from "./Withdraw/WithdrawModal";

export enum MODAL_TYPE {
  NONE = "",
  DEPOSIT = "deposit",
  PLEDGE = "pledge",
  WITHDRAW = "withdraw"
}

export { DepositModal, PledgeModal, WithdrawModal, Pledge }