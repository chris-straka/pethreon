import { useState } from "react"

export function useTalkingLogo(isTalking: boolean, currentMessage: string) {
  const [message, setMessage] = useState(currentMessage)
  const [talking, setTalking] = useState(isTalking)

  return { message, setMessage, talking, setTalking }
}