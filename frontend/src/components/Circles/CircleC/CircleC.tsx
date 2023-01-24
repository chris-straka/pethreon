import { useEffect, useState, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowSVG } from "../../../svgs/ArrowSVG"
import styles from "./CircleC.module.scss"

interface CircleCProps {
  circleAnimationDuration: number,
  circleAnimationDelay: number,
  pageFadeOutDuration: number,
  pageFadeInDuration: number
}

export const CircleC = ({
  circleAnimationDuration,
  circleAnimationDelay,
  pageFadeOutDuration,
  pageFadeInDuration
}: CircleCProps
) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [disabled, setDisabled] = useState(true)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const createSpanRef = useRef<HTMLSpanElement>(null)
  const donateSpanRef = useRef<HTMLSpanElement>(null)
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion)").matches

  useEffect(() => {
    const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    const buttonRefStyle = buttonRef.current?.style
    const createSpanRefStyle = createSpanRef.current?.style
    const donateSpanRefStyle = donateSpanRef.current?.style
    if (!buttonRefStyle || !createSpanRefStyle || !donateSpanRefStyle) return

    if (pathname === "/") {
      buttonRefStyle.top = "var(--top-login)"
      buttonRefStyle.left = "var(--left-login)"
      buttonRefStyle.width = "var(--width-login)"
      buttonRefStyle.height = "var(--height-login)"
      buttonRefStyle.borderRadius = "50%"
      buttonRefStyle.backgroundColor = "var(--primary-color)"

      // CSS Variables
      buttonRefStyle.setProperty("--color", "transparent")
      buttonRefStyle.setProperty("--circle-animation-duration", `${circleAnimationDuration}s`)
      buttonRefStyle.setProperty("--circle-animation-delay", `${circleAnimationDelay}s`)
      buttonRefStyle.setProperty("--textColor-animation-duration", `${circleAnimationDuration}s`)
      buttonRefStyle.setProperty("--textColor-animation-delay", `0s`)

      createSpanRefStyle.display = "block"
      createSpanRefStyle.transition = "unset"
      createSpanRefStyle.opacity = "1"

      donateSpanRefStyle.display = "none"
      donateSpanRefStyle.transition = "unset"
      donateSpanRefStyle.opacity = "0"

      setDisabled(true)
    }

    if (pathname === "/contribute") {
      buttonRefStyle.top = "var(--top-contribute)"
      buttonRefStyle.left = "var(--left-contribute)"
      buttonRefStyle.width = "var(--width-contribute)"
      buttonRefStyle.height = "var(--height-contribute)"
      buttonRefStyle.borderRadius = "0%"
      buttonRefStyle.borderBottomLeftRadius = "50px"
      buttonRefStyle.backgroundColor = "var(--primary-color)"

      // CSS variables
      prefersDarkTheme ?
        buttonRefStyle.setProperty("--color", "var(--text-color)") :
        buttonRefStyle.setProperty("--color", "var(--background-color)")
      buttonRefStyle.setProperty("--outline-color", "var(--primary-color)")
      buttonRefStyle.setProperty("--hover-color", "var(--secondary-color)")
      buttonRefStyle.setProperty("--circle-animation-duration", `${circleAnimationDuration}s`)
      buttonRefStyle.setProperty("--circle-animation-delay", `${circleAnimationDelay}s`)
      buttonRefStyle.setProperty("--textColor-animation-duration", `${circleAnimationDuration}s`)
      buttonRefStyle.setProperty("--textColor-animation-delay", `${pageFadeInDuration + pageFadeOutDuration}s`)

      donateSpanRefStyle.transition = `opacity ${pageFadeOutDuration}s 0s`
      donateSpanRefStyle.opacity = "0"

      setTimeout(() => {
        donateSpanRefStyle.display = "none"
        createSpanRefStyle.display = "block"
        createSpanRefStyle.transition = `opacity ${pageFadeInDuration}s 0s`
      }, pageFadeOutDuration * 1000)

      setTimeout(() => {
        createSpanRefStyle.opacity = "1"
      }, (pageFadeOutDuration + circleAnimationDuration) * 1000)

      setTimeout(() => {
        if (pathname === "/contribute") {
          buttonRefStyle.setProperty("--textColor-animation-duration", ".3s")
          buttonRefStyle.setProperty("--textColor-animation-delay", "0s")
        }
      })

      setDisabled(false)
    }

    if (pathname === "/create") {
      buttonRefStyle.top = "var(--top-create)"
      buttonRefStyle.left = "var(--left-create)"
      buttonRefStyle.width = "var(--width-create)"
      buttonRefStyle.height = "var(--height-create)"
      buttonRefStyle.borderRadius = "0%"
      buttonRefStyle.borderBottomLeftRadius = "50px"
      buttonRefStyle.backgroundColor = "var(--secondary-color)"

      // CSS Variables
      prefersDarkTheme ?
        buttonRefStyle.setProperty("--color", "var(--text-color)") :
        buttonRefStyle.setProperty("--color", "var(--background-color)")
      prefersDarkTheme ?
        buttonRefStyle.setProperty("--hover-color", "var(--primary-light-color)") :
        buttonRefStyle.setProperty("--hover-color", "var(--primary-color)")
      buttonRefStyle.setProperty("--outline-color", "var(--secondary-color)")
      buttonRefStyle.setProperty("--circle-animation-duration", `${circleAnimationDuration}s`)
      buttonRefStyle.setProperty("--circle-animation-delay", `${circleAnimationDelay}s`)
      buttonRefStyle.setProperty("--textColor-animation-duration", `${circleAnimationDuration}s`)
      buttonRefStyle.setProperty("--textColor-animation-delay", `${pageFadeInDuration + pageFadeOutDuration}s`)

      createSpanRefStyle.transition = `opacity ${pageFadeOutDuration}s 0s`
      createSpanRefStyle.opacity = "0"

      setTimeout(() => {
        createSpanRefStyle.display = "none"
        donateSpanRefStyle.display = "block"
        donateSpanRefStyle.transition = `opacity ${pageFadeInDuration}s 0s`
      }, pageFadeOutDuration * 1000)

      setTimeout(() => {
        donateSpanRefStyle.opacity = "1"
      }, (pageFadeOutDuration + pageFadeInDuration) * 1000)

      setTimeout(() => {
        if (pathname === "/create") {
          buttonRefStyle.setProperty("--textColor-animation-duration", ".3s")
          buttonRefStyle.setProperty("--textColor-animation-delay", "0s")
        }
      })

      setDisabled(false)
    }
  }, [pathname, circleAnimationDuration, circleAnimationDelay, pageFadeInDuration, pageFadeOutDuration])

  function navigateToNewPage() {
    pathname === "/contribute" ?
      navigate("/create", { replace: true }) :
      navigate("/contribute", { replace: true })
  }

  return (
    <motion.button
      className={styles.circleC}
      disabled={disabled}
      ref={buttonRef}
      onClick={navigateToNewPage}
      animate={
        pathname === "/" && !prefersReducedMotion ? {
          scale: 1.25,
          transition: {
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }
        } : {}
      }
    >
      <span ref={donateSpanRef}>Donate <ArrowSVG /></span>
      <span ref={createSpanRef}>Create <ArrowSVG /></span>
    </motion.button >
  )
}