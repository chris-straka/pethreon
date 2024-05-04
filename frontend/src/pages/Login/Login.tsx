import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom"
import { useConnectWallet } from '@web3-onboard/react'
import { Features, Footer, LoginButton, Pethreon, Typewriter, Video } from './components'
import { MetamaskSVG } from '../../svgs'
import { GREETINGS, LOGGING_IN, LOGIN_ERROR } from '../../messages'
import { useTalkingLogo } from './hooks/useTalkingLogo'
import {
  CIRCLE_ANIMATION_DURATION as PAGE_FADE_IN_DELAY,
  PAGE_FADE_IN_DURATION,
  PAGE_FADE_OUT_DURATION
} from '../../constants'

import styles from "./Login.module.scss"

export const Login = () => {
  const { message, setMessage, talking, setTalking } = useTalkingLogo(false, GREETINGS)
  const [{ connecting }, connect] = useConnectWallet()
  const navigate = useNavigate()

  async function signIn() {
    setMessage(LOGGING_IN)
    try {
      // Grab the user's wallet
      const wallets = await connect()
      const wallet = wallets[0]
      if (!wallet) throw new Error("Wallet provider not found")

      // Switch to the sepolia test network
      // await setChain({ chainId: '0x11155111' })

      // Save and navigate
      localStorage.setItem("wallet", JSON.stringify(wallet.label))
      localStorage.getItem('last_page_visited') === "create" ?
        navigate("/create") :
        navigate("/contribute");
    } catch (error) {
      setMessage(LOGIN_ERROR)
      throw new Error(`Login error: ${error}`)
    }
  }

  return (
    <motion.main
      className={styles.loginLayout}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: PAGE_FADE_IN_DELAY, duration: PAGE_FADE_IN_DURATION } }}
      exit={{ opacity: 0, transition: { duration: PAGE_FADE_OUT_DURATION } }}

      // the main content must go above the backdrop (2) and the circles (3)
      style={{ zIndex: 4, position: 'relative' }}
    >
      <div className={styles.loginContent}>
        <Pethreon className={styles.pethreon} />
        <Features className={styles.features} />
        <Typewriter
          className={styles.typewriter}
          message={message}
          setTalking={setTalking}
        />
        <div className={styles.loginContainer}>
          <MetamaskSVG talking={talking} />
          <LoginButton className={styles.loginButton} onClick={signIn} disabled={connecting} />
        </div>
      </div>
      <Video />
      <Footer />
    </motion.main>
  )
}
