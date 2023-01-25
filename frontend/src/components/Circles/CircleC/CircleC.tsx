import { useEffect, useRef } from "react"
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

/** 
 * It's ugly, but you MUST keep the ref.current?.style stuff
 * Or the animation WILL NOT WORK!
 */
export const CircleC = ({
  circleAnimationDuration,
  circleAnimationDelay,
  pageFadeOutDuration,
  pageFadeInDuration
}: CircleCProps
) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const buttonRef = useRef<HTMLButtonElement>(null);
  const createSpanRef = useRef<HTMLSpanElement>(null);
  const donateSpanRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion)").matches

  useEffect(() => {
    const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const buttonRefStyles = buttonRef.current?.style
    const createSpanRefStyles = createSpanRef.current?.style
    const donateSpanRefStyles = donateSpanRef.current?.style
    // unlike the other circles, I can't run an if-check here and return if it's not there

    if (pathname === "/") {
      buttonRefStyles?.setProperty("top", "var(--top-login)")
      buttonRefStyles?.setProperty("left", "var(--left-login)")
      buttonRefStyles?.setProperty("width", "var(--width-login)")
      buttonRefStyles?.setProperty("height", "var(--height-login)")
      buttonRefStyles?.setProperty("border-radius", "50%")
      buttonRefStyles?.setProperty("background-color", "var(--primary-color)")
      buttonRefStyles?.setProperty("--color", "transparent")
      buttonRefStyles?.setProperty("--circle-animation-duration", `${circleAnimationDuration}s`)
      buttonRefStyles?.setProperty("--circle-animation-delay", `${circleAnimationDelay}s`)
      buttonRefStyles?.setProperty("--textColor-animation-duration", `${circleAnimationDuration}s`)
      buttonRefStyles?.setProperty("--textColor-animation-delay", `0s`)

      createSpanRefStyles!.display = "block"
      createSpanRefStyles!.transition = "unset"
      createSpanRefStyles!.opacity = "1"

      donateSpanRefStyles!.display = "none"
      donateSpanRefStyles!.transition = "unset"
      donateSpanRefStyles!.opacity = "0"

      buttonRef.current!.disabled = true
    }

    if (pathname === "/contribute") {
      buttonRefStyles?.setProperty("top", "var(--top-contribute)")
      buttonRefStyles?.setProperty("left", "var(--left-contribute)")
      buttonRefStyles?.setProperty("width", "var(--width-contribute)")
      buttonRefStyles?.setProperty("height", "var(--height-contribute)")
      buttonRefStyles?.setProperty("border-radius", "0%")
      buttonRefStyles?.setProperty("border-bottom-left-radius", "50px")
      buttonRefStyles?.setProperty("background-color", "var(--primary-color)")
      prefersDarkTheme ?
        buttonRefStyles?.setProperty("--color", "var(--text-color)") :
        buttonRefStyles?.setProperty("--color", "var(--background-color)")
      buttonRefStyles?.setProperty("--outline-color", "var(--primary-color)")
      buttonRefStyles?.setProperty("--hover-color", "var(--secondary-color)")
      buttonRefStyles?.setProperty("--circle-animation-duration", `${circleAnimationDuration}s`)
      buttonRefStyles?.setProperty("--circle-animation-delay", `${circleAnimationDelay}s`)
      buttonRefStyles?.setProperty("--textColor-animation-duration", `${circleAnimationDuration}s`)
      buttonRefStyles?.setProperty("--textColor-animation-delay", `${pageFadeInDuration + pageFadeOutDuration}s`)

      donateSpanRefStyles!.transition = `opacity ${pageFadeOutDuration}s 0s`
      donateSpanRefStyles!.opacity = "0"

      setTimeout(() => {
        donateSpanRefStyles!.display = "none"
        createSpanRefStyles!.display = "block"
        createSpanRefStyles!.transition = `opacity ${pageFadeInDuration}s 0s`
      }, pageFadeOutDuration * 1000);

      setTimeout(() => {
        createSpanRefStyles!.opacity = "1"
      }, (pageFadeOutDuration + circleAnimationDuration) * 1000);

      // HERE
      setTimeout(() => {
        if (pathname === "/contribute") {
          buttonRefStyles!.setProperty("--textColor-animation-duration", ".3s")
          buttonRefStyles!.setProperty("--textColor-animation-delay", "0s")
        }
      })

      buttonRef.current!.disabled = false
    }

    if (pathname === "/create") {
      buttonRefStyles?.setProperty("top", "var(--top-create)")
      buttonRefStyles?.setProperty("left", "var(--left-create)")
      buttonRefStyles?.setProperty("width", "var(--width-create)")
      buttonRefStyles?.setProperty("height", "var(--height-create)")
      buttonRefStyles?.setProperty("border-radius", "0%")
      buttonRefStyles?.setProperty("border-bottom-left-radius", "50px")
      buttonRefStyles?.setProperty("background-color", "var(--secondary-color)")
      prefersDarkTheme ?
        buttonRefStyles?.setProperty("--color", "var(--text-color)") :
        buttonRefStyles?.setProperty("--color", "var(--background-color)")
      prefersDarkTheme ?
        buttonRefStyles?.setProperty("--hover-color", "var(--primary-light-color)") :
        buttonRefStyles?.setProperty("--hover-color", "var(--primary-color)")
      buttonRefStyles?.setProperty("--outline-color", "var(--secondary-color)")
      buttonRefStyles?.setProperty("--circle-animation-duration", `${circleAnimationDuration}s`)
      buttonRefStyles?.setProperty("--circle-animation-delay", `${circleAnimationDelay}s`)
      buttonRefStyles?.setProperty("--textColor-animation-duration", `${circleAnimationDuration}s`)
      buttonRefStyles?.setProperty("--textColor-animation-delay", `${pageFadeInDuration + pageFadeOutDuration}s`)

      createSpanRefStyles!.transition = `opacity ${pageFadeOutDuration}s 0s`
      createSpanRefStyles!.opacity = "0"

      setTimeout(() => {
        createSpanRefStyles!.display = "none"
        donateSpanRefStyles!.display = "block"
        donateSpanRefStyles!.transition = `opacity ${pageFadeInDuration}s 0s`
      }, pageFadeOutDuration * 1000);

      setTimeout(() => {
        donateSpanRefStyles!.opacity = "1"
      }, (pageFadeOutDuration + pageFadeInDuration) * 1000);

      setTimeout(() => {
        if (pathname === "/create") {
          buttonRefStyles?.setProperty("--textColor-animation-duration", ".3s")
          buttonRefStyles?.setProperty("--textColor-animation-delay", "0s")
        }
      })
      buttonRef.current!.disabled = false
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