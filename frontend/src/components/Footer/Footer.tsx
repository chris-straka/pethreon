import styles from "./Footer.module.scss"

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a href="https://github.com/Chris56974/Pethreon#attribution" target="_blank" rel="noreferrer">Attribution</a>
      <a href="https://github.com/Chris56974/Pethreon/blob/main/LICENSE" target="_blank" rel="noreferrer">License</a>
    </footer>
  )
}