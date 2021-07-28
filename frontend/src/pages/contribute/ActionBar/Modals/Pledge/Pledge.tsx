import styles from "./Pledge.module.css"

interface PledgeModalProps {
  closeModal: () => void
}

export const PledgeModal = ({ closeModal }: PledgeModalProps) => {
  const pledge = () => console.log("pledge")
  return (
    <div className={styles.PledgeModal}>
      <p>How much would you like to Pledge?</p>
      <input type="text" />
      <p>Who would you like to pledge to?</p>
      <input type="text" />
      <button onClick={pledge}>pledge</button>
    </div>
  )
}