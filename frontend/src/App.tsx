import React from 'react';
import "./app.css"
import { Metamask } from "./components/metamask-fox/metamask";

const App: React.FC = () => {
  return (
    <main className="grid">
      <h1 className="pethreon">P<span>Ξ</span>threon</h1>
      <ul className="features">
        <li>Decentralized and permissionless*</li>
        <li>Only pay ethereum transaction fees (no markup, comission, or added fee)</li>
        <li>No third parties, view the smart contract on github</li>
      </ul>
      <div className="metamask">
        <Metamask width="200px" />
        <button>Login with metamask</button>
      </div>
    </main>
  )
}

export default App;

