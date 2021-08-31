import { utils } from "ethers"
import { PledgeType } from "../../pethreon"
import { ReactComponent as TrashSVG } from "../../assets/trash.svg"
import styles from "./Pledge.module.css"

interface PledgeProps {
  pledge: PledgeType,
  creator?: boolean
}

export const Pledge = ({ pledge, creator = false }: PledgeProps) => {
  const creatorAddress = pledge.creatorAddress
  const contributorAddress = pledge.contributorAddress
  const etherPerPeriod = utils.formatEther(pledge.weiPerPeriod)
  const duration = pledge.duration.toNumber()
  const startDate = new Date(+pledge.dateCreated * 1000).toDateString()
  const endDate = new Date((+pledge.dateCreated + (duration * 86400)) * 1000).toDateString()

  return (
    <li className={`${styles.pledgeContainer} ${creator && styles.creatorStyles}`}>
      <span className={styles.creatorAddress}>
        {creator ? `Contributor: ${contributorAddress}` : `Creator ${creatorAddress}`}
      </span>
      <span className={styles.weiPerPeriod}>
        Ether: {etherPerPeriod} per day
      </span>
      <span className={styles.duration}>
        Duration: {duration} days
      </span>
      <span className={styles.dates}>
        Dates: {startDate} - {endDate}
      </span>
      {!creator && <button className={styles.cancelButton}><TrashSVG className={styles.trashSVG}></TrashSVG>Delete</button>}
    </li>
  )
}