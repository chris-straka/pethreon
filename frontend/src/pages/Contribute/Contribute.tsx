import { useState, useEffect, ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { UserBalance, UserAddress, Loading, PledgeList } from "../../components"
import { getContributorBalanceInWei, getContributorPledges } from "../../pethreon"
import { PledgeType, MetamaskError } from "../../utils"
import { ContributorActionBar } from "./components"
import { useEthereum } from "../../hooks/useEthereum"
import { utils } from "ethers"
import styles from "./Contribute.module.scss"

export const Contribute = () => {
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState("0.0")
  const [pledges, setPledges] = useState<PledgeType[]>([])
  const [modal, setModal] = useState<ReactNode | null>(null)
  const ethereum = useEthereum()
  const navigate = useNavigate()

  console.log(modal)

  useEffect(() => {
    localStorage.setItem("last_page_visited", "contribute")
    ethereum.on("accountsChanged", () => navigate("/"))
    async function init() {
      if (window.location.pathname === "/") return
      try {
        const balance = await getContributorBalanceInWei()
        const balanceEther = await utils.formatEther(balance)
        const balanceEtherString = await balanceEther.toString()
        const pledges = await getContributorPledges()
        setBalance(balanceEtherString)
        setPledges(pledges)
      } catch (error) {
        window.alert((error as MetamaskError).message)
        navigate("/")
      }
    }
    init()
  }, [ethereum, navigate])

  return (
    <>
      {loading && <Loading />}
      <div className={styles.contributeLayout} >
        <UserBalance
          className={styles.userBalance}
          balance={balance}
        />
        <UserAddress
          className={styles.userAddress}
          userAccountAddress={ethereum.selectedAddress}
        />
        <ContributorActionBar
          className={styles.contributorActionBar}
          setModal={setModal}
          setBalance={setBalance}
          setLoading={setLoading}
          setPledges={setPledges}
        />
        <PledgeList
          className={styles.pledgeList}
          setBalance={setBalance}
          setLoading={setLoading}
          setPledges={setPledges}
          textForWhenItsEmpty="You need to make a pledge first..."
          pledges={pledges}
        />
      </div>
    </>
  )
}