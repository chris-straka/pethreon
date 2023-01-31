import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { motion, useAnimationControls } from "framer-motion"
import { ArrowSVG } from "../../svgs/ArrowSVG"
import { defaultCircleStyles, defaultTextStyles, aVariants, bVariants, cVariants } from "./variants"

import aStyles from "./scss/CircleA.module.scss"
import bStyles from "./scss/CircleB.module.scss"
import cStyles from "./scss/CircleC.module.scss"

/** 
 * Three circles (two divs and a button)
 */
export const Circles = () => {
  const { pathname: path } = useLocation()
  const navigate = useNavigate()
  const a = useAnimationControls()
  const b = useAnimationControls()
  const c = useAnimationControls()
  const cCreate = useAnimationControls()
  const cDonate = useAnimationControls()

  useEffect(() => {
    if (path === "/") {
      async function animate() {
        await Promise.all([a.start("login"), b.start("login"), c.start("login")])
        await Promise.all([a.start("idle"), b.start("idle"), c.start("idle")])
      }
      animate()
    }

    if (path === "/contribute") {
      async function animate() {
        await Promise.all([a.start("contribute"), b.start("contribute"), c.start("contribute")])
        await Promise.all([a.start("idle"), b.start("idle")])
      }
      animate()
    }

    if (path === "/create") {
      async function animate() {
        await Promise.all([a.start("create"), b.start("create"), c.start("create")])
        await Promise.all([a.start("idle"), b.start("idle")])
      }
      animate()
    }
  }, [a, b, c, path])

  const navigateToNewPage = () => {
    path === "/contribute" ?
      navigate("/create", { replace: true }) :
      navigate("/contribute", { replace: true })
  }

  return (
    <>
      <motion.div
        aria-hidden="true"
        className={aStyles.circleA}
        style={defaultCircleStyles}
        variants={aVariants}
        animate={a}
      />
      <motion.div
        aria-hidden="true"
        className={bStyles.circleB}
        style={defaultCircleStyles}
        variants={bVariants}
        animate={b}
      />
      <motion.button
        aria-hidden={path === "/" ? "true" : "false"}
        className={cStyles.circleC}
        onClick={navigateToNewPage}
        style={defaultCircleStyles}
        variants={cVariants}
        animate={c}
      >
        <motion.span
          style={defaultTextStyles}
          animate={cDonate}
        >Donate <ArrowSVG /></motion.span>
        <motion.span
          style={defaultTextStyles}
          animate={cCreate}
        >Create <ArrowSVG /></motion.span>
      </motion.button>
    </>
  )
}