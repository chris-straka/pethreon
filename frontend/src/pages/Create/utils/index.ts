import { ethers } from "ethers"
import type { Pethreon, PledgeType } from "../../../types";

const CSV_HEADER = [
  "Contributor address",
  "Ether per day",
  "Duration (days)",
  "Start date",
  "End date",
  "Status",
]

/**
 * Grabs every pledge made to this creator (expired and active) and downloads
 * them as a CSV.
 *
 * @param contract Pethreon contract
 * @param active A list of what pledges (subscriptions) are still active
 */
export async function extractPledgesToCsv(contract: Pethreon | null, active?: PledgeType[]) {
  if (!contract) throw new Error("Couldn't find contract")

  const [contractAddress, expired] = await Promise.all([
    contract.getAddress(),      // a promise: awaiting it avoids "[object Promise]"
    contract.getExpiredPledges(),
  ])

  // Both guards used to be wrong: `expired === undefined` meant expired pledges
  // were never written out at all.
  const activePledges = active?.length ? processForCsv(active) : []
  const expiredPledges = expired?.length ? processForCsv(expired) : []

  const rows = [
    [`Contract Address: ${contractAddress}`],
    CSV_HEADER,   // column order now matches what processForCsv emits
    ...activePledges,
    ...expiredPledges,
  ]

  const csv = "data:text/csv;charset=utf-8," +
    rows.map(row => row.map(escapeCsvCell).join(",")).join("\n")

  window.open(encodeURI(csv))
}

/** Quote cells containing a comma, quote or newline, per RFC 4180. */
export function escapeCsvCell(cell: string): string {
  return /[",\n]/.test(cell) ? `"${cell.replace(/"/g, '""')}"` : cell
}

export const STATUS_LABELS = ["ACTIVE", "CANCELLED", "EXPIRED"] as const

export function processForCsv(pledges: PledgeType[]): string[][] {
  return pledges.map(pledge => {
    const duration = Number(pledge.duration)
    const createdMs = Number(pledge.dateCreated) * 1000

    return [
      pledge.contributorAddress,
      ethers.formatEther(pledge.weiPerPeriod),
      duration.toString(),
      new Date(createdMs).toDateString(),
      new Date(createdMs + duration * 86400 * 1000).toDateString(),
      STATUS_LABELS[Number(pledge.status)] ?? "EXPIRED",
    ]
  })
}
