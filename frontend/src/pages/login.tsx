import { useState, useEffect } from 'react'
import { Metamask } from "../components/metamask-logo/metamask";
import { Github } from "../components/github-logo/github"

import mp4 from "../assets/money.mp4"
import webm from "../assets/money.webm"
import "./login.css"

// TODO: Make sure to add back in the class

export const Login: React.FC = () => {
  const { ethereum } = window
  const [disableLogin, setDisableLogin] = useState(false)
  const [message, setMessage] = useState("")
  const [animatedMessage, setAnimatedMessage] = useState("")
  const [downloadLink, setDownloadLink] = useState(false)

  useEffect(() => {
    if (ethereum) {
      setTimeout(() => {
        setMessage("This app uses your ethereum wallet to make donations to contributors")
      }, 1500)
    } else {
      setMessage("In order for this application to work properly, you need to have a cryptocurrency wallet. Click here to ")
      setDownloadLink(true)
      console.log(downloadLink)
    }
  }, [ethereum])

  useEffect(() => {
    let phrase = ""
    let interrupt: boolean;

    message.split('').forEach((char, index) => {
      setTimeout(() => {
        if (interrupt) return
        phrase += char
        setAnimatedMessage(phrase)
      }, 60 * index);
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
        <li>Only pay transaction fees, <a href="https://github.com/Chris56974/Pethreon/blob/main/contracts/Pethreon.sol" target="_blank" rel="noreferrer">view the smart contract on Github<Github /></a></li>
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