import { Link } from "./Link/Link"

const featureStyles = {
  lineHeight: "1.5",
  marginBottom: "1.4em",
}

const p1Msg = "Make daily payments to your favourite creators in a trustless and privacy respecting manner."
const p2Msg = `You only pay for the gas it takes to mine your transaction on ethereum. You can find the `

interface FeaturesProps {
  className: string
}

export const Features = ({ className }: FeaturesProps) => {
  return (
    <>
      <p className={className} style={featureStyles}>{p1Msg}</p>
      <p className={className} style={featureStyles}>{p2Msg}<Link
        href="https://github.com/chris56974/pethreon"
      >source code on github</Link>.</p>
    </>
  )
}
