import { BigNumber } from "ethers"
import styles from "./Pledge.module.css"

interface PledgeProps {
  pledge: {
    0: string,
    1: BigNumber,
    2: BigNumber,
    3: true,
    creator: string,
    weiPerPeriod: BigNumber,
    afterLastPeriod: BigNumber,
    exists: boolean
  }
}

export const Pledge = ({ pledge }: PledgeProps) => {
  console.log(pledge)
  return (
    <>
      <li className={styles.pledge}>
        {pledge.creator}
        <span className={styles.weiPerPeriod}>
          {pledge.weiPerPeriod.toString()}
        </span>
        <span className={styles.afterLastPeriod}>
          {pledge.afterLastPeriod.toString()}
        </span>
      </li>
    </>
  )
}