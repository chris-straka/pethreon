import { WithdrawSVG, CsvSVG } from "../../../../svgs"

interface ActionBarProps {
  actionBarClassName: string,
  actionButtonClassName: string,
  withdraw: any,
  makeCSV: any,
}

export const ActionBar = ({ actionBarClassName, actionButtonClassName, withdraw, makeCSV }: ActionBarProps) => {
  return (
    <div className={actionBarClassName}>
      <button
        className={actionButtonClassName}
        onClick={() => withdraw()}
      >Withdraw <WithdrawSVG /></button>
      <button
        className={actionButtonClassName}
        onClick={() => makeCSV()}
      >Extract to CSV <CsvSVG /></button>
    </div>
  );
}