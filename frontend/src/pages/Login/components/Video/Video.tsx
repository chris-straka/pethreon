import mp4 from "../../../../assets/money.mp4"
import webm from "../../../../assets/money.webm"
import styles from "./Video.module.scss"

export const Video = () => {
  return (
    <video className={styles.video} muted autoPlay preload="true" tabIndex={-1}>
      <source src={mp4} type="video/mp4" />
      <source src={webm} type="video/webm" />
      Your browser does not support webm or mp4 videos.
    </video>
  )
}