import { useState } from "react"
import { Loading } from "../../components/Loading/Loading"
import styles from "./create.module.css"

export const CreatePage = () => {
  const [loading, setLoading] = useState(false)
  console.log(setLoading)
  return <>
    {loading && <Loading />}
    <div className={styles.contributeLayout}>
      <h1 className={styles.userBalance}>$0.00</h1>
      <button className={styles.pledgeButton}>Make Pledge</button>
    </div >
  </>
}