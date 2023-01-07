import { useEffect, useState, Dispatch } from "react"
import { actionType } from "../../Login"
import styles from "./TypewriterEffect.module.scss"

interface MetamaskAnimationProps {
  className: string,
  ethereum: any,
  message: string,
  linkContent: string,
  linkUrl: string,
  cadence: number,
  delay: number,
  dispatch: Dispatch<actionType>
}

export const TypewriterEffect = ({ className, ethereum, message, linkUrl, linkContent, cadence, delay, dispatch }: MetamaskAnimationProps) => {
  const [animatedMessage, setAnimatedMessage] = useState("")
  const [animatedLink, setAnimatedLink] = useState("")
  const [init, setInit] = useState(false)
  const { location } = window

  useEffect(() => {
    let interrupt: boolean;
    let messageBuilder = ""
    let linkBuilder = ""

    setTimeout(() => {
      if (location.pathname !== "/") return
      setInit(true)
      dispatch({ type: "setTalking", payload: true })
      message.split('').forEach((char, index) => {
        setTimeout(() => {
          if (interrupt) return
          messageBuilder += char
          setAnimatedMessage(messageBuilder)
        }, cadence * index);
      })

      setTimeout(() => {
        if (!messageBuilder) return
        dispatch({ type: "setTalking", payload: true })
        interrupt = false
      }, message.length * cadence + 1);

      if (linkContent) {
        setTimeout(() => {
          dispatch({ type: "setTalking", payload: false })
          linkContent.split('').forEach((char, index) => {
            setTimeout(() => {
              if (ethereum) window.location.reload()
              if (interrupt) return
              linkBuilder += char
              setAnimatedLink(linkBuilder)
            }, (cadence * index));
          })

          setTimeout(() => {
            dispatch({ type: "setTalking", payload: false })
            interrupt = false
          }, (linkContent.length * cadence) + 1);
        }, (message.length * cadence) + 2)
      }

    }, init ? 0 : delay)

    return () => {
      messageBuilder = ""
      linkBuilder = ""
      interrupt = true
      setAnimatedMessage("")
      setAnimatedLink("")
    }
  }, [init, linkContent, delay, message, cadence, dispatch, location])

  return (
    <p className={`${styles.typewriter} ${className}`}>{animatedMessage} {
      linkContent !== "" ?
        <a href={linkUrl} target="_blank" rel="noreferrer">{animatedLink}</a> :
        null
    } </p>
  )
}