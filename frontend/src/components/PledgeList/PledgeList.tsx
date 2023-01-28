import { Dispatch, SetStateAction } from "react"
import { Pledge } from "../Pledge/Pledge"
import { PledgeType } from "../../types"
import styles from "./PledgeList.module.scss"

interface PledgeListProps {
  className?: string,
  creator?: boolean,
  pledges: PledgeType[],
  textForWhenItsEmpty: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setBalance: Dispatch<SetStateAction<string>>,
  setPledges: Dispatch<SetStateAction<PledgeType[]>>
}

export const PledgeList = ({
  creator = false, className, pledges, textForWhenItsEmpty,
  setLoading, setBalance, setPledges
}: PledgeListProps
) => {
  return (
    <ul className={`${pledges.length === 0 ? styles.emptyPledgeBox : styles.pledgeBox} ${className}`}
    >
      {pledges
        .map((pledge: PledgeType) => <Pledge
          pledge={pledge}
          creator={creator}
          setLoading={setLoading}
          setBalance={setBalance}
          setPledges={setPledges}
          key={creator ? pledge.contributorAddress : pledge.creatorAddress}
        />)
      }
      {pledges.length === 0 ? <li className={styles.emptyPledgeText}>{textForWhenItsEmpty}</li> : null}
    </ul>
  )
}