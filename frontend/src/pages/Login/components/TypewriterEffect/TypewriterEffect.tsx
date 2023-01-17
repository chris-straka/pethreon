import { useEffect, useState, Dispatch } from "react"
import { ACTIONTYPE } from "../../Login"
import styles from "./TypewriterEffect.module.scss"

const CADENCE = 60
const DELAY = 1000

interface MetamaskAnimationProps {
  className: string,
  message: string,
  linkContent: string,
  linkUrl: string,
  dispatch: Dispatch<ACTIONTYPE>
}

/** 
 * Links will only work when they're passed separately and at the end of a string
 */
export const TypewriterEffect = (
  { className, message, linkUrl, linkContent, dispatch }: MetamaskAnimationProps
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
      dispatch({ type: "talking", payload: true })

      const chars = message.split('')

      // Type out the normal message
      chars.forEach((char, index) => {
        const timeBeforeEachWord = CADENCE * index
        setTimeout(() => {
          if (interrupt) return
          messageBuilder += char
          setAnimatedMessage(messageBuilder)
        }, timeBeforeEachWord)
      })


      const msgIsDone = message.length * CADENCE + 1
      // This makes sure I stop talking after I'm done with my message
      setTimeout(() => {
        if (!messageBuilder) return
        dispatch({ type: "talking", payload: false })
      }, msgIsDone);

      // if the message has a link to go with it
      if (linkContent) {
        // same as before, except I have to make sure everything happens after the original msg
        const linkChars = linkContent.split('')
        linkChars.forEach((char, index) => {
          setTimeout(() => {
            dispatch({ type: "talking", payload: true })
            if (interrupt) return
            linkBuilder += char
            setAnimatedLink(linkBuilder)
          }, ((msgIsDone) + (CADENCE * index)));
        })

        const linkIsDone = linkContent.length * CADENCE + 80
        setTimeout(() => {
          if (!linkBuilder) return
          dispatch({ type: "talking", payload: false })
        }, ((msgIsDone) + (linkIsDone)));
      }

    }, init ? 0 : DELAY)

    return () => {
      messageBuilder = ""
      linkBuilder = ""
      interrupt = true
      setAnimatedMessage("")
      setAnimatedLink("")
    }
  }, [init, linkContent, message])

  return (
    <p className={`${styles.typewriter} ${className}`}>
      {animatedMessage}
      {linkContent !== "" ? <a href={linkUrl} target="_blank" rel="noreferrer">{animatedLink}</a> : null}
    </p>
  )
}