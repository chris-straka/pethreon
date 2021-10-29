import { PledgeType } from "../../../../utils/EtherTypes"
import { Pledge } from "../../../../components"

interface PledgeListProps {
  className: string
  emptyListTextStyle: string
  pledges: PledgeType[],
}

export const PledgeList = ({ pledges, className, emptyListTextStyle }: PledgeListProps) => {

  return (
    <ul className={className}>
      {pledges.map((pledge: PledgeType) => <Pledge pledge={pledge} creator={true} key={pledge.contributorAddress} />)}
      {pledges.length === 0 ? <li className={emptyListTextStyle}>Nobody has pledged to you yet...</li> : null}
    </ul>
  )
}