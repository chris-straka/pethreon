import { BigNumber } from "ethers";
import { extractPledgesToCsv } from "./extractPledgesToCSV";

export interface MetamaskError extends Error {
  data: any,
  code: number,
  message: string
}

export enum Denomination {
  ETHER = "Ether",
  GWEI = "Gwei",
  WEI = "Wei",
  ALL = "All",
}

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

export { extractPledgesToCsv }