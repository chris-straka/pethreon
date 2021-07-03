import "./UserBalance.css"

export const UserBalance: React.FC<{ balance: string }> = ({ balance }) => {
  return <h1 className="userBalance">{balance}</h1>
}