import { useEffect, useState } from 'react'
import { MetamaskSVG } from '../../svgs'
import { useConnectWallet } from '@web3-onboard/react'
import { Features, Footer, LoginButton, Pethreon, Typewriter, Video } from './components'
import { LOGGING_IN } from '../../messages'
import styles from "./Login.module.scss"

export const Login = () => {
  const [message, setMessage] = useState("")
  const [talking, setTalking] = useState(false)
  const [{ wallet, connecting }, connect] = useConnectWallet()
  // const metamask = useMetamask()

  // if the wallet has a provider then the wallet is connected
  useEffect(() => {
    if (wallet?.provider) console.log("hi")
  }, [wallet])

  // This is just for aesthetics
  // useEffect(() => {
  // }, [metamask])

  // console.log("testing")
  // metamask ? setMessage(WALLET_FOUND) : setMessage(WALLET_NOT_FOUND)


  function login() {
    setMessage(LOGGING_IN)
    connect()
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