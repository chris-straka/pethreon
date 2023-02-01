import { motion } from "framer-motion"
import { ReactNode } from "react"
import { Link, To } from "react-router-dom"

import styles from "./Nav.module.scss"

interface NavProps {
  className: string
  to: To
  children: ReactNode
}

export const Nav = ({ className, to = "/", children }: NavProps) => {
  return (
    <nav className={`${styles.nav} ${className}`}>
      <Link to={to} className={styles.link}>
        <motion.span style={{ color: 'inherit', fill: 'inherit' }}>
          {children}
        </motion.span>
      </Link>
    </nav>
  )
}
