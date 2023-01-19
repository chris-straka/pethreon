import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MetamaskSVG } from '../../svgs'
import { useConnectWallet } from '@web3-onboard/react'
import { Features, Footer, LoginButton, Pethreon, Typewriter, Video } from './components'
import { LOGGING_IN, WALLET_FOUND, WALLET_NOT_FOUND } from '../../messages'
import { useCurrentWeb3Provider } from '../../context/CurrentProviderContext'
import { ethers } from 'ethers'
import styles from "./Login.module.scss"

interface LoginProps {
  fadeInDuration: number,
  fadeInDelay: number,
  fadeOutDuration: number,
  fadeOutDelay: number
}

export const Login = (
  { fadeInDuration, fadeInDelay, fadeOutDuration, fadeOutDelay }: LoginProps
) => {
  const [message, setMessage] = useState("")
  const [talking, setTalking] = useState(false)
  const [{ wallet, connecting }, connect] = useConnectWallet()
  const { setCurrentWeb3Provider } = useCurrentWeb3Provider()
  const metamask = useMetamask()

  // if the wallet has a provider then the wallet is connected
  useEffect(() => {
    if (wallet?.provider) setCurrentWeb3Provider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
  }, [wallet, setCurrentWeb3Provider])

  // This is just for aesthetics
  useEffect(() => {
    metamask ? setMessage(WALLET_FOUND) : setMessage(WALLET_NOT_FOUND)
  }, [metamask])

  function signIn() {
    setMessage(LOGGING_IN)
    connect()
  }

  return (
    <motion.div
      className={styles.loginLayout}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: fadeInDelay, duration: fadeInDuration } }}
      exit={{ opacity: 0, transition: { delay: fadeOutDelay, duration: fadeOutDuration } }}
    >
      <Pethreon className={styles.pethreon} />
      <Features className={styles.features} />
      <Typewriter
        className={styles.typewriter}
        message={message}
        setTalking={setTalking}
      />
      <div className={styles.loginContainer}>
        <MetamaskSVG className={styles.metamaskSVG} talking={talking} />
        <LoginButton onClick={signIn} disabled={connecting}>Login With Metamask</LoginButton>
      </div>
      <Video className={styles.video} />
      <Footer />
    </motion.div>
  );
}

export interface EthereumWindow extends Window {
  ethereum?: any
}

export function useMetamask() {
  const [ethereum, setEthereum] = useState<any | null>(null)

  useEffect(() => {
    if ((window as EthereumWindow).ethereum) setEthereum((window as EthereumWindow).ethereum)
  }, [])

  return ethereum
}