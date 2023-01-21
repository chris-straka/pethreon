import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom"
import { MetamaskSVG } from '../../svgs'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'
import { Features, Footer, LoginButton, Pethreon, Typewriter, Video } from './components'
import { LOGGING_IN, WALLET_FOUND, WALLET_NOT_FOUND } from '../../messages'
import { useWeb3Setup } from '../../context/Web3Context'
import { ethers } from 'ethers'
import styles from "./Login.module.scss"
import { Pethreon__factory } from '../../../typechain-types'

interface LoginProps {
  fadeInDuration: number,
  fadeInDelay: number,
  fadeOutDuration: number,
  fadeOutDelay: number
}

const PETHREON_CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS

export const Login = (
  { fadeInDuration, fadeInDelay, fadeOutDuration, fadeOutDelay }: LoginProps
) => {
  const [message, setMessage] = useState("")
  const [talking, setTalking] = useState(false)
  const [{ wallet, connecting }, connect] = useConnectWallet()
  const [{ chains, connectedChain }, setChain] = useSetChain()
  const { setCurrentWeb3Provider, setContract } = useWeb3Setup()
  const metamask = useMetamask()
  const navigate = useNavigate()

  useEffect(() => {
    metamask ? setMessage(WALLET_FOUND) : setMessage(WALLET_NOT_FOUND)
  }, [metamask])

  async function signIn() {
    setMessage(LOGGING_IN)
    const wallets = await connect()
    const currentWallet = wallets[0]
    await setChain({ chainId: '0x5' }) // switch to Goerli

    if (currentWallet?.provider) {
      const web3Provider = new ethers.providers.Web3Provider(currentWallet.provider, 'any')
      setCurrentWeb3Provider(web3Provider)

      const signer = web3Provider.getSigner()
      const contract = Pethreon__factory.connect(PETHREON_CONTRACT_ADDRESS, signer)
      setContract(contract)

      // const lastVisited = localStorage.getItem('last_page_visited')
      // lastVisited === "create" ? navigate("/create") : navigate("/contribute")
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