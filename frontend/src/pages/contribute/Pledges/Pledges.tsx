import { Pledge } from "./Pledge/Pledge"
import styles from "./Pledges.module.css"

export const Pledges = () => {
  return <ul className={styles.transactionHistory}>
    <Pledge />
    <Pledge />
    <Pledge />
  </ul>
}