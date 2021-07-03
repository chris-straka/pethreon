import "./UserAddress.css"

export const UserAddress: React.FC<{ hexAddress: string }> = ({ hexAddress }) => {
  return <h1 className="userAddress">{hexAddress}</h1>
}