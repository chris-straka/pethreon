import "./Address.css"

export const Address: React.FC<{ hexAddress: string }> = ({ hexAddress }) => {
  return (
    <div className="address">
      <p>Your address</p>
      <button>{hexAddress}</button>
    </div>
  );
}

