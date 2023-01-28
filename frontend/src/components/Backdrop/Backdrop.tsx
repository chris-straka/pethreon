import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom";
import { PAGE_FADE_IN_DURATION, CIRCLE_ANIMATION_DURATION, PAGE_FADE_OUT_DURATION } from "../../constants";
import styles from "./Backdrop.module.scss"

const backdropAnimationDelay = PAGE_FADE_OUT_DURATION
const backdropAnimationDuration = CIRCLE_ANIMATION_DURATION + PAGE_FADE_IN_DURATION

/** 
 * This backdrop is meant to hide blocknative's onboard web3 account center modal on my login page
 * There was no way to set the opacity on it, only the z-index so I put it behind a modal
 * https://onboard.blocknative.com/docs/getting-started/customization
 */
export function Backdrop() {
  const divRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation()

  useEffect(() => {
    const refStyle = divRef.current?.style
    if (!refStyle) return

    refStyle.transitionDuration = `${backdropAnimationDuration}s`
    refStyle.transitionDelay = `${backdropAnimationDelay}s`

    if (pathname === "/") {
      refStyle.opacity = "1"
      refStyle.display = "block"
    }

    if (pathname === "/contribute") {
      refStyle.opacity = "0"
      setTimeout(() => {
        refStyle.display = "none"
      }, 1000 * (backdropAnimationDelay + backdropAnimationDuration))
    }

    if (pathname === "/create") {
      refStyle.opacity = "0"
      setTimeout(() => {
        refStyle.display = "none"
      }, 1000 * (backdropAnimationDelay + backdropAnimationDuration))
    }

  }, [pathname])

  return <div id={styles.backdrop} ref={divRef} />
}