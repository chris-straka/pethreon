import React from 'react';
import "./app.css"
import mp4 from "./assets/money.mp4"
import webm from "./assets/money.webm"
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
      <video className="vid" muted autoPlay loop>
        <source src={mp4} type="video/mp4" />
        <source src={webm} type="video/webm" />
        Your browser does not support webm or mp4 video playback.
      </video>
    </main>
  )
}

export default App;

