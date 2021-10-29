import { getExpiredPledges } from "../pethreon"
import { PledgeType, PledgeStatus } from "./EtherTypes";
import { utils } from "ethers"

export const extractPledgesToCSV = async (active?: PledgeType[]) => {
  let csv: string = "data:text/csv;charset=utf-8,";
  let creatorAddress: string = ""
  let activePledges: string[][] = []
  let expiredPledges: string[][] = []

  const expired = await getExpiredPledges()

  if (active !== undefined && active !== []) {
    activePledges = processForCSV(active)
  }

  if (expired === undefined && expired !== []) {
    expiredPledges = processForCSV(expired)
  }

  const rows = [
    [`Creator Address: ${creatorAddress}`, "Start date", "End date", "Duration (days)", "Ether per day", "Status"],
    ...activePledges,
    ...expiredPledges
  ]

  csv += rows.map(e => e.join(",")).join("\n")

  let encodedUri = encodeURI(csv)
  window.open(encodedUri)
}

const processForCSV = (pledges: PledgeType[]): string[][] => {
  return pledges.map(pledge => {
    const contributorAddress = pledge.contributorAddress
    const etherPerPeriod = utils.formatEther(pledge.weiPerPeriod)
    const duration = pledge.duration.toString()
    const startDate = new Date(+pledge.dateCreated * 1000).toDateString()
    const endDate = new Date((+pledge.dateCreated + (+duration * 86400)) * 1000).toDateString()

    let status: string;
    if (pledge.status === PledgeStatus.ACTIVE) status = "ACTIVE"
    else if (pledge.status === PledgeStatus.CANCELLED) status = "CANCELLED"
    else status = "EXPIRED"

    return [contributorAddress, etherPerPeriod, duration, startDate, endDate, status]
  })
}