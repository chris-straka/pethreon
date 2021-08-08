import styles from "./Balance.module.css"

interface BalanceProps {
  balance: string
}

export const Balance = ({ balance }: BalanceProps) => {
  return <h1 className={styles.balance}><span className={styles.eth}>ETH</span>{balance}</h1>
}