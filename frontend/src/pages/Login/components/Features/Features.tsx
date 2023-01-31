import { Link } from "../../../../components"
import styles from "./Features.module.scss"

export const Features = () => {
  return (
    <>
      <p className={styles.features}>Make daily payments to your favourite creators in a trustless and privacy respecting manner.</p>
      <p className={styles.features}>You only pay for the gas it takes to mine your transaction on ethereum. You can find the <Link href="https://github.com/chris56974/pethreon">source code on github</Link>.</p>
    </>
  )
}
