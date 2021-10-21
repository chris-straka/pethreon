import { getContributorPledges, getContributorBalance, cancelPledge, MetamaskError, PledgeType } from "../../pethreon"
import { utils } from "ethers"
import { TrashSVG } from "../../svgs"
import styles from "./Pledge.module.scss"

interface PledgeProps {
  pledge: PledgeType,
  creator?: boolean,
  setLoading?: any, // not sure how to handle these
  setPledges?: any,
  setBalance?: any,
}

export const Pledge = ({ pledge, creator = false, setLoading, setBalance, setPledges }: PledgeProps) => {
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
      const balance = await getContributorBalance()
      const newPledges = await getContributorPledges()
      setBalance(balance)
      setPledges(newPledges)
      setLoading(false)
    }
    catch (error) {
      setLoading(false)
      console.log((error as MetamaskError).message)
      window.alert((error as MetamaskError).message)
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