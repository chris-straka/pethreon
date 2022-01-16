import { Dispatch, ReactNode, SetStateAction } from "react"
import { ActionBar, ActionButton } from "../../../../components";
import { WithdrawSVG, CsvSVG } from "../../../../svgs"
import { WithdrawModal } from "../../../Contribute/components";
import styles from "./CreatorActionBar.module.scss"

interface ActionBarProps {
  className: string,
  setModal: Dispatch<SetStateAction<ReactNode>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setBalance: Dispatch<SetStateAction<string>>,
  makeCSV: (() => void),
}

export const CreatorActionBar = ({ className, setModal, setLoading, setBalance, makeCSV }: ActionBarProps) => {
  return (
    <ActionBar className={`${styles.actionBar} ${className}`}>
      <ActionButton className={styles.withdrawButton} onClick={() => setModal(
        <WithdrawModal
          closeModal={() => setModal(null)}
          setLoading={setLoading}
          setBalance={setBalance}
        />
      )}>
        Withdraw <WithdrawSVG />
      </ActionButton>

      <ActionButton className={styles.extractToCsvButton} onClick={makeCSV}>
        Extract to CSV <CsvSVG />
      </ActionButton>
    </ActionBar>
  );
}