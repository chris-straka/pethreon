import styles from "./LoginButton.module.scss"

interface LoginButtonProps {
  className: string,
  children: string,
  onClick: (() => void)
}

export const LoginButton = ({ className, onClick, children }: LoginButtonProps) => {
  return <button
    className={`${styles.loginButton} ${className}`}
    onClick={onClick}
  >{children}</button>
}