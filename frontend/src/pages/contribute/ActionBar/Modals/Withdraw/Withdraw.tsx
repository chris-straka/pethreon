import styles from "./Withdraw.module.css"

interface WithdrawModalProps {
  closeModal: () => void
}

export const WithdrawModal = ({ closeModal }: WithdrawModalProps) => {

  const withdraw = () => console.log("withdraw")

  return (
    <div className={styles.withdrawModal}>
      <p>How much would you like to withdraw in Ether?</p >
      <input type="text" />
      <button onClick={withdraw}>Withdraw</button>
    </div>
  )
}