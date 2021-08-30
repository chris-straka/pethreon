import styles from "./LoginButton.module.css"

interface ButtonProps {
  handler: any,
  children: string,
}

export const LoginButton = ({ handler, children }: ButtonProps) => (
  <button className={styles.button} onClick={handler}>{children}</button>
)
