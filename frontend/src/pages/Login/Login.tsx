import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom"
import { useConnectWallet, useSetChain } from '@web3-onboard/react'
import { MetamaskSVG } from '../../svgs'
import { Features, Footer, LoginButton, Pethreon, Typewriter, Video } from './components'
import { LOGGING_IN, WALLET_FOUND, WALLET_NOT_FOUND } from '../../messages'
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
  const [{ connecting }, connect] = useConnectWallet()
  const [, setChain] = useSetChain()
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
      localStorage.getItem('last_page_visited') === "create" ?
        navigate("/create") :
        navigate("/contribute")
    }
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
        <LoginButton onClick={signIn} disabled={connecting} />
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