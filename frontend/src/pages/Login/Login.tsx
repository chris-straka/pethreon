import { useReducer, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEthereum } from "../../hooks/useEthereum"
import { ETHEREUM_FOUND, ETHEREUM_NOT_FOUND, DOWNLOAD_METAMASK, METAMASK_LINK, LOGGING_IN } from '../../messages'
import { TypewriterEffect, Features, Video, Pethreon, LoginButton } from './components'
import { Footer } from "../../components"
import { MetamaskSVG } from '../../svgs'
import styles from "./Login.module.scss"

const initialState = {
  message: "",
  talking: false,
  linkContent: "",
  linkUrl: ""
}

export type actionType =
  | { type: "wallet not found" }
  | { type: "wallet found" }
  | { type: "logging in" }
  | { type: "setTalking", payload: boolean }
  | { type: "error", payload: unknown }

const reducer = (state: typeof initialState, action: actionType) => {
  switch (action.type) {
    case "wallet not found":
      return { ...state, message: ETHEREUM_NOT_FOUND, linkContent: DOWNLOAD_METAMASK, linkUrl: METAMASK_LINK }
    case "wallet found":
      return { ...state, message: ETHEREUM_FOUND }
    case "logging in":
      return { ...state, message: LOGGING_IN }
    case "setTalking":
      return { ...state, talking: action.payload }
    case "error":
      return { ...state, message: `${action.payload}` }
    default:
      throw Error("Action does not exist in the reducer")
  }
}

export const Login = () => {
  const [{ message, talking, linkContent, linkUrl }, dispatch] = useReducer(reducer, initialState)
  const navigate = useNavigate()
  const ethereum = useEthereum()

  useEffect(() => {
    if (window.location.pathname !== "/") return
    if (!ethereum) dispatch({ type: "wallet not found" })
    else dispatch({ type: "wallet found" })
  }, [])

  async function login() {
    dispatch({ type: "logging in" }) // this is just for asthetics
    if (!ethereum) return window.alert("Ethereum wallet not found")
    try {
      await ethereum.request({ method: 'eth_requestAccounts' })
      localStorage.getItem("last_page_visited") === "create" ?
        navigate("create") :
        navigate("contribute")
    } catch (error) {
      dispatch({ type: "error", payload: error })
    }
  }

  return (
    <div className={styles.loginLayout}>
      <Pethreon className={styles.pethreon} />
      <Features className={styles.features} />
      {/* <TypewriterEffect
        ethereum={ethereum}
        className={styles.typewriter}
        cadence={60}
        delay={1000}
        message={message}
        linkContent={linkContent}
        linkUrl={linkUrl}
        dispatch={dispatch}
      /> */}
      <div className={styles.loginContainer}>
        <MetamaskSVG className={styles.metamaskSVG} isTalking={talking} />
        <LoginButton onClick={login}>Login With Metamask</LoginButton>
      </div>
      <Video className={styles.video} />
      <Footer />
    </div>
  );
}