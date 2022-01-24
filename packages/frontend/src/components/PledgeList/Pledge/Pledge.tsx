import { Dispatch, SetStateAction } from "react"
import { getContributorPledges, getContributorBalanceInWei, cancelPledge } from "../../../pethreon"
import { PledgeType, MetamaskError } from "../../../utils"
import { TrashSVG } from "../../../svgs"
import { utils } from "ethers"
import styles from "./Pledge.module.scss"

interface PledgeProps {
  pledge: PledgeType,
  creator?: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setBalance: Dispatch<SetStateAction<string>>,
  setPledges: Dispatch<SetStateAction<PledgeType[]>>
}

export const Pledge = (
  { pledge, creator = false, setLoading, setBalance, setPledges, }: PledgeProps
) => {
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
      const newBalance = await getContributorBalanceInWei()
      const newBalanceEther = await utils.formatEther(newBalance)
      const newBalanceEtherString = await newBalanceEther.toString()
      setBalance(newBalanceEtherString)
      const newPledges = await getContributorPledges()
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
    <li className={`${styles.pledge} ${creator && styles.creatorStyles}`}>
      <ul className={styles.pledge__details}>
        <li className={styles.pledge__details__address}>
          {creator ? `Contributor: ${contributorAddress}` : `Creator ${creatorAddress}`}
        </li>
        <li className={styles.pledge__details__weiPerPeriod}>
          Ether: {etherPerPeriod} per day
        </li>
        <li className={styles.pledge__details__duration}>
          Duration: {duration} days
        </li>
        <li className={styles.pledge__details__dates}>
          From: {startDate} - {endDate}
        </li>
      </ul>
      {!creator && <button
        onClick={() => cancelPledgeHandler()}
        className={styles.cancelButton}><TrashSVG className={styles.cancelButton__SVG} />Delete</button>}
    </li>
  )
}