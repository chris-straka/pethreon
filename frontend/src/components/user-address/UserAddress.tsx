import "./UserAddress.css"

export const UserAddress: React.FC<{ hexAddress: string }> = ({ hexAddress }) => <button className="userAddress">{hexAddress}</button>;
