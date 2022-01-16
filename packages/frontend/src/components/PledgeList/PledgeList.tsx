import { PledgeType } from "../../utils";
import { Pledge } from "../Pledge/Pledge"
import styles from "./PledgeList.module.scss"

interface PledgeListProps {
  className?: string,
  pledges: PledgeType[],
  textForWhenItsEmpty: string,
  creator: boolean
}

export const PledgeList = ({ className, pledges, creator, textForWhenItsEmpty }: PledgeListProps) => {
  return (
    <ul className={
      `${pledges.length === 0 ? styles.emptyPledgeBox : styles.pledgeBox} 
       ${className}`}
    >
      {pledges
        .map((pledge: PledgeType) => <Pledge
          pledge={pledge}
          creator={creator}
          key={creator ? pledge.contributorAddress : pledge.creatorAddress}
        />)
      }
      {pledges.length === 0 ? <li className={styles.emptyPledgeText}>{textForWhenItsEmpty}</li> : null}
    </ul>
  )
}