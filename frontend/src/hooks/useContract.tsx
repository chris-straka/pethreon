import { ethers } from 'ethers'
import { Pethreon__factory } from '../../typechain-types'

const PETHREON_CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS

export function useContract(provider: any) {
  const web3Provider = new ethers.providers.Web3Provider(provider, 'any')
  const signer = web3Provider.getSigner()
  return Pethreon__factory.connect(PETHREON_CONTRACT_ADDRESS, signer)
}