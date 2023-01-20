import { FormEvent } from "react"
import { WARNING_MESSAGE } from '../../messages'
import styles from "./Disclaimer.module.scss"

interface DisclaimerProps {
  className: string
}

export const Disclaimer = ({ className }: DisclaimerProps) => {

  const warning = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setTimeout(() => { window.alert(WARNING_MESSAGE) }, 100);
  }

  return (
    <div className={`${styles.disclaimer} ${className}`}>
      <p className={styles.warning}>⚠️  Warning! <button className={styles.popup} onClick={warning}>Please read!</button></p>
    </div>
  )
}
