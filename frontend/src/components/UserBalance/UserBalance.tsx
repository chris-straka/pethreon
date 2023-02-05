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
        maxWidth: '90%',
        whiteSpace: 'nowrap',
        overflowX: 'auto',
        color: 'var(--text-color)',
      }}
    ><span
      style={{
        fontWeight: 200,
        marginRight: '.4em',
        userSelect: 'none',
      }}
    >ETH</span>{balance}</h1 >
  )
}