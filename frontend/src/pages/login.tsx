import mp4 from "../assets/money.mp4"
import webm from "../assets/money.webm"
import { typingAnimation } from '../animation/metamaskAnimation';
import { Metamask } from "../components/metamask-logo/metamask";
import { Github } from "../components/github-logo/github"

import "./login.css"
import "../css/metamaskAnimation.css"

window.addEventListener("load", (e: Event) => {
  typingAnimation(50, 1500) // speed, delay
})

export const Login: React.FC = () => {

  return (
    <main className="container">
      <h1 className="pethreon">P<span className="Ξ">Ξ</span>threon</h1>
      <ul className="features">
        <li>Contribute monthly to your favourite creators in a trustless, privacy respecting manner</li>
        <li>Only pay transaction fees, <a href="https://github.com/Chris56974/Pethreon/blob/main/contracts/Pethreon.sol" target="_blank" rel="noreferrer">view the smart contract on Github</a> <Github /></li>
      </ul>
      <p className="metamessage" />
      <div className="metacontainer">
        <Metamask />
        <button className="login">Login with metamask</button>
      </div>
      <video className="vid" muted autoPlay loop>
        <source src={mp4} type="video/mp4" />
        <source src={webm} type="video/webm" />
        Your browser does not support webm or mp4 videos.
      </video>
    </main>
  )
}