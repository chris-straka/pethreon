import { Loading } from "../Loading/Loading"

interface BalanceProps {
  className: string
  balance: string,
  loading: boolean
}

export const UserBalance = ({ className, balance, loading }: BalanceProps) => {
  if (loading) return (
    <h1
      className={className}
      style={{
        fontFamily: 'aileron',
        maxWidth: '90%',
        whiteSpace: 'nowrap',
        overflowX: 'auto',
        color: 'var(--text-color)',
      }}
    >
      <Loading />
    </h1 >
  )

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