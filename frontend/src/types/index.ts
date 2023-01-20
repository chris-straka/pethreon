import { Pethreon } from "../../typechain-types";

export interface MetamaskError extends Error {
  data: any,
  code: number,
  message: string
}

export type Denomination = "Ether" | "Gwei" | "Wei" | "All"

export type PledgeType = Pethreon.PledgeStructOutput
