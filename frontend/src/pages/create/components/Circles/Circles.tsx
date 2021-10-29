import { motion } from "framer-motion"

interface CirclesProps {
  animationDelay: number,
  circleAnimationDuration: number
}

export const Circles = ({ animationDelay, circleAnimationDuration }: CirclesProps) => {
  return (
    <>
      <motion.div
        initial={{}}
        transition={{}}
        animate={{}}
        exit={{}}
      />
      <motion.div
        initial={{}}
        transition={{}}
        animate={{}}
        exit={{}}
      />
      <motion.button
        initial={{}}
        transition={{}}
        animate={{}}
        exit={{}}
      />
    </>
  )
}