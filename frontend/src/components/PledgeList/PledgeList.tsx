import { utils } from "ethers"
import { useWeb3 } from "../../hooks"
import { TrashSVG } from "../../svgs"
import { PledgeType } from "../../types"

import styles from "./PledgeList.module.scss"

interface PledgeListProps {
  className?: string,
  creator?: boolean,
  pledges: PledgeType[],
  textForWhenItsEmpty: string,
  setLoading: ((loading: boolean) => void)
  setNewBalanceAndPledges: ((balance: string, pledges: PledgeType[]) => void)
}

export const PledgeList = ({
  creator = false,
  className,
  pledges,
  textForWhenItsEmpty,
  setLoading,
  setNewBalanceAndPledges
}: PledgeListProps
) => {
  return (
    <ul className={`${pledges.length === 0 ? styles.emptyPledgeBox : styles.pledgeBox} ${className}`}>
      {pledges
        .map((pledge: PledgeType) => <Pledge
          key={creator ? pledge.contributorAddress : pledge.creatorAddress}
          creator={creator}
          pledge={pledge}
          setLoading={setLoading}
          setNewBalanceAndPledges={setNewBalanceAndPledges}
        />)
      }
      {pledges.length === 0 ? <li className={styles.emptyPledgeText}>{textForWhenItsEmpty}</li> : null}
    </ul>
  )
}

interface PledgeProps {
  pledge: PledgeType,
  creator?: boolean,
  setLoading: ((loading: boolean) => void),
  setNewBalanceAndPledges: ((balance: string, pledges: PledgeType[]) => void)
}

export const Pledge = (
  { creator = false, pledge, setLoading, setNewBalanceAndPledges }: PledgeProps
) => {
  const { contract } = useWeb3()
  const { creatorAddress, contributorAddress } = pledge
  const duration = pledge.duration.toNumber()

  const etherPerPeriod = utils.formatEther(pledge.weiPerPeriod)
  const startDate = new Date(+pledge.dateCreated * 1000).toDateString()
  const endDate = new Date((+pledge.dateCreated + (duration * 86400)) * 1000).toDateString()

  async function cancelPledgeHandler() {
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
    <li className={`${styles.pledge} ${creator && styles.creatorStyles}`}>
      <ul className={styles.pledge__details}>
        <li className={styles.pledge__details__address}>
          {creator ? `Contributor: ${contributorAddress}` : `Creator: ${creatorAddress}`}
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