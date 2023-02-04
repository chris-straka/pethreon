import { CSSProperties } from "react"

const loginButtonStyles: CSSProperties = {
  cursor: 'pointer',
  fontSize: 'var(--font-size-md)',
  fontWeight: '800',
  color: 'white',
  backgroundColor: 'var(--primary-dark-color)',
  borderRadius: '16px',
  padding: '1em 2em 1em 2em',
  transition: 'all 0.3s',
  marginLeft: '1em',
}

interface LoginButtonProps {
  onClick: (() => void)
  disabled: boolean
  className: string
}

export const LoginButton = ({ onClick, className, disabled }: LoginButtonProps) => {
  return (
    <button
      className={className}
      style={loginButtonStyles}
      onClick={onClick}
      disabled={disabled}
    >Log In</button>
  )
}