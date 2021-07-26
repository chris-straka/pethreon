import styles from "./Withdraw.module.css"

const withdraw = () => { }

export const WithdrawModal = () => {
  return (
    <div className={styles.withdrawModal}>
      <p>How much would you like to withdraw in Ether?</p >
      <input type="text" />
      <button onClick={withdraw}>Withdraw</button>
    </div>
  )
}