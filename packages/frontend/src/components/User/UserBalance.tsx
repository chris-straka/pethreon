import styles from "./UserBalance.module.scss"

interface BalanceProps {
  className: string
  balance: string,
}

export const UserBalance = ({ className, balance }: BalanceProps) => {
  return <h1 className={`${className} ${styles.userBalance}`}><span className={styles.eth}>ETH</span>{balance}</h1>
}