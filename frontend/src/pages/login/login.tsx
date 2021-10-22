import { useState, useEffect } from 'react';
import { motion } from "framer-motion"
import { useHistory } from 'react-router';
import { EthereumWindow, MetamaskError } from "../../pethreon"
import { TypewriterEffect } from "./components/TypewriterEffect/TypewriterEffect"
import { Footer } from '../../components/Footer/Footer';
import { Features, Video, Pethreon, LoginContainer } from './components';
import { Circle } from '../../circles/components';
import { circleAnimationA } from "../../circles/login/circles"

import styles from "./login.module.scss"
import circleStyles from "../../circles/login/circles.module.scss"

const WALLET_DETECTED = "This app uses your ethereum wallet to make subscriptions to creators"
const WALLET_NOT_FOUND = "This app requires a cryptocurrency wallet to work, "
const TEXT_ANIMATION_DELAY = 1000
const TEXT_ANIMATION_CADENCE = 75

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
        transition={{ duration: 1}}
        className={styles.loginLayout}
        role="region"
      >
        <Pethreon className={styles.pethreon} />
        <Features className={styles.features} />
        <TypewriterEffect
          className={styles.typewriter}
          cadence={TEXT_ANIMATION_CADENCE}
          delay={TEXT_ANIMATION_DELAY}
          message={message}
          linkContent={linkContent}
          linkUrl={linkUrl}
          setTalking={setTalking}
        />
        <LoginContainer
          containerStyles={styles.loginContainer}
          buttonStyles={styles.loginButton}
          talking={talking}
          onClick={login}
        />
        <Video className={styles.video} />
        <Footer />
      </motion.div>
    </>
  );
}