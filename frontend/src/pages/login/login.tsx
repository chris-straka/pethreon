import { useState, useEffect } from 'react'
import { GithubSVG } from "../../components/github-logo/github"
import { MetamaskAnimation } from '../../components/metamask/metamask-animation';
import mp4 from "../../assets/money.mp4"
import webm from "../../assets/money.webm"
import "./login.css"

export const Login: React.FC = () => {
  const { ethereum } = window
  const [disableLogin, setDisableLogin] = useState(false)
  const [message, setMessage] = useState("")
  const [link, setLink] = useState(false)

  // OPENING ANIMATION
  useEffect(() => {
    if (ethereum) {
      setTimeout(() => {
        setMessage("This app uses your ethereum wallet to make subscriptions to creators")
      }, 1000)
    } else {
      setTimeout(() => {
        setMessage("This app requires a cryptocurrency wallet to work, ")
      }, 1500);
      setTimeout(() => {
        setLink(true)
      }, 5500);
    }
  }, [ethereum])

  const login = async () => {
    try {
      setDisableLogin(true)
      setMessage("Logging in... You might have to click the metamask extension in your browser")
      const accounts: [string] = await ethereum.request({ method: 'eth_requestAccounts' })
      localStorage.setItem("account", accounts[0])
    } catch (error) {
      setDisableLogin(false)
      setMessage("Error... " + (error as Error).message)
    }
  }

  const pleaseRefresh = () => {
    window.confirm("You might have to refresh this page if you just installed a cryptocurrency wallet")
  }

  return (
    <main>
      <h1 className="pethreon">P<span className="Ξ">Ξ</span>threon</h1>
      <ul className="features">
        <li>Contribute monthly to your favourite creators in a trustless, privacy respecting manner</li>
        <li>Only pay transaction fees,&nbsp;
          <a href="https://github.com/Chris56974/Pethreon/blob/main/contracts/Pethreon.sol"
            target="_blank"
            rel="noreferrer">
            view the smart contract on Github<GithubSVG />
          </a>
        </li>
      </ul>
      <MetamaskAnimation
        message={message}
        link={link}
        disableLogin={disableLogin}
        login={ethereum ? login : pleaseRefresh}
        ethereum={ethereum}
      />
      <video className="vid" muted autoPlay loop>
        <source src={mp4} type="video/mp4" />
        <source src={webm} type="video/webm" />
        Your browser does not support webm or mp4 videos.
      </video>
    </main>
  )
}