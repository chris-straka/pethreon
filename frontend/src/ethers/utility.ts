export interface EthereumWindow extends Window {
  ethereum?: any,
}

export interface MetamaskError extends Error {
  code: number,
  message: string
}

export const PETHREON_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"