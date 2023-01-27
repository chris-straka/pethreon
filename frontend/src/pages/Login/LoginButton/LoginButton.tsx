import styles from "./LoginButton.module.scss"

interface LoginButtonProps {
  onClick: (() => void)
  disabled: boolean
}

export const LoginButton = ({ onClick }: LoginButtonProps) => {
  return <button className={styles.loginButton} onClick={onClick}>Log In</button>
}