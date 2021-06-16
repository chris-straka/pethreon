import { useState, useEffect } from 'react'
import { plsDownloadMetamask } from '../animation/plsDownloadMetamask'
import { Metamask } from "../components/metamask-logo/metamask";
import { Github } from "../components/github-logo/github"

import mp4 from "../assets/money.mp4"
import webm from "../assets/money.webm"
import "./login.css"

export const Login: React.FC = () => {
  const { ethereum } = window
  const [loggingIn, setLoggingIn] = useState(false)

  useEffect(() => {
    if (ethereum) {
      setTimeout(() => {
        speak("This app uses your metamask wallet to make payments to creators...")
      }, 1500)
    } else {
      plsDownloadMetamask(0, 50)
    }
  }, [ethereum])

  const sleep = (sleepTime: number = 50) => new Promise(res => setTimeout(res, sleepTime))

  const speak = async (message: string) => {
    const metamessage = document.querySelector(".metamessage") as HTMLParagraphElement
    const metamaskMouth = document.querySelector("#metamaskMouth") as SVGElement

    metamaskMouth.classList.toggle("talking")
    metamessage.innerHTML = ""

    for (const char of message) {
      metamessage.innerHTML += char
      await sleep()
    }
    metamaskMouth.classList.toggle("talking")
  }

  const login = async () => {
    if (ethereum) {
      try {
        setLoggingIn(true)
        speak("logging in...")
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        console.log(accounts)
        setLoggingIn(false)
      } catch (error) {
        setLoggingIn(false)
        speak("Oh frick, we got an error... " + (error as Error).message)
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