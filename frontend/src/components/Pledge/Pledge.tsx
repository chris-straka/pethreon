import { utils } from "ethers"
import { PledgeType } from "../../pethreon"
import { ReactComponent as TrashSVG } from "../../assets/trash.svg"
import styles from "./Pledge.module.css"

// creatorAddress, contributorAddress
// weiPerPeriod, dateCreated
// expirationDate
interface PledgeProps {
  pledge: PledgeType
}

export const Pledge = ({ pledge }: PledgeProps) => {
  const creatorAddress = pledge.creatorAddress
  const weiPerPeriod = utils.formatEther(pledge.weiPerPeriod)
  const duration = pledge.duration.toNumber()
  const startDate = new Date(+pledge.dateCreated * 1000).toDateString()
  const endDate = new Date((+pledge.dateCreated + (duration * 86400)) * 1000).toDateString()

  return (
    <li className={styles.pledgeContainer}>
      <span className={styles.creatorAddress}>
        Creator: {creatorAddress}
      </span>
      <span className={styles.weiPerPeriod}>
        Ether: {weiPerPeriod} per day 
      </span>
      <span className={styles.duration}>
        Duration: {duration} days
      </span>
      <span className={styles.dates}>
        Dates: {startDate} - {endDate}
      </span>
      <button className={styles.cancelButton}><TrashSVG className={styles.trashSVG}></TrashSVG>Delete</button>
    </li>
  )
}