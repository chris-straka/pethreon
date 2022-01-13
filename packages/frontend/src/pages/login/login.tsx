import { useState, useEffect } from 'react';
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';
import { EthereumWindow, MetamaskError } from '../../utils';
import { TypewriterEffect, Features, Video, Pethreon, LoginContainer } from './components';
import { Footer } from "../../components"
import styles from "./login.module.scss"

interface LoginProps {
  fadeInDuration: number,
  fadeInDelay: number,
  fadeOutDuration: number,
  fadeOutDelay: number
}

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
    if (ethereum !== undefined && location.pathname === "/") {
      setMessage(
        "This app uses your ethereum wallet to make subscriptions to creators"
      )
    }
    if (ethereum === undefined && location.pathname === "/") {
      setMessage("This app requires a cryptocurrency wallet to work, ")
      setLinkContent("download metamask!")
      setLinkUrl("https://metamask.io/download")
    }
  }, [ethereum, location])

  async function login() {
    let lastVisited = localStorage.getItem("last_page_visited")
    try {
      setMessage("Logging in... You might have to click the metamask extension in your browser")
      if (ethereum.isConnected) {
        lastVisited === "create" ?
          navigate("create") :
          navigate("contribute")
      } else {
        await ethereum.request({ method: 'eth_requestAccounts' })
        lastVisited === "create" ?
          navigate("create") :
          navigate("contribute")
      }
    } catch (error) {
      if ((error as MetamaskError).code === -32002) {
        setMessage("Request already sent, click the metamask extension in your browser")
      } else {
        setMessage("Error... " + (error as MetamaskError).message)
      }
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
        cadence={75}
        delay={1000}
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
  );
}