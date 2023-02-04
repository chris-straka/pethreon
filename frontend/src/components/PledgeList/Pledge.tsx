import { utils } from "ethers"
import { useWeb3 } from "../../hooks"
import { TrashSVG } from "../../svgs"
import { PledgeType } from "../../types"

import styles from "./Pledge.module.scss"

interface ContributorPledgeProps {
  pledge: PledgeType,
  setLoading: ((loading: boolean) => void),
  setNewBalanceAndPledges: ((balance: string, pledges: PledgeType[]) => void)
}

export const ContributorPledge = (
  { pledge, setLoading, setNewBalanceAndPledges }: ContributorPledgeProps
) => {
  const { contract } = useWeb3()
  const { creatorAddress, duration, dateCreated, weiPerPeriod } = pledge

  const pledgeDuration = duration.toNumber()
  const etherPerPeriod = utils.formatEther(weiPerPeriod)
  const pledgeStartDate = new Date(+dateCreated * 1000).toDateString()
  const pledgeEndDate = new Date((+dateCreated + (pledgeDuration * 86400)) * 1000).toDateString()

  async function cancelPledge() {
    setLoading(true)
    try {
      await contract.cancelPledge(creatorAddress)
      const newBalance = await contract.getContributorBalanceInWei()
      const newBalanceEther = await utils.formatEther(newBalance)
      const newBalanceEtherString = await newBalanceEther.toString()

      const newPledges = await contract.getContributorPledges()
      setNewBalanceAndPledges(newBalanceEtherString, newPledges)
    }
    catch (error) {
      setLoading(false)
      window.alert(error)
    }
  }

  return (
    <li className={styles.pledge}>
      <ul className={styles.pledge__details}>
        <li className={styles.pledge__address}>
          Creator: {creatorAddress}
        </li>
        <li className={styles.pledge__weiPerPeriod}>
          Ether: {etherPerPeriod} per day
        </li>
        <li className={styles.pledge__duration}>
          Duration: {pledgeDuration} days
        </li>
        <li className={styles.pledge__dates}>
          From: {pledgeStartDate} - {pledgeEndDate}
        </li>
      </ul>
      <button className={styles.cancelButton} onClick={() => cancelPledge()}><TrashSVG />Delete</button>
    </li>
  )
}

interface CreatorPledgeProps {
  pledge: PledgeType
  setLoading: ((loading: boolean) => void),
}

export const CreatorPledge = ({
  pledge
}: CreatorPledgeProps
) => {
  const { contributorAddress, duration, dateCreated, weiPerPeriod } = pledge

  const pledgeDuration = duration.toNumber()
  const etherPerPeriod = utils.formatEther(weiPerPeriod)
  const pledgeStartDate = new Date(+dateCreated * 1000).toDateString()
  const pledgeEndDate = new Date((+dateCreated + (pledgeDuration * 86400)) * 1000).toDateString()

  return (
    <li className={styles.pledge}>
      <ul className={styles.pledge__details}>
        <li className={styles.pledge__address}>
          Contributor: {contributorAddress}
        </li>
        <li className={styles.pledge__weiPerPeriod}>
          Ether: {etherPerPeriod} per day
        </li>
        <li className={styles.pledge__duration}>
          Duration: {pledgeDuration} days
        </li>
        <li className={styles.pledge__dates}>
          From: {pledgeStartDate} - {pledgeEndDate}
        </li>
      </ul>
    </li>
  )
}