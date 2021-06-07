import React from 'react';
import "./app.css"
import mp4 from "./assets/money.mp4"
import webm from "./assets/money.webm"
import { Metamask } from "./components/metamask-fox/metamask";

const App: React.FC = () => {
  return (
    <>
    <main className="container">
      <h1 className="pethreon">P<span className="Ξ">Ξ</span>threon</h1>
      <ul className="features">
        <li>Decentralized</li>
        <li>Permissionless</li>
        <li>Trustless</li>
        <li>Only pay ethereum tx fees</li>
      </ul>
      <div className="metamask">
        <Metamask />
        <button>Login with metamask</button>
      </div>
      <video className="vid" muted autoPlay loop>
        <source src={mp4} type="video/mp4" />
        <source src={webm} type="video/webm" />
        Your browser does not support webm or mp4 video playback.
      </video>
    </main>
    <div className="circle-left"></div>
    <div className="circle-right"></div>
    <div className="circle-bottom"></div>
    </>
  )
}

export default App;

