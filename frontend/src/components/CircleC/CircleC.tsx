import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowSVG } from "../../svgs"
import styles from "./CircleC.module.scss"

export const CircleC = () => {
  const location = useLocation()
  const [animation, setAnimation] = useState({})

  useEffect(() => {
    if (location.pathname === "/") {
      setAnimation({
        top: "var(--top-login)",
        left: "var(--left-login)",
        width: "var(--width-login)",
        height: "var(--height-login)",
        backgroundColor: "var(--primary)",
      })
    }
    if (location.pathname === "/contribute") {
      setAnimation({
        top: "var(--top-contribute)",
        left: "var(--left-contribute)",
        width: "var(--width-contribute)",
        height: "var(--height-contribute)",
        backgroundColor: "var(--secondary)",
        borderRadius: "0px",
        borderBottomLeftRadius: "40px",
      })
    }
    if (location.pathname === "/create") {
      setAnimation({
        top: "var(--top-create)",
        left: "var(--left-create)",
        width: "var(--width-create)",
        height: "var(--height-create)",
        backgroundColor: "var(--secondary)"
      })
    }
  }, [location])

  return (
    <motion.button
      className={styles.circleC}
      initial={{
        top: "var(--top-login)",
        left: "var(--left-login)",
        width: "var(--width-login)",
        height: "var(--height-login)",
        backgroundColor: "var(--primary)",
        borderRadius: "999px"
      }}
      animate={animation}
    >{location.pathname === "/" ? null : < ArrowSVG />}</motion.button>
  )
}