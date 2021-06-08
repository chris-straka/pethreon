import React from 'react';
import "./app.css"
import mp4 from "./assets/money.mp4"
import webm from "./assets/money.webm"
import { Metamask } from "./components/metamask-logo/metamask";
import { Github } from "./components/github-logo/github"

const App: React.FC = () => {
  return (
    <>
      <main className="container">
        <h1 className="pethreon">P<span className="Ξ">Ξ</span>threon</h1>
        <ul className="features">
          <li>Contribute monthly to your favourite creators in a trustless, and privacy respecting manner</li>
          <li>Only pay transaction fees, <a href="https://github.com/Chris56974/Pethreon/blob/main/contracts/Pethreon.sol">view the smart contract here on Github <Github /></a></li>
        </ul>
        <p className="metamessage">You need to <a href="https://metamask.io/download">download metamask</a> for this application to work!</p>
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
      <div className="circleA"></div>
      <div className="circleB"></div>
      <div className="circleC"></div>
    </>
  )
}

export default App;

