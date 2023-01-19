import { useState, useEffect, ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { UserBalance, UserAddress, Loading, PledgeList, } from "../../components"
import { CreatorActionBar } from "./components/CreatorActionBar"
import { getCreatorBalanceInWei, getCreatorPledges } from "../../pethreon"
import { PledgeType, extractPledgesToCSV, MetamaskError } from "../../utils"
import { useEthereum } from "../../hooks/useEthereum"
import { utils } from "ethers"
import styles from "./Create.module.scss"

export const Create = () => {
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState("0.0")
  const [pledges, setPledges] = useState<PledgeType[]>([])
  const [modal, setModal] = useState<ReactNode | null>(null)
  const navigate = useNavigate()
  const ethereum = useEthereum()

  console.log(modal)

  useEffect(() => {
    localStorage.setItem("last_page_visited", "create")
    ethereum.on("accountsChanged", () => navigate("/"))
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
  }, [ethereum, navigate])

  return (
    <>
      {loading && <Loading />}
      <div className={styles.createLayout}>
        <UserBalance
          className={styles.userBalance}
          balance={balance}
        />
        <UserAddress
          className={styles.userAddress}
          userAccountAddress={ethereum.selectedAddress}
        />
        <CreatorActionBar
          className={styles.creatorActionBar}
          makeCSV={() => extractPledgesToCSV(pledges)}
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
      </div>
    </>
  )
}