import { motion } from "framer-motion"

interface CirclesProps {
  animationDelay: number
}

export const Circles = ({ animationDelay }: CirclesProps) => {
  return (
    <>
      <motion.div
        initial={{}}
        transition={{ duration: 6 }}
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