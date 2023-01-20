import { useState, useEffect, useCallback, ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ActionBar, ActionButton, WithdrawModal, UserBalance, UserAddress, Loading, PledgeList, ModalTemplate } from "../../components"
import { PledgeType } from "../../types"
import { Pethreon } from "../../../typechain-types"
import { useWeb3 } from "../../context/Web3Context"
import { WithdrawSVG, CsvSVG } from "../../svgs"
import { utils } from "ethers"

import styles from "./Create.module.scss"

interface CreateProps {
  fadeInDuration: number,
  fadeInDelay: number,
  fadeOutDuration: number,
  fadeOutDelay: number
}

export const Create = (
  { fadeInDuration, fadeInDelay, fadeOutDuration, fadeOutDelay }: CreateProps
) => {
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState("0.0")
  const [pledges, setPledges] = useState<PledgeType[]>([])
  const [modal, setModal] = useState<ReactNode | null>(null)
  const { contract } = useWeb3()
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem("last_page_visited", "create")

    if (!contract) navigate("/")

    async function init() {
      try {
        const balance = await contract.getCreatorBalanceInWei()
        const balanceEther = await utils.formatEther(balance)
        const balanceEtherString = await balanceEther.toString()
        setBalance(balanceEtherString)

        const pledges = await contract.getCreatorPledges()
        setPledges(pledges)

        const address = await contract.signer.getAddress()
        setAddress(address)
      } catch (error) {
        window.alert(error)
        navigate("/")
      }
    }

    init()
  }, [navigate, contract])

  const closeModal = useCallback(() => setModal(null), [])

  const withdrawModal = <WithdrawModal
    closeModal={closeModal}
    setLoading={setLoading}
    setBalance={setBalance} />

  return (
    <>
      {loading && <Loading />}
      <motion.div
        className={styles.createLayout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: fadeInDuration, delay: fadeInDelay } }}
        exit={{ opacity: 0, transition: { duration: fadeOutDuration, delay: fadeOutDelay } }}
      >
        <UserBalance
          className={styles.userBalance}
          balance={balance}
        />
        <UserAddress
          className={styles.userAddress}
          userAccountAddress={address}
        />
        <ActionBar className={`${styles.actionBar} ${styles.creatorActionBar}`}>
          <ActionButton
            className={styles.actionButton}
            onClick={() => setModal(withdrawModal)}>
            Withdraw <WithdrawSVG />
          </ActionButton>

          <ActionButton
            className={styles.actionButton}
            onClick={async () => await extractPledgesToCsv(contract, pledges)}
          >
            Extract to CSV <CsvSVG />
          </ActionButton>
        </ActionBar>
        <PledgeList
          creator
          className={styles.pledgeList}
          textForWhenItsEmpty="Nobody has pledged to you yet..."
          pledges={pledges}
          setBalance={setBalance}
          setLoading={setLoading}
          setPledges={setPledges}
        />
      </motion.div>
      <AnimatePresence
        initial={false}
        mode="wait"
      >
        {modal !== null && <ModalTemplate closeModal={closeModal} children={modal} />}
      </AnimatePresence>
    </>
  )
}

async function extractPledgesToCsv(contract: Pethreon, active?: PledgeType[]) {
  let csv: string = "data:text/csv;charset=utf-8,";
  let creatorAddress: string = ""
  let activePledges: string[][] = []
  let expiredPledges: string[][] = []

  const expired = await contract.getExpiredPledges()

  if (active !== undefined && active.length !== 0) activePledges = processForCsv(active)
  if (expired === undefined) expiredPledges = processForCsv(expired)

  const rows = [
    [`Creator Address: ${creatorAddress}`, "Start date", "End date", "Duration (days)", "Ether per day", "Status"],
    ...activePledges,
    ...expiredPledges
  ]

  csv += rows.map(e => e.join(",")).join("\n")

  let encodedUri = encodeURI(csv)
  window.open(encodedUri)
}

function processForCsv(pledges: PledgeType[]): string[][] {
  return pledges.map(pledge => {
    const contributorAddress = pledge.contributorAddress
    const etherPerPeriod = utils.formatEther(pledge.weiPerPeriod)
    const duration = pledge.duration.toString()
    const startDate = new Date(+pledge.dateCreated * 1000).toDateString()
    const endDate = new Date((+pledge.dateCreated + (+duration * 86400)) * 1000).toDateString()

    let status: string;
    if (pledge.status === 0) status = "ACTIVE"
    else if (pledge.status === 1) status = "CANCELLED"
    else status = "EXPIRED"

    return [contributorAddress, etherPerPeriod, duration, startDate, endDate, status]
  })
}