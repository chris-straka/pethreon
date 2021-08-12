export interface EthereumWindow extends Window {
  ethereum?: any,
}

export interface MetamaskError extends Error {
  code: number,
  message: string
}

export enum EtherDenomination {
  ETHER = "Ether",
  GWEI = "Gwei",
  WEI = "Wei",
  ALL = "All",
}

export const PETHREON_DEVELOPMENT_PRIVATE_KEY = "test test test test test test test test test test test junk"

export const PETHREON_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

export const METAMASK_TEST_ACCOUNT_ONE = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
export const METAMASK_TEST_ACCOUNT_TWO = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
export const METAMASK_TEST_ACCOUNT_THREE = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
