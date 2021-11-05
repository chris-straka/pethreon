import { useEffect, useState, useRef } from "react"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowSVG } from "../../svgs"
import styles from "./CircleC.module.scss"

interface CircleCProps {
  delay: number,
  duration: number
}

export const CircleC = ({ delay, duration }: CircleCProps) => {
  const location = useLocation()
  const [disabled, setDisabled] = useState(true)
  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (location.pathname === "/") {
      ref.current?.style.setProperty("top", "var(--top-login)")
      ref.current?.style.setProperty("left", "var(--left-login)")
      ref.current?.style.setProperty("width", "var(--width-login)")
      ref.current?.style.setProperty("height", "var(--height-login)")
      ref.current?.style.setProperty("background-color", "var(--primary)")
      ref.current?.style.setProperty("border-radius", "50%")
      setDisabled(true)
    }
    if (location.pathname === "/contribute") {
      ref.current?.style.setProperty("top", "var(--top-login)")
      ref.current?.style.setProperty("left", "var(--left-login)")
      ref.current?.style.setProperty("width", "var(--width-login)")
      ref.current?.style.setProperty("height", "var(--height-login)")
      ref.current?.style.setProperty("background-color", "var(--primary)")
      setDisabled(false)
    }
    if (location.pathname === "/create") {
      ref.current?.style.setProperty("top", "var(--top-login)")
      ref.current?.style.setProperty("left", "var(--left-login)")
      ref.current?.style.setProperty("width", "var(--width-login)")
      ref.current?.style.setProperty("height", "var(--height-login)")
      ref.current?.style.setProperty("background-color", "var(--primary)")
      setDisabled(false)
    }
  }, [location])

  return (
    <motion.button
      className={styles.circleC}
      disabled={disabled}
      ref={ref}
    >
      {location.pathname === "/contribute" ? "Create" : null}
      {location.pathname === "/create" ? "Donate" : null}
      {location.pathname === "/" ? null : < ArrowSVG />}
    </motion.button>
  )
}