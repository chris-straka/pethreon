import { ReactNode, MouseEventHandler, CSSProperties } from "react"

const linkStyles = {
  transition: 'all 0.15s',
  color: 'var(--link-color)'
}

interface LinkProps {
  href: string,
  children: ReactNode,
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined,
  target?: "_blank" | "_self" | "_parent" | "_top"
  style?: CSSProperties
}

export const Link = ({ href, children, onClick, target, style }: LinkProps) => {
  return <a
    href={href}
    target={target ? target : "_blank"}
    rel="noreferrer"
    onClick={onClick}
    style={{ ...linkStyles, ...style }}
  >{children}</a>
}
