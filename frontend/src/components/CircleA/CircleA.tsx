import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import styles from "./CircleA.module.scss"

export const CircleA = () => {
  const location = useLocation()
  let top, left, width, height, backgroundColor;

  useEffect(() => {
    if (location.pathname === "/") {
      top = "var(--top-login)"
      left = "var(--left-login)"
      width = "var(--width-login)"
      height = "var(--height-login)"
    }
    if (location.pathname === "/contribute") {
      top = "var(--top-contribute)"
      left = "var(--left-contribute)"
      width = "var(--width-contribute)"
      height = "var(--height-contribute)"
    }
    if (location.pathname === "/create") {
      top = "var(--top-create)"
      left = "var(--left-create)"
      width = "var(--width-create)"
      height = "var(--height-create)"
    }
  }, [location])

  return (
    <motion.div
      className={styles.circleA}
      initial={false}
      animate={{
        top: top,
        left: left,
        width: width,
        height: height,
        backgroundColor: backgroundColor
      }}
    />
  )
}