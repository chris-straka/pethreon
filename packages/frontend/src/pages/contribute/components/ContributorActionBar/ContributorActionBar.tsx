import { Dispatch, SetStateAction, ReactNode } from "react"
import { ActionBar, ActionButton } from "../../../../components"
import { DepositSVG, WithdrawSVG, PledgeSVG } from "../../../../svgs"
import { DepositModal, WithdrawModal, PledgeModal } from "../"
import { PledgeType } from "../../../../utils"

interface ContributorActionBarProps {
  setModal: Dispatch<SetStateAction<ReactNode>>,
  setBalance: Dispatch<SetStateAction<string>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setPledges: Dispatch<SetStateAction<PledgeType[]>>
}

export const ContributorActionBar = (
  { setModal, setBalance, setLoading, setPledges }: ContributorActionBarProps
) => {
  return (
    <ActionBar>
      <ActionButton onClick={() => setModal(
        <DepositModal
          closeModal={() => setModal(null)}
          setLoading={setLoading}
          setBalance={setBalance} />
      )}>Deposit <DepositSVG /></ActionButton>

      <ActionButton onClick={() => setModal(
        <WithdrawModal
          closeModal={() => setModal(null)}
          setLoading={setLoading}
          setBalance={setBalance}
        />
      )}>Withdraw <WithdrawSVG /></ActionButton>

      <ActionButton onClick={() => setModal(
        <PledgeModal
          closeModal={() => setModal(null)}
          setLoading={setLoading}
          setBalance={setBalance}
          setPledges={setPledges}
        />
      )}>Pledge <PledgeSVG /></ActionButton>
    </ActionBar>
  )
}