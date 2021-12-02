import { WithdrawSVG, CsvSVG } from "../../../../svgs"
import styles from "./ActionBar.module.scss"

interface ActionBarProps {
  actionBarClassName: string,
  actionButtonClassName: string,
  withdraw: any,
  makeCSV: any,
}

export const ActionBar = ({ withdraw, makeCSV }: ActionBarProps) => {
  return (
    <div className={styles.actionBar}>
      <button
        className={styles.actionButton}
        onClick={() => withdraw()}
      >Withdraw <WithdrawSVG /></button>
      <button
        className={styles.actionButton}
        onClick={() => makeCSV()}
      >Extract to CSV <CsvSVG /></button>
    </div>
  );
}