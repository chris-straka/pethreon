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
  const [disabled, setDisabled] = useState(true)
  const buttonRef = useRef<HTMLButtonElement>(null);
  const createSpanRef = useRef<HTMLSpanElement>(null);
  const donateSpanRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion)").matches

  useEffect(() => {
    const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (pathname === "/") {
      buttonRef.current?.style.setProperty("top", "var(--top-login)")
      buttonRef.current?.style.setProperty("left", "var(--left-login)")
      buttonRef.current?.style.setProperty("width", "var(--width-login)")
      buttonRef.current?.style.setProperty("height", "var(--height-login)")
      buttonRef.current?.style.setProperty("border-radius", "50%")
      buttonRef.current?.style.setProperty("background-color", "var(--primary-color)")
      buttonRef.current?.style.setProperty("--color", "transparent")
      buttonRef.current?.style.setProperty("--circle-animation-duration", `${circleAnimationDuration}s`)
      buttonRef.current?.style.setProperty("--circle-animation-delay", `${circleAnimationDelay}s`)
      buttonRef.current?.style.setProperty("--textColor-animation-duration", `${circleAnimationDuration}s`)
      buttonRef.current?.style.setProperty("--textColor-animation-delay", `0s`)

      createSpanRef.current!.style.display = "block"
      createSpanRef.current!.style.transition = "unset"
      createSpanRef.current!.style.opacity = "1"

      donateSpanRef.current!.style.display = "none"
      donateSpanRef.current!.style.transition = "unset"
      donateSpanRef.current!.style.opacity = "0"

      setDisabled(true)
    }

    if (pathname === "/contribute") {
      buttonRef.current?.style.setProperty("top", "var(--top-contribute)")
      buttonRef.current?.style.setProperty("left", "var(--left-contribute)")
      buttonRef.current?.style.setProperty("width", "var(--width-contribute)")
      buttonRef.current?.style.setProperty("height", "var(--height-contribute)")
      buttonRef.current?.style.setProperty("border-radius", "0%")
      buttonRef.current?.style.setProperty("border-bottom-left-radius", "50px")
      buttonRef.current?.style.setProperty("background-color", "var(--primary-color)")
      prefersDarkTheme ?
        buttonRef.current?.style.setProperty("--color", "var(--text-color)") :
        buttonRef.current?.style.setProperty("--color", "var(--background-color)")
      buttonRef.current?.style.setProperty("--outline-color", "var(--primary-color)")
      buttonRef.current?.style.setProperty("--hover-color", "var(--secondary-color)")
      buttonRef.current?.style.setProperty("--circle-animation-duration", `${circleAnimationDuration}s`)
      buttonRef.current?.style.setProperty("--circle-animation-delay", `${circleAnimationDelay}s`)
      buttonRef.current?.style.setProperty("--textColor-animation-duration", `${circleAnimationDuration}s`)
      buttonRef.current?.style.setProperty("--textColor-animation-delay", `${pageFadeInDuration + pageFadeOutDuration}s`)

      donateSpanRef.current!.style.transition = `opacity ${pageFadeOutDuration}s 0s`
      donateSpanRef.current!.style.opacity = "0"

      setTimeout(() => {
        donateSpanRef.current!.style.display = "none"
        createSpanRef.current!.style.display = "block"
        createSpanRef.current!.style.transition = `opacity ${pageFadeInDuration}s 0s`
      }, pageFadeOutDuration * 1000);

      setTimeout(() => {
        createSpanRef.current!.style.opacity = "1"
      }, (pageFadeOutDuration + circleAnimationDuration) * 1000);

      // HERE
      setTimeout(() => {
        if (pathname === "/contribute") {
          buttonRef.current?.style.setProperty("--textColor-animation-duration", ".3s")
          buttonRef.current?.style.setProperty("--textColor-animation-delay", "0s")
        }
      })

      setDisabled(false)
    }

    if (pathname === "/create") {
      buttonRef.current?.style.setProperty("top", "var(--top-create)")
      buttonRef.current?.style.setProperty("left", "var(--left-create)")
      buttonRef.current?.style.setProperty("width", "var(--width-create)")
      buttonRef.current?.style.setProperty("height", "var(--height-create)")
      buttonRef.current?.style.setProperty("border-radius", "0%")
      buttonRef.current?.style.setProperty("border-bottom-left-radius", "50px")
      buttonRef.current?.style.setProperty("background-color", "var(--secondary-color)")
      prefersDarkTheme ?
        buttonRef.current?.style.setProperty("--color", "var(--text-color)") :
        buttonRef.current?.style.setProperty("--color", "var(--background-color)")
      prefersDarkTheme ?
        buttonRef.current?.style.setProperty("--hover-color", "var(--primary-light-color)") :
        buttonRef.current?.style.setProperty("--hover-color", "var(--primary-color)")
      buttonRef.current?.style.setProperty("--outline-color", "var(--secondary-color)")
      buttonRef.current?.style.setProperty("--circle-animation-duration", `${circleAnimationDuration}s`)
      buttonRef.current?.style.setProperty("--circle-animation-delay", `${circleAnimationDelay}s`)
      buttonRef.current?.style.setProperty("--textColor-animation-duration", `${circleAnimationDuration}s`)
      buttonRef.current?.style.setProperty("--textColor-animation-delay", `${pageFadeInDuration + pageFadeOutDuration}s`)

      createSpanRef.current!.style.transition = `opacity ${pageFadeOutDuration}s 0s`
      createSpanRef.current!.style.opacity = "0"

      setTimeout(() => {
        createSpanRef.current!.style.display = "none"
        donateSpanRef.current!.style.display = "block"
        donateSpanRef.current!.style.transition = `opacity ${pageFadeInDuration}s 0s`
      }, pageFadeOutDuration * 1000);

      setTimeout(() => {
        donateSpanRef.current!.style.opacity = "1"
      }, (pageFadeOutDuration + pageFadeInDuration) * 1000);

      setTimeout(() => {
        if (pathname === "/create") {
          buttonRef.current?.style.setProperty("--textColor-animation-duration", ".3s")
          buttonRef.current?.style.setProperty("--textColor-animation-delay", "0s")
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