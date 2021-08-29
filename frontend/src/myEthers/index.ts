import { contributorWithdraw } from "./contributorWithdraw";
import { createPledge } from "./createPledge";
import { creatorWithdraw } from "./creatorWithdraw";
import { deposit } from "./deposit";
import { getContributorBalance } from "./getContributorBalance";
import { getContributorPledges } from "./getContributorPledges";
import { getCreatorBalance } from "./getCreatorBalance";
import { getCreatorPledges } from "./getCreatorPledges";
import { BigNumber } from "@ethersproject/bignumber"

export interface EthereumWindow extends Window { ethereum?: any, }

export interface MetamaskError extends Error { code: number, message: string }

enum EtherDenomination { ETHER = "Ether", GWEI = "Gwei", WEI = "Wei", ALL = "All", }

export type PledgeType = {
  0: string,
  1: string,
  2: BigNumber,
  3: BigNumber,
  4: BigNumber,
  creatorAddress: string,
  contributorAddress: string,
  weiPerPeriod: BigNumber,
  dateCreated: BigNumber,
  expirationDate: BigNumber,
}

const PETHREON_DEVELOPMENT_PRIVATE_KEY = "test test test test test test test test test test test junk"
const PETHREON_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const METAMASK_TEST_ACCOUNT_ONE = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
const METAMASK_TEST_ACCOUNT_TWO = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
const METAMASK_TEST_ACCOUNT_THREE = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"

export {
  contributorWithdraw,
  createPledge,
  creatorWithdraw,
  deposit,
  getContributorBalance,
  getContributorPledges,
  getCreatorBalance,
  getCreatorPledges,
  EtherDenomination,
  PETHREON_CONTRACT_ADDRESS
}
