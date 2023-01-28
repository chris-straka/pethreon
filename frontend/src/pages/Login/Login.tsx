import { useState } from 'react'
import { ethers } from 'ethers'
import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom"
import { useConnectWallet, useSetChain } from '@web3-onboard/react'
import { MetamaskSVG } from '../../svgs'
import { Features, Footer, LoginButton, Pethreon, Typewriter, Video } from './components'
import { GREETINGS, LOGGING_IN } from '../../messages'
import { useWeb3Setup } from '../../context/Web3Context'
import { Pethreon__factory } from '../../../typechain-types'

import styles from "./Login.module.scss"

interface LoginProps {
  circleAnimationDuration: number,
  pageFadeInDuration: number,
  pageFadeOutDuration: number
}

export const Login = ({
  pageFadeInDuration,
  circleAnimationDuration,
  pageFadeOutDuration
}: LoginProps
) => {
  const [message, setMessage] = useState(GREETINGS)
  const [talking, setTalking] = useState(false)
  const { setWeb3Provider, setContract } = useWeb3Setup()
  const [{ connecting }, connect] = useConnectWallet()
  const [chain, setChain] = useSetChain()
  const navigate = useNavigate()

  async function signIn() {
    setMessage(LOGGING_IN)

    const wallets = await connect()
    const wallet = wallets[0]

    // switch to georli
    if (chain.connectedChain?.id !== '0x5') await setChain({ chainId: '0x5' })

    if (wallet?.provider) {
      const web3Provider = new ethers.providers.Web3Provider(wallet.provider, 'any')
      const signer = web3Provider.getSigner()
      const contract = Pethreon__factory.connect(import.meta.env.VITE_CONTRACT_ADDRESS, signer)

      setWeb3Provider(web3Provider)
      setContract(contract)

      localStorage.getItem('last_page_visited') === "create" ?
        navigate("/create") :
        navigate("/contribute")
    }
  }

  return (
    <>
      <motion.div
        className={styles.loginLayout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: circleAnimationDuration, duration: pageFadeInDuration } }}
        exit={{ opacity: 0, transition: { duration: pageFadeOutDuration } }}
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
