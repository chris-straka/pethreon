import styles from "./Balance.module.scss"

interface BalanceProps {
  balance: string, 
  className: string
}

export const Balance = ({ balance, className }: BalanceProps) => {
  return <h1 className={`${styles.balance} ${className}`}><span className={styles.eth}>ETH</span>{balance}</h1>
}