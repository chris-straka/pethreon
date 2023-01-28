import { ethers } from "ethers"
import { Pethreon as Contract } from "../../typechain-types";

export interface MetamaskError extends Error {
  data: any,
  code: number,
  message: string
}

export type Denomination = "Ether" | "Gwei" | "Wei" | "All"

export type PledgeType = Contract.PledgeStructOutput

export type Web3Provider = ethers.providers.Web3Provider

export type Pethreon = Contract