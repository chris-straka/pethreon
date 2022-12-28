import { Link } from "../Link/Link"
import styles from "./Footer.module.scss"

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link href="https://github.com/Chris56974/Pethreon#attribution">Attribution</Link>
      <Link href="https://github.com/Chris56974/Pethreon/blob/main/LICENSE">License</Link>
    </footer>
  )
}