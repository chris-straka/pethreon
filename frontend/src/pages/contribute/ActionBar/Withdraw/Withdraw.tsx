import { Dispatch, SetStateAction } from "react"
import styles from "./Withdraw.module.css"

interface WithdrawModalProps {
  closeModal: () => void
  setLoading: Dispatch<SetStateAction<boolean>>
}

export const WithdrawModal = ({ closeModal, setLoading }: WithdrawModalProps) => {

  const withdraw = () => console.log("withdraw")

  return (
    <div className={styles.withdrawModal}>
      <p>How much would you like to withdraw in Ether?</p >
      <input type="text" />
      <button onClick={withdraw}>Withdraw</button>
    </div>
  )
}