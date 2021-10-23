import { motion } from "framer-motion"

interface CirclesProps {
  animationDelay: number
}

const init = {
  backgroundColor: "var(--primary)",
  x: "var(--X-login)",
  y: "var(--Y-login)"
}

export const Circles = ({ animationDelay }: CirclesProps) => {
  return (
    <>
      <motion.div
        initial={init}
        animate={{
          scale: 1.55,
          x: "2vw",
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.1,
        }}
      />

      <motion.div
        initial={init}
        animate={{
          x: "2vw",
          y: "2vw"
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.1
        }}
      />

      <motion.button
        initial={init}
      />

    </>
  )
}