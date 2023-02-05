import styles from "./LoginButton.module.scss"

interface LoginButtonProps {
  onClick: (() => void)
  disabled: boolean
  className: string
}

export const LoginButton = ({ onClick, disabled, className }: LoginButtonProps) => {
  return (
    <button
      className={`${styles.login} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >Log In</button>
  )
}