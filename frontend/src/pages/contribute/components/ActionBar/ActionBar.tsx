import { DepositSVG, WithdrawSVG, PledgeSVG } from "../../../../svgs"

interface ActionBarProps {
  actionBarClassName: string,
  actionButtonClassName: string
}

export const ActionBar = ({ actionBarClassName, actionButtonClassName }: ActionBarProps) => {
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
        onClick={() => setCurrentModal("withdraw")}>Pledge <PledgeSVG /></button>
    </div>
  );
}