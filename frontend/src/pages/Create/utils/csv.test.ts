import { describe, expect, it } from "vitest"
import { escapeCsvCell, processForCsv } from "."
import type { PledgeType } from "../../../types"

/** 2021-05-21T00:00:00Z, the epoch used in the contract's comments. */
const CREATED = 1621555200n

const pledge = (over: Partial<PledgeType> = {}) => ({
  creatorAddress: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  contributorAddress: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  weiPerPeriod: 10n ** 18n,
  duration: 3n,
  dateCreated: CREATED,
  periodExpires: 3n,
  status: 0n,
  ...over,
}) as unknown as PledgeType

describe("processForCsv", () => {
  it("emits columns in the documented order", () => {
    const [row] = processForCsv([pledge()])
    expect(row).toEqual([
      "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", // contributor
      "1.0",                                        // ether per day
      "3",                                          // duration
      new Date(Number(CREATED) * 1000).toDateString(),
      new Date((Number(CREATED) + 3 * 86400) * 1000).toDateString(),
      "ACTIVE",
    ])
  })

  it("maps each status enum to its label", () => {
    const statuses = [0n, 1n, 2n].map(status => processForCsv([pledge({ status })])[0][5])
    expect(statuses).toEqual(["ACTIVE", "CANCELLED", "EXPIRED"])
  })

  it("computes the end date from the pledge duration", () => {
    const [row] = processForCsv([pledge({ duration: 10n })])
    expect(row[4]).toBe(new Date((Number(CREATED) + 10 * 86400) * 1000).toDateString())
  })
})

describe("escapeCsvCell", () => {
  it("leaves plain cells alone", () => {
    expect(escapeCsvCell("ACTIVE")).toBe("ACTIVE")
  })

  it("quotes cells containing a comma", () => {
    expect(escapeCsvCell("a,b")).toBe('"a,b"')
  })

  it("doubles embedded quotes", () => {
    expect(escapeCsvCell('say "hi"')).toBe('"say ""hi"""')
  })
})
