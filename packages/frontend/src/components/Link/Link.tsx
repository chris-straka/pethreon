import { ReactNode } from "react"
import styles from "./Link.module.scss"

interface LinkProps {
  href: string,
  children: ReactNode
}

export const Link = ({ href, children }: LinkProps) => {
  return <a
    className={styles.link}
    href={href}
    target="_blank"
    rel="noreferrer"
  >{children}</a>
}
