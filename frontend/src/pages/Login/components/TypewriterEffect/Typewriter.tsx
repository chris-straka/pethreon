import { useState } from "react"
import styles from "./TypewriterEffect.module.scss"

const CADENCE = 60
const DELAY = 1000

interface TypewriterProps {
  className: string,
  message: string,
}

export const Typewriter = (
  { className, message }: TypewriterProps
) => {
  const [msg, setMsg] = useState("")



  return (
    <p className={`${styles.typewriter} ${className}`}>{msg}</p>
  )
}