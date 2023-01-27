import { useEffect, useRef } from "react"
import { motion, AnimationControls, TargetAndTransition, VariantLabels, Transition } from "framer-motion"
import styles from "./Circle.module.scss"

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion)").matches

interface CircleProps {
  /** 
   * The coordinates the circle will start at. 
   * The circles can start in different places depending on what page the user is coming from.
   * The default coordinates are specified in the Circle.module.scss file.
   */
  startingStyles?: { top: string, left: string, width: string, height: string }

  /** 
   * This is how quickly the circle will move from its starting position to its final location
   */
  circleAnimationDuration: number

  /** 
   * This is how long the circle will wait at its starting position before moving to its final position
   */
  circleAnimationDelay: number

  /** 
   * Each className is a different circle with its own values for --top, --left...
   */
  className: string

  // These properties are for framer motion
  animate: boolean | AnimationControls | TargetAndTransition | VariantLabels | undefined
  transition: Transition | undefined
}

export const Circle = ({
  startingStyles,
  circleAnimationDuration,
  circleAnimationDelay,
  className,
  animate,
  transition
}: CircleProps
) => {
  const ref = useRef<HTMLDivElement>(null)

  /** 
   * This overwrites the starting position (which has been inlined in the motion.div) 
   * and moves the circle to its final position
   */
  useEffect(() => {
    const style = ref.current?.style
    if (!style) return

    style.transitionDelay = `${circleAnimationDelay}s`
    style.transitionDuration = `${circleAnimationDuration}s`

    // these variables specify the final position the circle should be in
    style.top = "var(--top)"
    style.left = "var(--left)"
    style.height = "var(--height)"
    style.width = "var(--width)"

  }, [circleAnimationDuration, circleAnimationDelay])

  return (
    <motion.div
      aria-hidden
      className={`${styles.circle} ${className}`}
      style={startingStyles}
      ref={ref}
      animate={animate}
      transition={prefersReducedMotion ? {} : transition}
    />
  )
}