import { useEffect, useState, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowSVG } from "../../svgs"
import styles from "./CircleC.module.scss"

interface CircleCProps {
  circleAnimationDuration: number,
  circleAnimationDelay: number,
  textAnimationDelay: number
}

export const CircleC = ({
  circleAnimationDuration,
  circleAnimationDelay,
  textAnimationDelay
}: CircleCProps
) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [disabled, setDisabled] = useState(true)
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (location.pathname === "/") {
      ref.current?.style.setProperty("top", "var(--top-login)")
      ref.current?.style.setProperty("left", "var(--left-login)")
      ref.current?.style.setProperty("width", "var(--width-login)")
      ref.current?.style.setProperty("height", "var(--height-login)")
      ref.current?.style.setProperty("background-color", "var(--primary)")
      ref.current?.style.setProperty("border-radius", "50%")
      ref.current?.style.setProperty("--color", "transparent")
      ref.current?.style.setProperty("--circle-animation-duration", `${circleAnimationDuration}s`)
      ref.current?.style.setProperty("--circle-animation-delay", `${circleAnimationDelay}s`)
      ref.current?.style.setProperty("--text-animation-duration", `${circleAnimationDuration}s`)
      ref.current?.style.setProperty("--text-animation-delay", `0s`)
      setDisabled(true)
    }

    if (location.pathname === "/contribute") {
      ref.current?.style.setProperty("top", "var(--top-contribute)")
      ref.current?.style.setProperty("left", "var(--left-contribute)")
      ref.current?.style.setProperty("width", "var(--width-contribute)")
      ref.current?.style.setProperty("height", "var(--height-contribute)")
      ref.current?.style.setProperty("background-color", "var(--primary)")
      ref.current?.style.setProperty("border-radius", "0%")
      ref.current?.style.setProperty("border-bottom-left-radius", "50px")
      ref.current?.style.setProperty("--color", "var(--text)")
      ref.current?.style.setProperty("--outline-color", "var(--primary)")
      ref.current?.style.setProperty("--hover-color", "var(--secondary)")
      ref.current?.style.setProperty("--circle-animation-duration", `${circleAnimationDuration}s`)
      ref.current?.style.setProperty("--circle-animation-delay", `${circleAnimationDelay}s`)
      ref.current?.style.setProperty("--text-animation-duration", `${circleAnimationDuration}s`)
      ref.current?.style.setProperty("--text-animation-delay", `${textAnimationDelay}s`)

      setTimeout(() => {
        if (location.pathname === "/contribute") {
          ref.current?.style.setProperty("--text-animation-duration", ".3s")
          ref.current?.style.setProperty("--text-animation-delay", "0s")
        }
      }, textAnimationDelay + circleAnimationDuration + circleAnimationDelay);

      setDisabled(false)
    }

    if (location.pathname === "/create") {
      ref.current?.style.setProperty("top", "var(--top-create)")
      ref.current?.style.setProperty("left", "var(--left-create)")
      ref.current?.style.setProperty("width", "var(--width-create)")
      ref.current?.style.setProperty("height", "var(--height-create)")
      ref.current?.style.setProperty("background-color", "var(--secondary)")
      ref.current?.style.setProperty("border-radius", "0%")
      ref.current?.style.setProperty("border-bottom-left-radius", "50px")
      ref.current?.style.setProperty("--color", "var(--text)")
      ref.current?.style.setProperty("--outline-color", "var(--secondary)")
      ref.current?.style.setProperty("--hover-color", "var(--primary-light)")
      ref.current?.style.setProperty("--circle-animation-duration", `${circleAnimationDuration}s`)
      ref.current?.style.setProperty("--circle-animation-delay", `${circleAnimationDelay}s`)
      ref.current?.style.setProperty("--text-animation-duration", `${circleAnimationDuration}s`)
      ref.current?.style.setProperty("--text-animation-delay", `${textAnimationDelay}s`)

      setTimeout(() => {
        if (location.pathname === "/create") {
          ref.current?.style.setProperty("--color-animation-duration", ".3s")
          ref.current?.style.setProperty("--color-animation-delay", "0s")
        }
      }, textAnimationDelay + circleAnimationDuration + circleAnimationDelay);

      setDisabled(false)
    }
  }, [location, circleAnimationDuration, circleAnimationDelay, textAnimationDelay])

  function navigateToNewPage() {
    location.pathname === "/contribute"
      ? navigate("/create", { replace: true })
      : navigate("/contribute", { replace: true })
  }

  return (
    <motion.button
      className={styles.circleC}
      disabled={disabled}
      ref={ref}
      onClick={navigateToNewPage}
      animate={
        location.pathname === "/" ?
          {
            scale: 1.25,
            transition: {
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }
          : {}
      }
    >
      {location.pathname === "/create" ? "Donate" : "Create"}
      <ArrowSVG />
    </motion.button >
  )
}