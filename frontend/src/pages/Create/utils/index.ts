import { ethers } from "ethers"
import type { Pethreon, PledgeType } from "../../../types";

/**
 * This grabs all the pledges that have been made to this creator (expired or active)
 * And compiles them to a CSV file they can download
 * 
 * @param contract Pethreon contract
 * @param active A list of what pledges (subscriptions) are still active
 * @returns 
 */
export async function extractPledgesToCsv(contract: Pethreon | null, active?: PledgeType[]) {
  if (!contract) throw new Error("Couldn't find contract")

  let csv: string = "data:text/csv;charset=utf-8,";
  let activePledges: string[][] = []
  let expiredPledges: string[][] = []

  const expired = await contract.getExpiredPledges()

  if (active !== undefined && active.length !== 0) activePledges = processForCsv(active)
  if (expired === undefined) expiredPledges = processForCsv(expired)

  const rows = [
    [`Contract Address: ${contract.getAddress()}`, "Start date", "End date", "Duration (days)", "Ether per day", "Status"],
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
    const etherPerPeriod = ethers.formatEther(pledge.weiPerPeriod)
    const duration = pledge.duration.toString()

    const startDate = new Date(Number(pledge.dateCreated) * 1000).toDateString()
    const endDate = new Date((Number(pledge.dateCreated) + (+duration * 86400)) * 1000).toDateString()

    let status: string;
    if (Number(pledge.status) === 0) status = "ACTIVE"
    else if (Number(pledge.status) === 1) status = "CANCELLED"
    else status = "EXPIRED"

    return [contributorAddress, etherPerPeriod, duration, startDate, endDate, status]
  })
}