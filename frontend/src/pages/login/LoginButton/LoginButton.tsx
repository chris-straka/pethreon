import { MouseEvent } from "react"
import styles from "./LoginButton.module.css"

interface ButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void,
}

export const LoginButton = ({ onClick }: ButtonProps) => (
  <button className={styles.button} onClick={onClick}>Login With Metamask</button>
)
