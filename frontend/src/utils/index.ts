import { BigNumber } from "ethers";
import { extractPledgesToCsv } from "./extractPledgesToCSV";
import { extractLinks } from "./extractLinks";

export interface MetamaskError extends Error {
  data: any,
  code: number,
  message: string
}


export type Denomination = "Ether" | "Gwei" | "Wei" | "All"

export enum PledgeStatus {
  ACTIVE,
  CANCELLED,
  EXPIRED
}

export type PledgeType = {
  contributorAddress: string,
  creatorAddress: string,
  dateCreated: BigNumber,
  duration: BigNumber,
  periodExpires: BigNumber,
  status: PledgeStatus,
  weiPerPeriod: BigNumber,
}

export { extractPledgesToCsv, extractLinks }