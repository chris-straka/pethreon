import { useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowSVG } from "../../../svgs/ArrowSVG"
import "./CircleC.colors.scss"
import "./CircleC.position.scss"
import "./CircleC.properties.scss"

interface CircleCProps {
  circleAnimationDuration: number,
  circleAnimationDelay: number,
  pageFadeOutDuration: number,
  pageFadeInDuration: number
}

/** 
 * This is the ugliest component I ever made 
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
    const prefersLightTheme = window.matchMedia("(prefers-color-scheme: light)").matches;
    const buttonRefStyles = buttonRef.current?.style
    const createSpanRefStyles = createSpanRef.current?.style
    const donateSpanRefStyles = donateSpanRef.current?.style
    const lastPageVisited = localStorage.getItem('last_page_visited')
    // WARNING - unlike other circles, I can't run an if-check on my refs

    if (pathname === "/") {
      // Move it to the correct position
      buttonRefStyles?.setProperty("top", "var(--top-login)")
      buttonRefStyles?.setProperty("left", "var(--left-login)")
      buttonRefStyles?.setProperty("width", "var(--width-login)")
      buttonRefStyles?.setProperty("height", "var(--height-login)")

      // Shape it back into a circle and set the color
      buttonRefStyles?.setProperty("border-radius", "50%")
      buttonRefStyles?.setProperty("background-color", "var(--circle-c-login-background-color)")

      // Make sure the circle moves this quickly
      buttonRefStyles?.setProperty("--circle-animation-duration", `${circleAnimationDuration}s`)
      buttonRefStyles?.setProperty("--circle-animation-delay", `${circleAnimationDelay}s`)

      // Make the text transparent again
      buttonRefStyles?.setProperty("color", "transparent")
      buttonRefStyles?.setProperty("fill", "transparent")

      // Make sure the text animates this quickly
      buttonRefStyles?.setProperty("--text-color-animation-duration", `${circleAnimationDuration}s`)
      buttonRefStyles?.setProperty("--text-color-animation-delay", "0s")

      // Make sure it's disabled so it can't receive focus (it's meant to be decoration again)
      buttonRef.current!.disabled = true

      // Make sure that it's ready to display the correct information for next time
      if (lastPageVisited === "contribute") {
        donateSpanRefStyles!.display = "block"
        donateSpanRefStyles!.transition = "unset"
        donateSpanRefStyles!.opacity = "1"

        createSpanRefStyles!.display = "none"
        createSpanRefStyles!.transition = "unset"
        createSpanRefStyles!.opacity = "0"
      }

      if (lastPageVisited === "create") {
        createSpanRefStyles!.display = "block"
        createSpanRefStyles!.transition = "unset"
        createSpanRefStyles!.opacity = "1"

        donateSpanRefStyles!.display = "none"
        donateSpanRefStyles!.transition = "unset"
        donateSpanRefStyles!.opacity = "0"
      }

    }

    if (pathname === "/contribute") {
      // Move it to the correct position
      buttonRefStyles?.setProperty("top", "var(--top-contribute)")
      buttonRefStyles?.setProperty("left", "var(--left-contribute)")
      buttonRefStyles?.setProperty("width", "var(--width-contribute)")
      buttonRefStyles?.setProperty("height", "var(--height-contribute)")

      // Make sure it's no longer a circle but a button
      buttonRefStyles?.setProperty("border-radius", "0%")
      buttonRefStyles?.setProperty("border-bottom-left-radius", "50px")

      // Make sure the button has the correct color 
      buttonRefStyles?.setProperty("background-color", "var(--circle-c-contributor-background-color)")
      buttonRefStyles?.setProperty("--outline-color", "var(--circle-c-contributor-background-color)")

      // Make sure the button animates this quickly
      buttonRefStyles?.setProperty("--circle-animation-duration", `${circleAnimationDuration}s`)
      buttonRefStyles?.setProperty("--circle-animation-delay", `${circleAnimationDelay}s`)

      // Make sure the text colors are coorect
      buttonRefStyles?.setProperty("--hover-text-color", "var(--secondary-color)")

      // Make sure the text animates this quickly
      buttonRefStyles?.setProperty("--text-color-animation-duration", `${circleAnimationDuration}s`)
      buttonRefStyles?.setProperty("--text-color-animation-delay", `${pageFadeInDuration + pageFadeOutDuration}s`)

      donateSpanRefStyles!.transition = `opacity ${pageFadeOutDuration}s 0s`
      donateSpanRefStyles!.opacity = "0"

      prefersLightTheme ?
        buttonRefStyles?.setProperty("--color", "var(--background-color)") :
        buttonRefStyles?.setProperty("--color", "var(--text-color)")

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
          buttonRefStyles!.setProperty("--text-color-animation-duration", ".3s")
          buttonRefStyles!.setProperty("--text-color-animation-delay", "0s")
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
      buttonRefStyles?.setProperty("background-color", "var(--circle-c-creator-background-color)")

      buttonRefStyles?.setProperty("--outline-color", "var(--secondary-color)")
      buttonRefStyles?.setProperty("--circle-animation-duration", `${circleAnimationDuration}s`)
      buttonRefStyles?.setProperty("--circle-animation-delay", `${circleAnimationDelay}s`)
      buttonRefStyles?.setProperty("--text-color-animation-duration", `${circleAnimationDuration}s`)
      buttonRefStyles?.setProperty("--text-color-animation-delay", `${pageFadeInDuration + pageFadeOutDuration}s`)

      createSpanRefStyles!.transition = `opacity ${pageFadeOutDuration}s 0s`
      createSpanRefStyles!.opacity = "0"

      prefersLightTheme ?
        buttonRefStyles?.setProperty("--color", "var(--background-color)") :
        buttonRefStyles?.setProperty("--color", "var(--text-color)")

      prefersLightTheme ?
        buttonRefStyles?.setProperty("--hover-text-color", "var(--primary-color)") :
        buttonRefStyles?.setProperty("--hover-text-color", "var(--primary-light-color)")

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
          buttonRefStyles?.setProperty("--text-color-animation-duration", ".3s")
          buttonRefStyles?.setProperty("--text-color-animation-delay", "0s")
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
      className="circleC"
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