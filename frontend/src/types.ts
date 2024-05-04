import { Pethreon as Contract, Pethreon__factory as ContractFactory } from "../typechain-types";

export interface MetamaskError extends Error {
  data: any,
  code: number,
  message: string
}

export type Denomination = "Ether" | "Gwei" | "Wei" | "All"

export type PledgeType = Contract.PledgeStructOutput
export type Pethreon = Contract
export type Pethreon__factory = ContractFactory