import { MouseEvent, CSSProperties } from "react"
import { DISCLAIMER } from "../../../messages"
import { Link } from "."

const viewDisclaimer = (e: MouseEvent<HTMLAnchorElement>) => {
  window.confirm(DISCLAIMER)
  e.preventDefault()
}

const linkStyles: CSSProperties = {
  marginRight: '3vw'
}

export const Footer = () => {
  return (
    <footer>
      <Link style={{ ...linkStyles, color: 'var(--disclaimer-link-color)' }} href="#" onClick={viewDisclaimer} target="_self">Disclaimer</Link>
      <Link style={linkStyles} href="https://github.com/chris56974/pethreon#attribution">Attribution</Link>
      <Link style={linkStyles} href="https://github.com/chris56974/pethreon/blob/main/LICENSE">License</Link>
    </footer>
  )
}