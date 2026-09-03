import { ethers } from "ethers"
import { motion } from "motion/react"
import { useCallback, useEffect, useReducer } from "react"
import { ActionButton, Nav, PledgeList, UserBalance } from "../../components"
import { usePethreon } from "../../hooks/usePethreon"
import { CsvSVG, WithdrawSVG } from "../../svgs"
import { UIReducer, initialState } from "../../reducers/UIReducer"
import type { MetamaskError, PledgeType } from "../../types"
import { extractPledgesToCsv } from "./utils"

import {
  CIRCLE_ANIMATION_DURATION,
  PAGE_FADE_IN_DURATION,
  PAGE_FADE_OUT_DURATION
} from "../../constants"

import styles from "./Create.module.css"

export const Create = () => {
  const [{ balance, isLoading, pledges }, dispatch] = useReducer(UIReducer, initialState)
  const contract = usePethreon()

  const refresh = useCallback(async () => {
    if (!contract) return

    const [balanceInWei, pledges] = await Promise.all([
      contract.getCreatorBalanceInWei(),
      contract.getCreatorPledges(),
    ])

    dispatch({
      type: "setUI",
      payload: { balance: ethers.formatEther(balanceInWei), pledges }
    })
  }, [contract])

  useEffect(() => {
    localStorage.setItem("last_page_visited", "create");
    // Errors are reported, not rethrown: a throw inside this async IIFE only
    // produced an unhandled rejection that no boundary could catch.
    refresh().catch(error => console.error("Create page init error:", error))
  }, [refresh])

  // Previously `onClick={() => console.log("hey")}` -- the button did nothing.
  const withdraw = async () => {
    if (!contract) return window.alert("Contract is not yet ready")
    if (Number(balance) <= 0) return window.alert("There is nothing to withdraw")

    dispatch({ type: "setIsLoading", payload: true })
    try {
      const transaction = await contract.creatorWithdraw()
      await transaction.wait()
      await refresh()
    } catch (error) {
      dispatch({ type: "setIsLoading", payload: false })
      window.alert(`Error: ${(error as MetamaskError).message ?? error}`)
    }
  }

  const setLoading = (loading: boolean) =>
    dispatch({ type: "setIsLoading", payload: loading })

  const setNewBalanceAndPledges = (balance: string, pledges: PledgeType[]) =>
    dispatch({ type: "setNewPledgesAndBalance", payload: { balance, pledges } })

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
      <UserBalance className={styles.balance} balance={balance} loading={isLoading} />
      <div className={styles.actions}>
        <ActionButton
          className={styles.actionButton}
          onClick={withdraw}
          svg={<WithdrawSVG />}
        >Withdraw</ActionButton>
        <ActionButton
          className={styles.actionButton}
          onClick={() => extractPledgesToCsv(contract, pledges).catch(
            error => window.alert(`Could not build the CSV: ${error}`)
          )}
          svg={<CsvSVG />}
        >Extract to CSV</ActionButton>
      </div>
      <PledgeList
        creator
        className={styles.pledges}
        noPledgesText={<span className={styles.noPledgesText}>Nobody has pledged to you yet...</span>}
        pledges={pledges}
        setLoading={setLoading}
        setNewBalanceAndPledges={setNewBalanceAndPledges}
      />
    </motion.main>
  )
}
