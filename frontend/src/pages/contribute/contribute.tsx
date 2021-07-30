import { useState } from "react"
import { Pledges } from "./Pledges/Pledges"
import { ActionBar } from "./ActionBar/ActionBar"
import { Balance } from "../../components/Balance/Balance"
import { Loading } from "../../components/Loading/Loading"
import styles from "./contribute.module.css"

export const ContributePage = () => {
  const [loading, setLoading] = useState(false)

  return <>
    {loading && <Loading />}
    <div className={styles.contributeLayout}>
      <Balance />
      <ActionBar setLoading={setLoading} />
      <Pledges />
    </div >
  </>
}