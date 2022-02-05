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
        <a href="https://github.com/Chris56974/Pethreon/blob/main/contracts/Pethreon.sol"
          target="_blank"
          rel="noreferrer">
          view the smart contract on Github<GithubSVG />
        </a>
      </li>
    </ul>
  )
}
