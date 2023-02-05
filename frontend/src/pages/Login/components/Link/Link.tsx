import { ReactNode, MouseEventHandler, CSSProperties } from "react"
import styles from "./Link.module.scss"

interface LinkProps {
  href: string,
  children: ReactNode,
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined,
  target?: "_blank" | "_self" | "_parent" | "_top",
  style?: CSSProperties
}

export const Link = ({ href, children, onClick, target, style }: LinkProps) => {
  return <a
    href={href}
    target={target ? target : "_blank"}
    rel="noopener noreferrer"
    onClick={onClick}
    style={style}
    className={styles.link}
  >{children}</a>
}
