import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { CIRCLE_ANIMATION_DURATION, PAGE_FADE_IN_DURATION, PAGE_FADE_OUT_DURATION } from "../../constants"

/** 
 * This backdrop is meant to hide the @web3-onboard account center modal
 * https://onboard.blocknative.com/docs/getting-started/customization
 */
export function Backdrop() {
  const { pathname: path } = useLocation()

  useEffect(() => {

  })

  return (
    <div
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