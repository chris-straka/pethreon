import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ETHEREUM_FOUND, ETHEREUM_NOT_FOUND, DOWNLOAD_METMASK, METAMASK_LINK, RINKEBY_ONLY, LOGGING_IN, ERROR_32002 } from '../../messages'
import { EthereumWindow, MetamaskError } from '../../utils'
import { TypewriterEffect, Features, Video, Pethreon, LoginButton } from './components'
import { Footer } from "../../components"
import { MetamaskSVG } from '../../svgs'

import styles from "./Login.module.scss"

export const Login = () => {
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
    if (process.env.NODE_ENV === "production") {
      if (!window.confirm(RINKEBY_ONLY)) return
    }
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
    <div className={styles.loginLayout}>
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
    </div>
  );
}