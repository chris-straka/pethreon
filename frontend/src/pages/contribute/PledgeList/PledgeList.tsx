import { Pledge } from "./Pledge/Pledge"
import styles from "./PledgeList.module.css"

export const PledgeList = () => {
  return <ul className={styles.transactionHistory}>
    <Pledge />
    <Pledge />
    <Pledge />
  </ul>
}