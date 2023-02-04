import { CSSProperties } from "react"
import { Link } from "."

const featureStyles: CSSProperties = {
  fontSize: 'var(--font-size-base)',
  lineHeight: '1.5',
  marginBottom: '1.4em',
}

export const Features = () => {
  return (
    <>
      <p style={featureStyles}>Make daily payments to your favourite creators in a trustless and privacy respecting manner.</p>
      <p style={featureStyles}>You only pay for the gas it takes to mine your transaction on ethereum. You can find the <Link href="https://github.com/chris56974/pethreon">source code on github</Link>.</p>
    </>
  )
}
