import { useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEthereum } from "../../hooks/useEthereum"
import { WALLET_FOUND, WALLET_NOT_FOUND, LOGGING_IN, DOWNLOAD_METAMASK, METAMASK_LINK } from '../../messages'
import { ERROR_32002 } from '../../errors'
import { TypewriterEffect, Features, Video, Pethreon, LoginButton, Footer } from './components'
import { MetamaskSVG } from '../../svgs'
import styles from "./Login.module.scss"

const initialState = {
  message: "",
  linkContent: "",
  linkUrl: "",
  talking: false,
}

export type ACTIONTYPE =
  | { type: "wallet found" }
  | { type: "wallet not found" }
  | { type: "logging in" }
  | { type: "error", payload: string }
  | { type: "talking", payload: boolean }

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "wallet found":
      return { ...state, message: WALLET_FOUND, linkContent: "", linkUrl: "" }
    case "wallet not found":
      return { ...state, message: WALLET_NOT_FOUND, linkContent: DOWNLOAD_METAMASK, linkUrl: METAMASK_LINK }
    case "logging in":
      return { ...state, message: LOGGING_IN, linkContent: "", linkUrl: "" }
    case "talking":
      return { ...state, talking: action.payload }
    case "error":
      return { ...state, message: action.payload, linkContent: "", linkUrl: "" }
  }
}

export const Login = () => {
  const [{ message, linkContent, linkUrl, talking }, dispatch] = useReducer(reducer, initialState)
  const navigate = useNavigate()
  const ethereum = useEthereum()

  useEffect(() => {
    if (window.location.pathname !== "/") return
    ethereum ? dispatch({ type: "wallet found" }) : dispatch({ type: "wallet not found" })
  }, [])

  async function login() {
    dispatch({ type: "logging in" })
    if (!ethereum) return dispatch({ type: "wallet not found" })
    try {
      await ethereum.request({ method: 'eth_requestAccounts' })
      localStorage.getItem("last_page_visited") === "create" ?
        navigate("create") :
        navigate("contribute")
    } catch (error) {
      if ((error as any).code === -32002) dispatch({ type: "error", payload: ERROR_32002 })
      else dispatch({ type: "error", payload: (error as any).message })
    }
  }

  return (
    <div className={styles.loginLayout}>
      <Pethreon className={styles.pethreon} />
      <Features className={styles.features} />
      <TypewriterEffect
        className={styles.typewriter}
        message={message}
        linkContent={DOWNLOAD_METAMASK}
        linkUrl={METAMASK_LINK}
        dispatch={dispatch}
      />
      <div className={styles.loginContainer}>
        <MetamaskSVG className={styles.metamaskSVG} talking={talking} />
        <LoginButton onClick={login}>Login With Metamask</LoginButton>
      </div>
      <Video className={styles.video} />
      <Footer />
    </div>
  );
}