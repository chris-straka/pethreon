import { ethers } from "ethers"
import { usePethreon } from "../../hooks"
import { TrashSVG } from "../../svgs"
import { PledgeType } from "../../types"

import styles from "./Pledge.module.css"

interface ContributorPledgeProps {
  pledge: PledgeType,
  setLoading: ((loading: boolean) => void),
  setNewBalanceAndPledges: ((balance: string, pledges: PledgeType[]) => void)
}

export const ContributorPledge = (
  { pledge, setLoading, setNewBalanceAndPledges }: ContributorPledgeProps
) => {
  const contract = usePethreon()
  const { creatorAddress, duration, dateCreated, weiPerPeriod } = pledge

  const pledgeDuration = Number(duration)
  const etherPerPeriod = ethers.formatEther(weiPerPeriod)
  const pledgeStartDate = new Date(Number(dateCreated) * 1000).toDateString()
  const pledgeEndDate = new Date((Number(dateCreated) + (pledgeDuration * 86400)) * 1000).toDateString()

  async function cancelPledge() {
    // The guard now runs before setLoading(true); the old order left the
    // spinner running forever when the contract wasn't ready.
    if (!contract) return window.alert("Contract is not yet ready")

    setLoading(true)
    try {
      const transaction = await contract.cancelPledge(creatorAddress)
      await transaction.wait()

      const [newBalance, newPledges] = await Promise.all([
        contract.getContributorBalanceInWei(),
        contract.getContributorPledges(),
      ])
      setNewBalanceAndPledges(ethers.formatEther(newBalance), newPledges)
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
}

export const CreatorPledge = ({
  pledge
}: CreatorPledgeProps
) => {
  const { contributorAddress, duration, dateCreated, weiPerPeriod } = pledge

  const pledgeDuration = Number(duration)
  const etherPerPeriod = ethers.formatEther(weiPerPeriod)
  const pledgeStartDate = new Date(Number(dateCreated) * 1000).toDateString()
  const pledgeEndDate = new Date((Number(dateCreated) + (pledgeDuration * 86400)) * 1000).toDateString()

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