import styles from "./LoginButton.module.scss"

interface LoginButtonProps {
  onClick: (() => void)
  disabled: boolean
  children: string
}

export const LoginButton = ({ onClick, children }: LoginButtonProps) => {
  return <button
    className={styles.loginButton}
    onClick={onClick}
  >{children}</button>
}