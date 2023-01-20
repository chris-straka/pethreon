import { ReactNode, MouseEventHandler } from "react"
import styles from "./Link.module.scss"

interface LinkProps {
  href: string,
  children: ReactNode,
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined,
  target?: "_blank" | "_self" | "_parent" | "_top"
}

export const Link = ({ href, children, onClick, target }: LinkProps) => {
  return <a
    className={styles.link}
    href={href}
    target={target ? target : "_blank"}
    rel="noreferrer"
    onClick={onClick}
  >{children}</a>
}
