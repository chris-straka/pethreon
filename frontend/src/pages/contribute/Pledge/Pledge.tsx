import { BigNumber, utils } from "ethers"
import { ReactComponent as TrashSVG } from "../../../assets/trash.svg"
import styles from "./Pledge.module.css"

interface PledgeProps {
  pledge: {
    0: string,
    1: BigNumber,
    2: BigNumber,
    3: BigNumber,
    4: true,
    afterLastPeriod: BigNumber,
    creatorAddress: string,
    dateCreated: BigNumber,
    exists: boolean
    weiPerPeriod: BigNumber,
  }
}

export const Pledge = ({ pledge }: PledgeProps) => (
  <li className={styles.pledgeContainer}>
    <span className={styles.creatorAddress}>
      Creator Address: {pledge.creatorAddress}
    </span>
    <span className={styles.weiPerPeriod}>
      Ether: {utils.formatEther(pledge.weiPerPeriod)} per day
    </span>
    <span className={styles.afterLastPeriod}>
      Duration: {pledge.afterLastPeriod.toString()} days
    </span>
    <span className={styles.dateCreated}>
      Starting from: {new Date(+pledge.dateCreated.toString()).toDateString()}
    </span>
    <button className={styles.cancelButton}><TrashSVG className={styles.trashSVG}></TrashSVG>Delete</button>
  </li>
)