import { useState } from 'react'
import { speak } from '../animation/speak';
import { plsDownloadMetamask } from '../animation/plsDownloadMetamask'
import { Metamask } from "../components/metamask-logo/metamask";
import { Github } from "../components/github-logo/github"

import mp4 from "../assets/money.mp4"
import webm from "../assets/money.webm"
import "./login.css"

window.addEventListener("load", (e: Event) => {
  const { ethereum } = window
  if (ethereum) {
    speak("This app uses your metamask wallet to make payments to creators...", 1500, 50)
  } else {
    plsDownloadMetamask(0, 50)
  }
})

export const Login: React.FC = () => {
  const { ethereum } = window
  const [loggingIn, setloggingIn] = useState(false)
  const [interruptMessage, setinterruptMessage] = useState(false)

  const login = async () => {
    if (ethereum) {
      try {
        setloggingIn(true)
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        setloggingIn(false)
      } catch (error) {
        speak("Oh frick, we got an error... " + (error as Error).message, 50, 500)
      }
    }
  }

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
        <button className="login" onClick={login} disabled={loggingIn}>Login with metamask</button>
      </div>
      <video className="vid" muted autoPlay loop>
        <source src={mp4} type="video/mp4" />
        <source src={webm} type="video/webm" />
        Your browser does not support webm or mp4 videos.
      </video>
    </main>
  )
}