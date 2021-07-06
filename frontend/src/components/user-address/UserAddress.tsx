import "./UserAddress.css"

export const UserAddress: React.FC<{ hexAddress: string }> = ({ hexAddress }) => {
  return <button className="userAddress">{hexAddress}</button>
}