import { motion, TargetAndTransition, AnimationControls, VariantLabels } from "framer-motion"
import { useLocation, useNavigate } from "react-router-dom"
import { createSpanVariants, donateSpanVariants } from "./spans"
import { variants } from "./button"
import { ArrowSVG } from "../../../svgs"

import styles from "./CircleC.module.scss"

interface CircleCProps {
  buttonAnimate: boolean | TargetAndTransition | AnimationControls | VariantLabels | undefined
  createAnimate: boolean | TargetAndTransition | AnimationControls | VariantLabels | undefined
  donateAnimate: boolean | TargetAndTransition | AnimationControls | VariantLabels | undefined
}

export const CircleC = ({ buttonAnimate, createAnimate, donateAnimate }: CircleCProps) => {
  const { pathname: path } = useLocation()
  const navigate = useNavigate()

  const navigateToNewPage = () => {
    path === "/contribute" ?
      navigate("/create", { replace: true }) :
      navigate("/contribute", { replace: true })
  }

  return (
    <motion.button
      aria-hidden={path === "/" ? "true" : "false"}
      tabIndex={path === "/" ? -1 : 0}

      className={styles.circleC}
      onClick={navigateToNewPage}
      variants={variants}
      animate={buttonAnimate}
      style={{
        x: "var(--x-login)",
        y: "var(--y-login)",
        width: "var(--width-login)",
        height: "var(--height-login)",
        backgroundColor: "var(--background-color-login)",
        borderRadius: '50%'
      }}
    >
      <motion.span variants={donateSpanVariants} animate={donateAnimate} style={{ display: 'none', opacity: 0 }}>Donate <ArrowSVG /></motion.span>
      <motion.span variants={createSpanVariants} animate={createAnimate} style={{ display: 'none', opacity: 0 }}>Create <ArrowSVG /></motion.span>
    </motion.button>
  )
}
