import { Link } from "../../../../components"
import { GithubSVG } from "../../../../svgs"
import styles from "./Features.module.scss"

interface FeaturesProps {
  className: string
}

export const Features = ({ className }: FeaturesProps) => {
  return (
    <ul className={`${styles.features} ${className}`}>
      <li>Make daily payments to your favourite creators in a trustless and privacy respecting manner</li>
      <li>Only pay ethereum transaction fees,&nbsp;
        <Link href="https://github.com/chris56974/pethreon/blob/main/contracts/Pethreon.sol">view the smart contract on github<GithubSVG /></Link>
      </li>
    </ul>
  )
}
