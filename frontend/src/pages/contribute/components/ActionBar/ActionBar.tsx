import { Dispatch, SetStateAction, ReactNode } from "react"
import { Deposit, Pledge, Withdraw } from "..";
import { DepositSVG, WithdrawSVG, PledgeSVG } from "../../../../svgs"
import { PledgeType } from "../../../../utils";
import styles from "./ActionBar.module.scss"

interface ActionBarProps {
  setModal: Dispatch<SetStateAction<ReactNode>>,
  setBalance: Dispatch<SetStateAction<string>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setPledges: Dispatch<SetStateAction<PledgeType[]>>
}

export const ActionBar = (
  {
    setModal, setBalance, setLoading, setPledges
  }: ActionBarProps
) => {
  return (
    <div className={styles.actionBar}>
      <button
        className={styles.actionButton}
        onClick={() => setModal(
          <Deposit
            closeModal={() => setModal(null)}
            setLoading={setLoading}
            setBalance={setBalance}
          />
        )}
      >Deposit <DepositSVG /></button>
      <button
        className={styles.actionButton}
        onClick={() => setModal(
          <Withdraw
            closeModal={() => setModal(null)}
            setLoading={setLoading}
            setBalance={setBalance}
          />
        )}>Withdraw <WithdrawSVG /></button>
      <button
        className={styles.actionButton}
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