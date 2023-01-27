import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom"
import { useConnectWallet, useSetChain } from '@web3-onboard/react'
import { useMetamask } from '../../hooks/useMetamask'
import { MetamaskSVG } from '../../svgs'
import { Features, Footer, LoginButton, Pethreon, Typewriter, Video } from '.'
import { Circle } from "../../components"
import { LOGGING_IN, WALLET_FOUND, WALLET_NOT_FOUND } from '../../messages'
import { useWeb3Setup } from '../../context/Web3Context'
import { Pethreon__factory } from '../../../typechain-types'

import circleStyles from "./Login.circles.module.scss"
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
  const [message, setMessage] = useState("")
  const [talking, setTalking] = useState(false)
  const [{ connecting }, connect] = useConnectWallet()
  const [, setChain] = useSetChain()
  const { setCurrentWeb3Provider, setContract } = useWeb3Setup()
  const metamask = useMetamask()
  const navigate = useNavigate()

  // This effect is just for aesthetics
  useEffect(() => {
    metamask ? setMessage(WALLET_FOUND) : setMessage(WALLET_NOT_FOUND)
  }, [metamask])

  async function signIn() {
    setMessage(LOGGING_IN)

    const wallets = await connect()
    const wallet = wallets[0]
    await setChain({ chainId: '0x5' }) // switch to Goerli

    if (wallet?.provider) {
      const web3Provider = new ethers.providers.Web3Provider(wallet.provider, 'any')
      setCurrentWeb3Provider(web3Provider)

      const signer = web3Provider.getSigner()
      const contract = Pethreon__factory.connect(import.meta.env.VITE_CONTRACT_ADDRESS, signer)

      setContract(contract)

      localStorage.getItem('last_page_visited') === "create" ?
        navigate("/create") :
        navigate("/contribute")
    }
  }

  return (
    <>
      <Circle
        circleAnimationDuration={circleAnimationDuration}
        circleAnimationDelay={pageFadeOutDuration}
        className={circleStyles.circleA}
        animate={{ scale: 1.2 }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />
      <Circle
        circleAnimationDuration={circleAnimationDuration}
        circleAnimationDelay={pageFadeOutDuration}
        className={circleStyles.circleB}
        animate={{ scale: 1.2, x: 2, y: 2 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      <Circle
        circleAnimationDuration={circleAnimationDuration}
        circleAnimationDelay={pageFadeOutDuration}
        className={circleStyles.circleC}
        animate={{ scale: 1.25 }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />
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
