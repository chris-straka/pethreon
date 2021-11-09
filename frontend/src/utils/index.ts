import { extractPledgesToCSV } from "./extractPledgesToCSV";

import { BigNumber } from "@ethersproject/bignumber"

export interface EthereumWindow extends Window {
  ethereum?: any
}

export interface MetamaskError extends Error {
  data: any,
  code: number,
  message: string
}

export enum EtherDenomination {
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

export { extractPledgesToCSV }