import { useState, useEffect } from 'react';
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';
import { EthereumWindow, MetamaskError } from '../../utils';
import { TypewriterEffect, Features, Video, Pethreon, LoginButton } from './components';
import { Footer } from "../../components"
import styles from "./Login.module.scss"
import { MetamaskSVG } from '../../svgs';

interface LoginProps {
  fadeInDuration: number,
  fadeInDelay: number,
  fadeOutDuration: number,
  fadeOutDelay: number
}

const ETHEREUM_FOUND = "This app uses your ethereum wallet to make subscriptions to creators"
const ETHEREUM_NOT_FOUND = "This app requires a cryptocurrency wallet to work, "
const DOWNLOAD_METMASK = "download metamask!"
const METAMASK_LINK = "https://metamask.io/download"
const LOGGING_IN = "Logging in... You might have to click the metamask extension in your browser"
const ERROR_32002 = "Request already sent, click the metamask extension in your browser"

export const Login = (
  { fadeInDuration, fadeInDelay, fadeOutDuration, fadeOutDelay }: LoginProps
) => {
  const navigate = useNavigate()
  const { ethereum, location } = window as EthereumWindow
  const [message, setMessage] = useState("")
  const [talking, setTalking] = useState(false)
  const [linkContent, setLinkContent] = useState("")
  const [linkUrl, setLinkUrl] = useState("")

  useEffect(() => {
    if (location.pathname !== "/") return
    if (ethereum === undefined) {
      setMessage(ETHEREUM_NOT_FOUND)
      setLinkContent(DOWNLOAD_METMASK)
      setLinkUrl(METAMASK_LINK)
    } else {
      setMessage(ETHEREUM_FOUND)
    }
  }, [ethereum, location])

  async function login() {
    let lastVisited = localStorage.getItem("last_page_visited")
    setMessage(LOGGING_IN)
    try {
      await ethereum.request({ method: 'eth_requestAccounts' })
      lastVisited === "create" ?
        navigate("create") :
        navigate("contribute")
    } catch (error) {
      if ((error as MetamaskError).code === -32002) { setMessage(ERROR_32002) }
      else { setMessage("Error... " + (error as MetamaskError).message) }
    }
  }

  return (
    <motion.div
      className={styles.loginLayout}
      role="region"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: fadeInDelay, duration: fadeInDuration } }}
      exit={{ opacity: 0, transition: { delay: fadeOutDelay, duration: fadeOutDuration } }}
    >
      <Pethreon className={styles.pethreon} />
      <Features className={styles.features} />
      <TypewriterEffect
        className={styles.typewriter}
        cadence={60}
        delay={1000}
        message={message}
        linkContent={linkContent}
        linkUrl={linkUrl}
        setTalking={setTalking}
      />
      <div className={styles.loginContainer}>
        <MetamaskSVG className={styles.metamaskSVG} isTalking={talking} />
        <LoginButton
          className={styles.loginButton}
          onClick={login}
        >Login With Metamask</LoginButton>
      </div>
      <Video className={styles.video} />
      <Footer />
    </motion.div>
  );
}