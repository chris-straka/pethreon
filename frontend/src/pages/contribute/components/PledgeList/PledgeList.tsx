import { PledgeType } from "../../../../utils";
import { Pledge } from "../../../../components/Pledge/Pledge"
import styles from "./PledgeList.module.scss"

interface PledgeListProps {
  pledges: PledgeType[]
}

export const PledgeList = ({ pledges }: PledgeListProps) => {
  return (
    <ul className={pledges.length === 0 ? styles.emptyPledgeBox : styles.pledgeBox}>
      {
        pledges.map((pledge: PledgeType) => (
          <Pledge pledge={pledge} key={pledge.creatorAddress} />
        ))
      }
      {pledges.length === 0 ? <li className={styles.emptyPledgeText}>You need to make a pledge first...</li> : null}
    </ul>
  )
}