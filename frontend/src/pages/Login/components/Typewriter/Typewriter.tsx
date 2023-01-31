import { SetStateAction, useEffect, useState, Dispatch } from "react"
import { extractLinks } from "./extractLinks"
import styles from "./Typewriter.module.scss"

const CADENCE = 60
const DELAY = 1000

interface TypewriterProps {
  message: string,
  setTalking: Dispatch<SetStateAction<boolean>>
}

export const Typewriter = ({
  message, setTalking
}: TypewriterProps
) => {
  const [displayMsg, setDisplayMsg] = useState(<p />)
  const [init, setInit] = useState(false)

  useEffect(() => {
    let status = { interrupt: false }

    message.includes("<a") ?
      typeMessageWithLinks(status, init, message, setTalking, setDisplayMsg, setInit) :
      typeMessage(status, init, message, setTalking, setDisplayMsg, setInit)

    return () => {
      status.interrupt = true
      setDisplayMsg(<p />)
      setTalking(false)
    }
  }, [init, message, setTalking])

  return <div className={styles.typewriter}>{displayMsg}</div>
}


/** 
 * This is just a regular typewriter effect with a lot of state stuff thrown in
 * https://www.w3schools.com/howto/howto_js_typewriter.asp
 */
function typeMessage(
  status: { interrupt: boolean },
  init: boolean,
  message: string,
  setTalking: Dispatch<SetStateAction<boolean>>,
  setDisplayMsg: Dispatch<SetStateAction<JSX.Element>>,
  setInit: Dispatch<SetStateAction<boolean>>,
) {
  setTimeout(() => {
    if (window.location.pathname !== "/") return

    setInit(true)

    const chars = message.split('')
    let messageBuilder = ""

    chars.forEach((char, index) => {
      setTimeout(() => {
        if (status.interrupt) return
        setTalking(true)
        messageBuilder += char
        setDisplayMsg(<p>{messageBuilder}</p>)
      }, CADENCE * index);
    })

    // This makes sure I stop talking after I'm done with my message
    setTimeout(() => {
      if (!messageBuilder) return
      setTalking(false)
    }, message.length * CADENCE + 1);

  }, init ? 0 : DELAY)
}


/**
 * This is a much more complicated typewriter effect that prints links as well
 * It can only handle one link inside one message currently
 */
function typeMessageWithLinks(
  status: { interrupt: boolean },
  init: boolean,
  message: string,
  setTalking: Dispatch<SetStateAction<boolean>>,
  setDisplayMsg: Dispatch<SetStateAction<JSX.Element>>,
  setInit: Dispatch<SetStateAction<boolean>>,
) {
  const [messageNoMarkup, links] = extractLinks(message);
  const chars = messageNoMarkup.split('')
  let messageBuilder = ""

  setTimeout(() => {

    if (window.location.pathname !== "/") return

    setInit(true)
    setTalking(true)

    let linkBuilder = ""

    // I need to see if the char is supposed to be a link
    chars.forEach((char, index) => {
      links.forEach((href, range) => {
        const linkLowerBound = range[0]
        const linkUpperBound = range[1]

        setTimeout(() => {
          if (status.interrupt) return
          if (index >= linkLowerBound && index <= linkUpperBound) {
            linkBuilder = linkBuilder + char
            setDisplayMsg(<p>{messageBuilder} <a href={href}>{linkBuilder}</a></p>)
            if (index > linkUpperBound) linkBuilder = ""
            return
          }
          messageBuilder += char
          setDisplayMsg(<p>{messageBuilder}</p>)
        }, (CADENCE * index))
      })
    })

    // This makes sure I stop talking after I'm done with my message
    setTimeout(() => {
      if (!messageBuilder) return
      setTalking(false)
      linkBuilder = ""
    }, messageNoMarkup.length * CADENCE + 1);

  }, init ? 0 : DELAY)
}