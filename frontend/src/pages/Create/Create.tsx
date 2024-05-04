import { ethers } from "ethers"
import { motion } from "framer-motion"
import { useEffect, useReducer } from "react"
import { ActionButton, Loading, Nav, PledgeList, UserBalance } from "../../components"
import { usePethreon } from "../../hooks/usePethreon"
import { CsvSVG, WithdrawSVG } from "../../svgs"
import { UIReducer, initialState } from "../Create/reducers/UIReducer"
import { extractPledgesToCsv } from "./utils"

import {
  CIRCLE_ANIMATION_DURATION,
  PAGE_FADE_IN_DURATION,
  PAGE_FADE_OUT_DURATION
} from "../../constants"

import styles from "./Create.module.scss"

export const Create = () => {
  const [{ balance, loading, pledges }, dispatch] = useReducer(UIReducer, initialState)
  const contract = usePethreon()

  useEffect(() => {
    localStorage.setItem("last_page_visited", "create");
    (async () => {
      if (!contract) return

      try {
        const [balanceInWei, pledges] = await Promise.all([
          contract.getCreatorBalanceInWei(),
          contract.getCreatorPledges(),
        ])

        const balance = await ethers.formatEther(balanceInWei).toString();
        dispatch({ type: "setUI", payload: { balance, pledges } })
      } catch (error) {
        console.error(`Create page init error: ${error}`)
        throw new Error(error as any)
      }
    })()
  }, [contract])

  return (
    <motion.main
      className={styles.layout}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: CIRCLE_ANIMATION_DURATION, duration: PAGE_FADE_IN_DURATION }
      }}
      exit={{ opacity: 0, transition: { duration: PAGE_FADE_OUT_DURATION } }}
    >
      <Nav className={styles.nav} to='/contribute'>Donate</Nav>
      {loading ? <Loading /> : <UserBalance className={styles.balance} balance={balance} />}
      <div className={styles.actions}>
        <ActionButton
          className={styles.actionButton}
          onClick={() => console.log("hey")}
          svg={<WithdrawSVG />}
          children="Withdraw"
        />
        <ActionButton
          className={styles.actionButton}
          onClick={async () => await extractPledgesToCsv(contract, pledges)}
          svg={<CsvSVG />}
          children="Extract to CSV"
        />
      </div>
      <PledgeList
        creator
        className={styles.pledges}
        noPledgesText={<span className={styles.noPledgesText}>Nobody has pledged to you yet...</span>}
        pledges={pledges}
        setLoading={() => dispatch({ type: 'setLoading', payload: loading })}
        setNewBalanceAndPledges={() => dispatch({ type: 'setNewPledgesAndBalance', payload: { balance, pledges } })}
      />
    </motion.main>
  )
}
