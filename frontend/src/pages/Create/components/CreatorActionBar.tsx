import { Dispatch, ReactNode, SetStateAction } from "react"
import { ActionBar, ActionButton, WithdrawModal } from "../../../components";
import { WithdrawSVG, CsvSVG } from "../../../svgs"
import { extractPledgesToCsv, PledgeType } from "../../../utils";
import styles from "./CreatorActionBar.module.scss"

interface ActionBarProps {
  className: string,
  setModal: Dispatch<SetStateAction<ReactNode>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setBalance: Dispatch<SetStateAction<string>>,
  pledges: PledgeType[]
}

export const CreatorActionBar = (
  { className, setModal, setLoading, setBalance, pledges }: ActionBarProps
) => {
  return (
    <ActionBar className={`${styles.actionBar} ${className}`}>
      <ActionButton className={styles.actionButton} onClick={() => setModal(
        <WithdrawModal
          closeModal={() => setModal(null)}
          setLoading={setLoading}
          setBalance={setBalance}
        />
      )}>
        Withdraw <WithdrawSVG />
      </ActionButton>

      <ActionButton
        className={styles.actionButton}
        onClick={() => extractPledgesToCsv(pledges)}
      >
        Extract to CSV <CsvSVG />
      </ActionButton>
    </ActionBar>
  );
}