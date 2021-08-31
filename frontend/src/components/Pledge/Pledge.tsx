import { utils } from "ethers"
import { getContributorPledges, PledgeType } from "../../pethreon"
import { ReactComponent as TrashSVG } from "../../assets/trash.svg"
import { cancelPledge } from "../../pethreon"
import styles from "./Pledge.module.css"

interface PledgeProps {
  pledge: PledgeType,
  creator?: boolean,
  setLoading?: any
  setPledges?: any
}

export const Pledge = ({ pledge, creator = false, setLoading, setPledges }: PledgeProps) => {
  const creatorAddress = pledge.creatorAddress
  const contributorAddress = pledge.contributorAddress
  const etherPerPeriod = utils.formatEther(pledge.weiPerPeriod)
  const duration = pledge.duration.toNumber()
  const startDate = new Date(+pledge.dateCreated * 1000).toDateString()
  const endDate = new Date((+pledge.dateCreated + (duration * 86400)) * 1000).toDateString()

  const cancelPledgeHandler = async () => {
    setLoading(true)
    try {
      await cancelPledge(creatorAddress)
      const newPledges = await getContributorPledges
      setPledges(newPledges)
      setLoading(false)
    }
    catch (error) {
      setLoading(false)
      console.log(error)
      window.alert(error)
    }
  }

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
      {!creator && <button
        onClick={() => cancelPledgeHandler()}
        className={styles.cancelButton}><TrashSVG className={styles.trashSVG} />Delete</button>}
    </li>
  )
}