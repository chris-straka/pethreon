import { useEffect } from "react"
import { Location } from "react-router-dom"
import { motion, useAnimationControls } from "framer-motion"
import { CIRCLE_ANIMATION_DURATION, PAGE_FADE_IN_DURATION, PAGE_FADE_OUT_DURATION } from "../../constants"

interface PethreonProps {
  location: Location
}

/** 
 * This backdrop is meant to animate the @web3-onboard account modal
 * https://onboard.blocknative.com/docs/getting-started/customization
 */
export function Backdrop({ location }: PethreonProps) {
  const controls = useAnimationControls()
  const path = location.pathname

  useEffect(() => {
    if (path === "/") {
      (async () => {
        controls.start({
          opacity: 1,
          display: 'block',
          zIndex: 2,
          transition: {}
        })
      })()
    }

    if (!(path === "/")) {
      (async () => {
        controls.start({
          opacity: 0,
          display: 'none',
          zIndex: -20,
          transition: {
            delay: PAGE_FADE_OUT_DURATION + CIRCLE_ANIMATION_DURATION,
            duration: PAGE_FADE_IN_DURATION
          }
        })
      })()
    }
  }, [controls, path])

  // The backdrop needs to go in front of the account-center but behind the circles 
  // account-center is -3, circles is -1
  return (
    <motion.div
      animate={controls}
      style={{
        position: 'fixed',
        width: '100%',
        minHeight: '100%',
        top: 0,
        left: 0,
        backgroundColor: "var(--background-color)",
        zIndex: 2
      }}
    />
  )
}