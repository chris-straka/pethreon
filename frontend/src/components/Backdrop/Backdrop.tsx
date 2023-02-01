import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { motion, useAnimationControls } from "framer-motion"
import { CIRCLE_ANIMATION_DURATION, PAGE_FADE_IN_DURATION, PAGE_FADE_OUT_DURATION } from "../../constants"

/** 
 * This backdrop is meant to hide the @web3-onboard account center modal
 * https://onboard.blocknative.com/docs/getting-started/customization
 */
export function Backdrop() {
  const { pathname: path } = useLocation()
  const controls = useAnimationControls()

  useEffect(() => {
    if (path === "/") {
      async function animate() {
        controls.start({
          opacity: 1,
          display: 'block',
          transition: {}
        })
      }
      animate()
    }

    if (path === "/contribute") {
      async function animate() {
        controls.start({
          opacity: 0,
          display: 'none',
          transition: {
            delay: PAGE_FADE_OUT_DURATION + CIRCLE_ANIMATION_DURATION,
            duration: PAGE_FADE_IN_DURATION
          }
        })
      }
      animate()
    }

    if (path === "/create") {
      async function animate() {
        controls.start({
          opacity: 0,
          display: 'none',
          transition: {
            delay: PAGE_FADE_OUT_DURATION + CIRCLE_ANIMATION_DURATION,
            duration: PAGE_FADE_IN_DURATION
          }
        })
      }
      animate()
    }
  }, [controls, path])

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
      }}
    />
  )
}