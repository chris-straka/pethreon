import { PledgeType } from "../../../../utils";
import { Pledge } from "../../../../components/Pledge/Pledge"

interface PledgeListProps {
  className: string,
  emptyListTextStyles: string,
  pledges: PledgeType[]
}

export const PledgeList = ({ className, pledges, emptyListTextStyles }: PledgeListProps) => {
  return (
    <ul className={className}>
      {
        pledges.map((pledge: PledgeType) => (
          <Pledge pledge={pledge} key={pledge.creatorAddress} />
        ))
      }
      {pledges.length === 0 ? <li className={emptyListTextStyles}>You need to make a pledge first...</li> : null}
    </ul>
  )
}