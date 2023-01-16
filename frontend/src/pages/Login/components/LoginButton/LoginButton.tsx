import styles from "./LoginButton.module.scss"

interface LoginButtonProps {
  children: string,
  onClick: (() => void)
}

export const LoginButton = ({ onClick, children }: LoginButtonProps) => {
  return <button
    className={styles.loginButton}
    onClick={onClick}
  >{children}</button>
}