import { Link } from "../../../../components/Link/Link"
import { WARNING_MESSAGE } from "../../../../messages"
import styles from "./Footer.module.scss"

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link href={`${() => window.confirm(WARNING_MESSAGE)}`}>Disclaimer</Link>
      <Link href="https://github.com/chris56974/pethreon#attribution">Attribution</Link>
      <Link href="https://github.com/chris56974/pethreon/blob/main/LICENSE">License</Link>
    </footer>
  )
}