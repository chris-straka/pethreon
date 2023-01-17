import { useEffect, useState, Dispatch, SetStateAction } from "react"
import styles from "./TypewriterEffect.module.scss"

const CADENCE = 60
const DELAY = 1000

interface MetamaskAnimationProps {
  className: string,
  msg: string,
  linkContent: string,
  linkUrl: string,
  setTalking: Dispatch<SetStateAction<boolean>>
}

export const TypewriterEffect = (
  { className, msg, linkUrl, linkContent, setTalking }: MetamaskAnimationProps
) => {
  const [animatedMessage, setAnimatedMessage] = useState("")
  const [animatedLink, setAnimatedLink] = useState("")
  const [init, setInit] = useState(false)

  useEffect(() => {
    let interrupt = false
    let messageBuilder = ""
    let linkBuilder = ""

    setTimeout(() => {
      if (window.location.pathname !== "/") return
      setInit(true)
      setTalking(true)

      const chars = msg.split('')

      // Type out the normal message
      chars.forEach((char, index) => {
        setTimeout(() => {
          if (interrupt) return
          messageBuilder += char
          setAnimatedMessage(messageBuilder)
        }, CADENCE * index);
      })

      // This makes sure I stop talking after I'm done with my message
      setTimeout(() => {
        if (!messageBuilder) return
        setTalking(false)
      }, msg.length * CADENCE + 1);

      if (linkContent) {
        setTimeout(() => {
          setTalking(true)
          const linkChars = linkContent.split('')

          linkChars.forEach((char, index) => {
            setTimeout(() => {
              if (interrupt) return
              linkBuilder += char
              setAnimatedLink(linkBuilder)
            }, (CADENCE * index));
          })

          setTimeout(() => {
            setTalking(false)
            interrupt = false
          }, (linkContent.length * CADENCE) + 1);

        }, (msg.length * CADENCE) + 2)
      }

    }, init ? 0 : DELAY)

    return () => {
      messageBuilder = ""
      linkBuilder = ""
      interrupt = true
      setAnimatedMessage("")
      setAnimatedLink("")
    }
  }, [init, linkContent, msg, setTalking, location])

  return (
    <p className={`${styles.typewriter} ${className}`}>
      {animatedMessage}
      {linkContent !== "" ? <a href={linkUrl} target="_blank" rel="noreferrer">{animatedLink}</a> : null}
    </p>
  )
}