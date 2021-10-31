import { DepositSVG, WithdrawSVG, PledgeSVG } from "../../../../svgs"

interface ActionBarProps {
  actionBarClassName: string,
  actionButtonClassName: string,
  setCurrentModal: any
}

export const ActionBar = ({ actionBarClassName, actionButtonClassName, setCurrentModal }: ActionBarProps) => {
  return (
    <div className={actionBarClassName}>
      <button
        className={actionButtonClassName}
        onClick={() => setCurrentModal("deposit")}>Deposit <DepositSVG /></button>
      <button
        className={actionButtonClassName}
        onClick={() => setCurrentModal("withdraw")}>Withdraw <WithdrawSVG /></button>
      <button
        className={actionButtonClassName}
        onClick={() => setCurrentModal("pledge")}>Pledge <PledgeSVG /></button>
    </div>
  );
}