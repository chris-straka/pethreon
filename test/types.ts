import { BigNumber } from "ethers"

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

// const PETHREON_DEVELOPMENT_PRIVATE_KEY = "test test test test test test test test test test test junk"
// const METAMASK_TEST_ACCOUNT_ONE = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
// const METAMASK_TEST_ACCOUNT_TWO = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
// const METAMASK_TEST_ACCOUNT_THREE = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"