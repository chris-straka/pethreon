import { AnimatedText } from "../AnimatedText/AnimatedText"
import styles from "./Loading.module.css"

export const Loading = () => {
  return <AnimatedText text="Loading..." animatedTextCssClass={styles.loading} />
}