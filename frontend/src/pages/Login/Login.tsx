import { useEffect, useState } from 'react'
import { MetamaskSVG } from '../../svgs'
import { useNavigate } from 'react-router-dom'
import { useEthereum } from "../../hooks/useEthereum"
import { useConnectWallet } from '@web3-onboard/react'
import { Features, Footer, LoginButton, Pethreon, Typewriter, Video } from './components'
import { WALLET_FOUND, WALLET_NOT_FOUND, LOGGING_IN } from '../../messages'
import { ERROR_32002 } from '../../errors'
import styles from "./Login.module.scss"

export const Login = () => {
  const [message, setMessage] = useState("")
  const [talking, setTalking] = useState(false)
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const navigate = useNavigate()
  const ethereum = useEthereum()

  useEffect(() => {
    if (window.location.pathname !== "/") return
    ethereum ? setMessage(WALLET_FOUND) : setMessage(WALLET_NOT_FOUND)
  }, [wallet])

  async function login() {
    setMessage(LOGGING_IN)
    if (!ethereum) return setMessage(WALLET_NOT_FOUND)
    try {
      await ethereum.request({ method: 'eth_requestAccounts' })
      navigate("contribute")
    } catch (error) {
      if ((error as any).code === -32002) setMessage(ERROR_32002)
      else setMessage((error as any).message)
    }
  }

  return (
    <div className={styles.loginLayout}>
      <Pethreon className={styles.pethreon} />
      <Features className={styles.features} />
      <Typewriter
        className={styles.typewriter}
        message={message}
        setTalking={setTalking}
      />
      <div className={styles.loginContainer}>
        <MetamaskSVG className={styles.metamaskSVG} talking={talking} />
        <LoginButton onClick={login} disabled={connecting}>Login With Metamask</LoginButton>
      </div>
      <Video className={styles.video} />
      <Footer />
    </div>
  );
}