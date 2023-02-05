import { ReactNode } from "react"
import { ContributorPledge, CreatorPledge } from "./Pledge"
import { PledgeType } from "../../types"

import styles from "./PledgeList.module.scss"

interface PledgeListProps {
  className?: string,
  creator?: boolean,
  pledges: PledgeType[],
  noPledgesText: ReactNode,
  setLoading: ((loading: boolean) => void)
  setNewBalanceAndPledges: ((balance: string, pledges: PledgeType[]) => void)
}

export const PledgeList = ({
  className,
  pledges,
  noPledgesText,
  setLoading,
  setNewBalanceAndPledges,
  creator = false,
}: PledgeListProps
) => {

  if (pledges.length === 0) return (
    <div className={`${className} ${styles.noPledges}`}>
      {noPledgesText}
    </div>
  )

  if (creator) return (
    <ul className={`${className} ${styles.pledges}`}>
      {pledges
        .map((pledge: PledgeType) =>
          <CreatorPledge
            key={pledge.contributorAddress}
            pledge={pledge}
            setLoading={setLoading}
          />
        )}
    </ul>
  )

  return (
    <ul className={`${className} ${styles.pledges}`}>
      {pledges
        .map((pledge: PledgeType) =>
          <ContributorPledge
            key={pledge.creatorAddress}
            pledge={pledge}
            setLoading={setLoading}
            setNewBalanceAndPledges={setNewBalanceAndPledges}
          />
        )}
    </ul>
  )
}
