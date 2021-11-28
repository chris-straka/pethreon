import { BigNumberish } from "ethers";
import { extractPledgesToCSV } from "./extractPledgesToCSV";

export interface EthereumWindow extends Window {
  ethereum?: any
}

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
  dateCreated: BigNumberish,
  duration: BigNumberish,
  periodExpires: BigNumberish,
  status: PledgeStatus,
  weiPerPeriod: BigNumberish,
}

export { extractPledgesToCSV }