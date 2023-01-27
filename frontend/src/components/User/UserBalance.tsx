interface BalanceProps {
  className: string
  balance: string,
}

export const UserBalance = ({ className, balance }: BalanceProps) => {
  return (
    <h1
      className={className}
      style={{
        fontFamily: 'aileron',
        fontSize: 'clamp(2rem, 8vw + 1rem, 5rem)',
        maxWidth: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
        color: 'var(--text-color)',
      }}
    ><span
      style={{
        fontWeight: 200,
        marginRight: '14px',
        userSelect: 'none',
      }}
    >ETH</span>{balance}</h1 >
  )
}