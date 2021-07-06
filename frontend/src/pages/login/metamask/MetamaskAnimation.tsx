import { useEffect, useState } from "react"
import { MetamaskSVG } from "./MetamaskSVG"
import "./MetamaskAnimation.css"

export const MetamaskAnimation: React.FC<{
  message: string,
  link: boolean,
  login: any,
  ethereum: any
}> = ({ message, link, login, ethereum }) => {
  const [animatedMessage, setAnimatedMessage] = useState("")
  const [animatedLink, setAnimatedLink] = useState("")
  const [talking, setTalking] = useState(false)

  // TEXT ANIMATION
  useEffect(() => {
    let phrase = ""
    let interrupt: boolean;

    message.split('').forEach((char, index) => {
      setTimeout(() => {
        if (interrupt) return
        setTalking(true)
        phrase += char
        setAnimatedMessage(phrase)
      }, 75 * index);
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
        }, 75 * index);
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
      <button className="login" onClick={login}>Login with metamask</button>
    </div>
  </>
}