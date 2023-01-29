import { useState } from 'react'
import { ethers } from 'ethers'
import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom"
import { useConnectWallet, useSetChain } from '@web3-onboard/react'
import { Features, Footer, LoginButton, Pethreon, Typewriter, Video } from './components'
import { MetamaskSVG } from '../../svgs'
import { GREETINGS, LOGGING_IN } from '../../messages'
import { useWeb3Dispatch } from '../../hooks/useWeb3Dispatch'

import {
  CIRCLE_ANIMATION_DURATION as PAGE_FADE_IN_DELAY,
  PAGE_FADE_IN_DURATION,
  PAGE_FADE_OUT_DURATION
} from '../../constants'

import styles from "./Login.module.scss"

export const Login = () => {
  const [message, setMessage] = useState(GREETINGS)
  const [talking, setTalking] = useState(false)
  const [{ connecting }, connect] = useConnectWallet()
  const [, setChain] = useSetChain()
  const dispatch = useWeb3Dispatch()
  const navigate = useNavigate()

  async function signIn() {
    setMessage(LOGGING_IN)

    const wallets = await connect()
    const wallet = wallets[0]

    // switch to georli
    await setChain({ chainId: '0x5' })

    // check if the user is connected properly
    if (!wallet?.provider) throw new Error("Wallet provider not found")

    // create an ethers provider
    const provider = new ethers.providers.Web3Provider(wallet.provider, 'any')

    // save it as the "authenticated user"
    dispatch({ type: "setWeb3", payload: provider })

    localStorage.getItem('last_page_visited') === "create" ?
      navigate("/create") :
      navigate("/contribute");
  }

  return (
    <>
      <motion.div
        className={styles.loginLayout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: PAGE_FADE_IN_DELAY, duration: PAGE_FADE_IN_DURATION } }}
        exit={{ opacity: 0, transition: { duration: PAGE_FADE_OUT_DURATION } }}
      >
        <div className={styles.loginContent}>
          <Pethreon />
          <Features />
          <Typewriter
            className={styles.typewriter}
            message={message}
            setTalking={setTalking}
          />
          <div className={styles.loginContainer}>
            <MetamaskSVG talking={talking} />
            <LoginButton onClick={signIn} disabled={connecting} />
          </div>
        </div>
        <Video />
        <Footer />
      </motion.div>
    </>
  )
}
