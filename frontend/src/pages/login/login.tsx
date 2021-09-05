import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { GithubSVG } from './githubSVG/GithubSVG';
import { MetamaskAnimation } from './metamask/MetamaskAnimation';
import styles from "./login.module.css"

import { EthereumWindow, MetamaskError } from "../../pethreon"

import mp4 from "../../assets/money.mp4"
import webm from "../../assets/money.webm"

const pleaseRefresh = () => window.confirm("You might have to refresh the page if you just installed a cryptocurrency wallet")

export const Login = () => {
  const history = useHistory()
  const { ethereum, location } = window as EthereumWindow
  const [message, setMessage] = useState("")
  const [link, setLink] = useState(false)

  // OPENING ANIMATION
  useEffect(() => {
    if (typeof ethereum !== undefined) {
      setTimeout(() => {
        if (location.pathname === "/") setMessage("This app uses your ethereum wallet to make subscriptions to creators")
      }, 1000)
    } else {
      setTimeout(() => {
        if (location.pathname === "/") setMessage("This app requires a cryptocurrency wallet to work, ")
      }, 1500);
      setTimeout(() => {
        if (location.pathname === "/") setLink(true)
      }, 5500);
    }
  }, [ethereum, location])

  async function login() {
    try {
      setMessage("Logging in... You might have to click the metamask extension in your browser...")
      await ethereum.request({ method: 'eth_requestAccounts' })
      history.push("/contribute")
    } catch (error) {
      if ((error as MetamaskError).code === -32002) {
        setMessage("Request already sent, click the metamask extension in your browser")
      } else {
        setMessage("Error... " + (error as MetamaskError).message)
      }
    }
  }

  return <main className={styles.layout}>
    <h1 className={styles.pethreon}>P<span className={styles.Ξ}>Ξ</span>threon</h1>
    <ul className={styles.features}>
      <li>Contribute monthly to your favourite creators in a trustless and privacy respecting manner</li>
      <li>Only pay transaction fees,&nbsp;
        <a href="https://github.com/Chris56974/Pethreon/blob/main/contracts/Pethreon.sol"
          target="_blank"
          rel="noreferrer">
          view the smart contract on Github<GithubSVG />
        </a>
      </li>
    </ul>
    <MetamaskAnimation message={message} link={link} login={ethereum ? login : pleaseRefresh} ethereum={ethereum} />
    <video className={styles.vid} muted autoPlay loop>
      <source src={mp4} type="video/mp4" />
      <source src={webm} type="video/webm" />
      Your browser does not support webm or mp4 videos.
    </video>
  </main>
}