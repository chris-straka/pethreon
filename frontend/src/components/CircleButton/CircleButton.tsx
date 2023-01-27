import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowSVG } from "../../svgs";
import styles from "./CircleButton.module.scss"

/** 
 * See Circle for information
 */
interface CircleButtonProps {
  startingStyles?: { top: string, left: string, width: string, height: string, fill: string, color: string }
  circleAnimationDuration: number,
  circleAnimationDelay: number,
  className: string,
  pageFadeOutDuration: number,
  pageFadeInDuration: number
}

export const CircleButton = ({
  startingStyles,
  circleAnimationDuration,
  circleAnimationDelay,
  className,
  pageFadeOutDuration,
  pageFadeInDuration,
}: CircleButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const createSpanRef = useRef<HTMLSpanElement>(null);
  const donateSpanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const buttonStyles = buttonRef.current!.style
    const createStyles = createSpanRef.current!.style
    const donateStyles = donateSpanRef.current!.style

    buttonStyles.transitionDelay = `${circleAnimationDelay}s`
    createStyles.transitionDelay = `${circleAnimationDelay}s`
    donateStyles.transitionDelay = `${circleAnimationDelay}s`
    buttonStyles.transitionDuration = `${circleAnimationDuration}s`
    createStyles.transitionDuration = `${circleAnimationDuration}s`
    buttonStyles.transitionDuration = `${circleAnimationDuration}s`

    // 
    buttonStyles.top = "var(--top)"
    buttonStyles.left = "var(--left)"
    buttonStyles.height = "var(--height)"
    buttonStyles.width = "var(--width)"

  }, [circleAnimationDelay, circleAnimationDuration])

  return (
    <motion.button
      className={`${styles.circleButton} ${className}`}
      ref={buttonRef}
      style={startingStyles}
    >
      <span ref={donateSpanRef}>Donate <ArrowSVG /></span>
      <span ref={createSpanRef}>Create <ArrowSVG /></span>
    </motion.button>
  )
}