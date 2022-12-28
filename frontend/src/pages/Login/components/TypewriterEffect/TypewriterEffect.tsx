import { useEffect, useState, Dispatch, SetStateAction } from "react"
import { EthereumWindow } from "../../../../utils";
import styles from "./TypewriterEffect.module.scss"

interface MetamaskAnimationProps {
  className: string,
  message: string,
  linkContent: string,
  linkUrl: string,
  cadence: number,
  delay: number,
  setTalking: Dispatch<SetStateAction<boolean>>
}

export const TypewriterEffect = ({ className, message, linkUrl, linkContent, cadence, delay, setTalking }: MetamaskAnimationProps) => {
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
      setTalking(true)
      message.split('').forEach((char, index) => {
        setTimeout(() => {
          if (interrupt) return
          messageBuilder += char
          setAnimatedMessage(messageBuilder)
        }, cadence * index);
      })

      setTimeout(() => {
        if (!messageBuilder) return
        setTalking(false)
        interrupt = false
      }, message.length * cadence + 1);

      if (linkContent) {
        setTimeout(() => {
          setTalking(true)
          linkContent.split('').forEach((char, index) => {
            setTimeout(() => {
              if ((window as EthereumWindow).ethereum) window.location.reload()
              if (interrupt) return
              linkBuilder += char
              setAnimatedLink(linkBuilder)
            }, (cadence * index));
          })

          setTimeout(() => {
            setTalking(false)
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
  }, [init, linkContent, delay, message, cadence, setTalking, location])

  return (
    <p className={`${styles.typewriter} ${className}`}>{animatedMessage} {
      linkContent !== "" ?
        <a href={linkUrl} target="_blank" rel="noreferrer">{animatedLink}</a> :
        null
    } </p>
  )
}