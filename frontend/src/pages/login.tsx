import { useState, useEffect } from 'react'
import { Metamask } from "../components/metamask-logo/metamask";
import { Github } from "../components/github-logo/github"

import mp4 from "../assets/money.mp4"
import webm from "../assets/money.webm"
import "./login.css"

// TODO: Make sure to add back in the class

// if there is no ethereum
// setLoggingIn(true)
// let linkBuilder: string = "";
// for (const char of "download metamask") {
//   if (metamaskParagraph.current.firstElementChild) metamaskParagraph.current.firstElementChild.remove()
//   linkBuilder += char
//   const updatedLink = `<a href="https://metamask.io/download" target="_blank" rel="noreferrer">${linkBuilder}</a>`
//   metamaskParagraph.current.innerHTML += updatedLink
//   new Promise(res => setTimeout(res, 50))

export const Login: React.FC = () => {
  const { ethereum } = window
  const [disableLogin, setDisableLogin] = useState(false)
  const [message, setMessage] = useState("")
  const [animatedMessage, setAnimatedMessage] = useState("")

  useEffect(() => {
    let phrase = ""
    let interrupt: boolean;

    message.split('').forEach((char, index) => {
      setTimeout(() => {
        if (interrupt) return
        phrase += char
        setAnimatedMessage(phrase)
      }, 50 * index);
    })


    interrupt = false;

    return () => {
      phrase = ""
      interrupt = true
    }
  }, [message])

  const login = async () => {
    if (ethereum) {
      try {
        setDisableLogin(true)
        setMessage("Logging in... You might have to click the metamask chrome extension in your browser...")
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        console.log(accounts)
        setDisableLogin(false)
      } catch (error) {
        setDisableLogin(false)
        setMessage("Oh frick, we got an error... " + (error as Error).message)
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
      <p className="metamessage">{animatedMessage}</p>
      <div className="metacontainer">
        <Metamask />
        <button className="login" onClick={login} disabled={disableLogin}>Login with metamask</button>
      </div>
      <video className="vid" muted autoPlay loop>
        <source src={mp4} type="video/mp4" />
        <source src={webm} type="video/webm" />
        Your browser does not support webm or mp4 videos.
      </video>
    </main>
  )
}