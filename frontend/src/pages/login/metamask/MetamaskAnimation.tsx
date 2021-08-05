import { useEffect, useState } from "react"
import { MetamaskSVG } from "./MetamaskSVG"
import { LoginButton } from "../LoginButton/LoginButton"
import "./MetamaskAnimation.css"

interface MetamaskAnimationProps {
  message: string,
  link: boolean,
  login: any,
  ethereum: any
}

const animationDelay = 75;

export const MetamaskAnimation = ({ message, link, login, ethereum }: MetamaskAnimationProps) => {
  const [animatedMessage, setAnimatedMessage] = useState("")
  const [animatedLink, setAnimatedLink] = useState("")
  const [talking, setTalking] = useState(false)

  // TEXT ANIMATION
  useEffect(() => {
    let interrupt: boolean;
    let phrase = ""

    message.split('').forEach((char, index) => {
      setTimeout(() => {
        if (interrupt) return
        setTalking(true)
        phrase += char
        setAnimatedMessage(phrase)
      }, animationDelay * index);
    })

    setTimeout(() => {
      if (!phrase) return
      setTalking(false)
    }, message.length * 76);

    interrupt = false;

    return () => {
      phrase = ""
      interrupt = true
    }
  }, [message])

  // LINK ANIMATION
  useEffect(() => {
    let linkBuilder = ""
    if (link) {
      setTalking(true)
      const linkContent = "try out metamask!"
      linkContent.split('').forEach((char, index) => {
        setTimeout(() => {
          if (ethereum) return
          linkBuilder += char
          setAnimatedLink(linkBuilder)
        }, animationDelay * index);
      })

      setTimeout(() => {
        setTalking(false)
      }, linkContent.length * 76);

    }
    return () => {
      linkBuilder = ""
      setAnimatedLink("")
    }
  }, [link, ethereum])

  return <>
    <p className="metamessage">{animatedMessage} {link === true ? (<a href="https://metamask.io/download" target="_blank" rel="noreferrer">{animatedLink}</a>) : null} </p>
    <div className="metacontainer">
      <MetamaskSVG isTalking={talking} />
      <LoginButton handler={login}>Login with metamask</LoginButton>
    </div>
  </>
}