import { Pledge } from "./Pledge/Pledge"
import styles from "./PledgeList.module.css"

interface PledgeListProps {
  pledges?: any
}

export const PledgeList = ({ pledges }: PledgeListProps) => {
  return <ul className={styles.transactionHistory}>
    {pledges.map((pledge: any) => <Pledge pledge={pledge} key={pledge.creator} />)}
  </ul>
}