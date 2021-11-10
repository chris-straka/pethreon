import { Dispatch, SetStateAction, ReactNode } from "react"
import { Deposit, Pledge, Withdraw } from "..";
import { DepositSVG, WithdrawSVG, PledgeSVG } from "../../../../svgs"
import { PledgeType } from "../../../../utils";

interface ActionBarProps {
  actionBarClassName: string,
  actionButtonClassName: string,
  setModal: Dispatch<SetStateAction<ReactNode>>,
  setBalance: Dispatch<SetStateAction<string>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setPledges: Dispatch<SetStateAction<PledgeType[]>>
}

export const ActionBar = (
  {
    actionBarClassName, actionButtonClassName,
    setModal, setBalance, setLoading, setPledges
  }: ActionBarProps
) => {
  return (
    <div className={actionBarClassName}>
      <button
        className={actionButtonClassName}
        onClick={() => setModal(
          <Deposit
            closeModal={() => setModal(null)}
            setLoading={setLoading}
            setBalance={setBalance}
          />
        )}
      >Deposit <DepositSVG /></button>
      <button
        className={actionButtonClassName}
        onClick={() => setModal(
          <Withdraw
            closeModal={() => setModal(null)}
            setLoading={setLoading}
            setBalance={setBalance}
          />
        )}>Withdraw <WithdrawSVG /></button>
      <button
        className={actionButtonClassName}
        onClick={() => setModal(
          <Pledge
            closeModal={() => setModal(null)}
            setLoading={setLoading}
            setBalance={setBalance}
            setPledges={setPledges}
          />
        )}>Pledge <PledgeSVG /></button>
    </div>
  );
}