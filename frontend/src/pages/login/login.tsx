import { useState, useEffect } from 'react';
import { motion } from "framer-motion"
import { useHistory } from 'react-router';
import { EthereumWindow, MetamaskError } from "../../pethreon"
import { TypewriterEffect } from "./TypewriterEffect/TypewriterEffect"
import { Footer } from '../../components/Footer/Footer';
import { Video } from '../../components/Video/Video';
import { GithubSVG, MetamaskSVG } from './svgs';
import { Circle } from '../../components/Circles';
import { circleAnimationA } from './circles';
import circleStyles from "./circles.module.css"
import styles from "./login.module.css"

const WALLET_DETECTED = "This app uses your ethereum wallet to make subscriptions to creators"
const WALLET_NOT_FOUND = "This app requires a cryptocurrency wallet to work, "
const TEXT_ANIMATION_DELAY = 1000
const TEXT_ANIMATION_CADENCE = 75
export const LOGIN_FADEOUT_DURATION = 1

export const Login = () => {
  const history = useHistory()
  const { ethereum, location } = window as EthereumWindow
  const [message, setMessage] = useState("")
  const [talking, setTalking] = useState(false)
  const [linkContent, setLinkContent] = useState("")
  const [linkUrl, setLinkUrl] = useState("")

  useEffect(() => {
    if (ethereum !== undefined && location.pathname === "/") setMessage(WALLET_DETECTED)
    if (ethereum === undefined && location.pathname === "/") {
      setMessage(WALLET_NOT_FOUND)
      setLinkContent("download metamask!")
      setLinkUrl("https://metamask.io/download")
    }
  }, [ethereum, location])

  async function login() {
    try {
      setMessage("Logging in... You might have to click the metamask extension in your browser")
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

  return (
    <>
      <Circle className={circleStyles.circleA} circleAnimation={circleAnimationA} />
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: LOGIN_FADEOUT_DURATION }}
        role="region"
        className={styles.loginLayout}
      >
        <h1 className={styles.Pethreon}>P<span className={styles.Ξ}>Ξ</span>threon</h1>
        <ul className={styles.features}>
          <li>Make daily payments to your favourite creators in a trustless and privacy respecting manner</li>
          <li>Only pay ethereum transaction fees,&nbsp;
            <a href="https://github.com/Chris56974/Pethreon/blob/main/contracts/Pethreon.sol"
              target="_blank"
              rel="noreferrer">
              view the smart contract on Github<GithubSVG />
            </a>
          </li>
        </ul>
        <TypewriterEffect
          className={styles.typewriter}
          cadence={TEXT_ANIMATION_CADENCE}
          delay={TEXT_ANIMATION_DELAY}
          message={message}
          linkContent={linkContent}
          linkUrl={linkUrl}
          setTalking={setTalking}
        />
        <div className={styles.loginContainer}>
          <MetamaskSVG talking={talking} />
          <button className={styles.loginButton} onClick={login}>Login With Metamask</button>
        </div>
        <Video className={styles.video} />
        <Footer />
      </motion.div>
    </>
  );
}