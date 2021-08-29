import { utils } from "ethers"
import { PledgeType } from "../../myEthers/"
import { ReactComponent as TrashSVG } from "../../assets/trash.svg"
import styles from "./Pledge.module.css"

interface PledgeProps {
  pledge: PledgeType
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
      Duration: {pledge.expirationDate.toString()} days
    </span>
    <span className={styles.dateCreated}>
      Starting from: {new Date(+pledge.dateCreated.toString()).toDateString()}
    </span>
    <button className={styles.cancelButton}><TrashSVG className={styles.trashSVG}></TrashSVG>Delete</button>
  </li>
)