import "./user-address.css"

export const UserAddress: React.FC<{ user: string }> = ({ user }) => <h1 className="userAddress">{user}</h1>;