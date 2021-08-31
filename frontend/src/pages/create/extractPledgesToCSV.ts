import { PledgeType } from "../../pethreon"
import { PledgeStatus } from "../../pethreon"
import { utils } from "ethers"

export const extractPledgesToCSV = async (pledges: PledgeType[]) => {
  const creatorAddress = pledges[0].creatorAddress

  const pledgesForCSV = pledges.map(pledge => {
    const contributorAddress = pledge.contributorAddress
    const etherPerPeriod = utils.formatEther(pledge.weiPerPeriod)
    const duration = pledge.duration.toString()
    const startDate = new Date(+pledge.dateCreated * 1000).toDateString()
    const endDate = new Date((+pledge.dateCreated + (+duration * 86400)) * 1000).toDateString()
    const cancelled = pledge.status === PledgeStatus.CANCELLED ? true : false

    return [contributorAddress, startDate, endDate, duration, etherPerPeriod, cancelled];
  })

  const rows = [
    [`Addresses that Pledged to ${creatorAddress}`, "Start date", "End date", "Duration (days)", "Ether per day", "Cancelled"],
    ...pledgesForCSV
  ]

  let csvContent = "data:text/csv;charset=utf-8,"
    + rows.map(e => e.join(",")).join("\n")

  let encodedUri = encodeURI(csvContent)

  window.open(encodedUri)
}