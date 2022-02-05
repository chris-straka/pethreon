import { useEffect, useState, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowSVG } from "../../../svgs/ArrowSVG/ArrowSVG"
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
  const location = useLocation()
  const navigate = useNavigate()
  const [disabled, setDisabled] = useState(true)
  const ref = useRef<HTMLButtonElement>(null);
  const createRef = useRef<HTMLSpanElement>(null);
  const donateRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (location.pathname === "/") {
      ref.current?.style.setProperty("top", "var(--top-login)")
      ref.current?.style.setProperty("left", "var(--left-login)")
      ref.current?.style.setProperty("width", "var(--width-login)")
      ref.current?.style.setProperty("height", "var(--height-login)")
      ref.current?.style.setProperty("border-radius", "50%")
      ref.current?.style.setProperty("background-color", "var(--primary)")
      ref.current?.style.setProperty("--color", "transparent")
      ref.current?.style.setProperty("--circle-animation-duration", `${circleAnimationDuration}s`)
      ref.current?.style.setProperty("--circle-animation-delay", `${circleAnimationDelay}s`)
      ref.current?.style.setProperty("--textColor-animation-duration", `${circleAnimationDuration}s`)
      ref.current?.style.setProperty("--textColor-animation-delay", `0s`)

      createRef.current!.style.display = "block"
      createRef.current!.style.transition = "unset"
      createRef.current!.style.opacity = "1"

      donateRef.current!.style.display = "none"
      donateRef.current!.style.transition = "unset"
      donateRef.current!.style.opacity = "0"

      setDisabled(true)
    }

    if (location.pathname === "/contribute") {
      ref.current?.style.setProperty("top", "var(--top-contribute)")
      ref.current?.style.setProperty("left", "var(--left-contribute)")
      ref.current?.style.setProperty("width", "var(--width-contribute)")
      ref.current?.style.setProperty("height", "var(--height-contribute)")
      ref.current?.style.setProperty("border-radius", "0%")
      ref.current?.style.setProperty("border-bottom-left-radius", "50px")
      ref.current?.style.setProperty("background-color", "var(--primary)")
      window.matchMedia("(prefers-color-scheme: dark)").matches ?
        ref.current?.style.setProperty("--color", "var(--text)") :
        ref.current?.style.setProperty("--color", "var(--background-color)")
      ref.current?.style.setProperty("--outline-color", "var(--primary)")
      ref.current?.style.setProperty("--hover-color", "var(--secondary)")
      ref.current?.style.setProperty("--circle-animation-duration", `${circleAnimationDuration}s`)
      ref.current?.style.setProperty("--circle-animation-delay", `${circleAnimationDelay}s`)
      ref.current?.style.setProperty("--textColor-animation-duration", `${circleAnimationDuration}s`)
      ref.current?.style.setProperty("--textColor-animation-delay", `${pageFadeInDuration + pageFadeOutDuration}s`)

      donateRef.current!.style.transition = `opacity ${pageFadeOutDuration}s 0s`
      donateRef.current!.style.opacity = "0"

      setTimeout(() => {
        donateRef.current!.style.display = "none"
        createRef.current!.style.display = "block"
        createRef.current!.style.transition = `opacity ${pageFadeInDuration}s 0s`
      }, pageFadeOutDuration * 1000);

      setTimeout(() => {
        createRef.current!.style.opacity = "1"
      }, (pageFadeOutDuration + circleAnimationDuration) * 1000);

      // HERE
      setTimeout(() => {
        if (location.pathname === "/contribute") {
          ref.current?.style.setProperty("--textColor-animation-duration", ".3s")
          ref.current?.style.setProperty("--textColor-animation-delay", "0s")
        }
      })

      setDisabled(false)
    }

    if (location.pathname === "/create") {
      ref.current?.style.setProperty("top", "var(--top-create)")
      ref.current?.style.setProperty("left", "var(--left-create)")
      ref.current?.style.setProperty("width", "var(--width-create)")
      ref.current?.style.setProperty("height", "var(--height-create)")
      ref.current?.style.setProperty("border-radius", "0%")
      ref.current?.style.setProperty("border-bottom-left-radius", "50px")
      ref.current?.style.setProperty("background-color", "var(--secondary)")
      window.matchMedia("(prefers-color-scheme: dark)").matches ?
        ref.current?.style.setProperty("--color", "var(--text)") :
        ref.current?.style.setProperty("--color", "var(--background-color)")
      window.matchMedia("(prefers-color-scheme: dark)").matches ?
        ref.current?.style.setProperty("--hover-color", "var(--primary-light)") :
        ref.current?.style.setProperty("--hover-color", "var(--primary)")
      ref.current?.style.setProperty("--outline-color", "var(--secondary)")
      ref.current?.style.setProperty("--circle-animation-duration", `${circleAnimationDuration}s`)
      ref.current?.style.setProperty("--circle-animation-delay", `${circleAnimationDelay}s`)
      ref.current?.style.setProperty("--textColor-animation-duration", `${circleAnimationDuration}s`)
      ref.current?.style.setProperty("--textColor-animation-delay", `${pageFadeInDuration + pageFadeOutDuration}s`)

      createRef.current!.style.transition = `opacity ${pageFadeOutDuration}s 0s`
      createRef.current!.style.opacity = "0"

      setTimeout(() => {
        createRef.current!.style.display = "none"
        donateRef.current!.style.display = "block"
        donateRef.current!.style.transition = `opacity ${pageFadeInDuration}s 0s`
      }, pageFadeOutDuration * 1000);

      setTimeout(() => {
        donateRef.current!.style.opacity = "1"
      }, (pageFadeOutDuration + pageFadeInDuration) * 1000);

      setTimeout(() => {
        if (location.pathname === "/create") {
          ref.current?.style.setProperty("--textColor-animation-duration", ".3s")
          ref.current?.style.setProperty("--textColor-animation-delay", "0s")
        }
      })

      setDisabled(false)
    }
  }, [location, circleAnimationDuration, circleAnimationDelay, pageFadeInDuration, pageFadeOutDuration])

  function navigateToNewPage() {
    location.pathname === "/contribute" ?
      navigate("/create", { replace: true }) :
      navigate("/contribute", { replace: true })
  }

  return (
    <motion.button
      className={styles.circleC}
      disabled={disabled}
      ref={ref}
      onClick={navigateToNewPage}
      animate={
        location.pathname === "/" && !window.matchMedia("(prefers-reduced-motion)").matches ? {
          scale: 1.25,
          transition: {
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }
        } : {}
      }
    >
      <span ref={donateRef}>Donate <ArrowSVG /></span>
      <span ref={createRef}>Create <ArrowSVG /></span>
    </motion.button >
  )
}