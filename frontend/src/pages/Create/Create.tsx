import { useState, useEffect, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { UserBalance, UserAddress, Loading, PledgeList, ModalTemplate } from "../../components"
import { CreatorActionBar } from "./components/CreatorActionBar"
import { getCreatorBalanceInWei, getCreatorPledges } from "../../pethreon"
import { PledgeType, MetamaskError } from "../../utils"
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
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState("0.0")
  const [pledges, setPledges] = useState<PledgeType[]>([])
  const [modal, setModal] = useState<ReactNode | null>(null)
  const navigate = useNavigate()

  console.log(modal)

  useEffect(() => {
    localStorage.setItem("last_page_visited", "create")
    // ethereum.on("accountsChanged", () => navigate("/"))
    async function init() {
      if (window.location.pathname === "/") return
      try {
        let balance = await getCreatorBalanceInWei()
        let balanceEther = await utils.formatEther(balance)
        let balanceEtherString = await balanceEther.toString()
        let pledges = await getCreatorPledges()
        setBalance(balanceEtherString)
        setPledges(pledges)
      } catch (error) {
        window.alert((error as MetamaskError).message)
        navigate("/")
        window.alert(`${error}`)
        navigate("/")
      }
    }
    init()
  }, [navigate])

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
          userAccountAddress={"USER ETHEREUM ADDRESS"}
        />
        <CreatorActionBar
          className={styles.creatorActionBar}
          pledges={pledges}
          setModal={setModal}
          setBalance={setBalance}
          setLoading={setLoading}
        />
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
        {modal !== null && <ModalTemplate closeModal={() => setModal(null)} children={modal} />}
      </AnimatePresence>
    </>
  )
}