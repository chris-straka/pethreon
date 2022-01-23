import { providers, BigNumber, utils } from "ethers"
import { EthereumWindow } from "./utils";
import { Pethreon__factory } from "./types/factories/Pethreon__factory"

const PETHREON_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function init() {
  const { ethereum } = window as EthereumWindow         // check if they have metamask installed (ethereum)
  const provider = new providers.Web3Provider(ethereum) // grab their wallet          (Provider)
  const signer = provider.getSigner()                   // grab their current account (Signer)
  return Pethreon__factory.connect(PETHREON_CONTRACT_ADDRESS, signer)
}

export async function deposit(amount: BigNumber) {
  const contract = init()
  const transaction = await contract.deposit({ value: amount })
  await transaction.wait()
}

// Need to turn it into a string with await toString()
// Then turn it into ether with utils.formatEther()
export async function getContributorBalanceInWei() {
  const contract = init()
  return await contract.getContributorBalanceInWei()
}

export async function getCreatorBalanceInWei() {
  const contract = init()
  return await contract.getCreatorBalanceInWei()
}

export async function contributorWithdraw(amount: BigNumber) {
  const contract = init()
  const transaction = await contract.contributorWithdraw(amount)
  await transaction.wait()
}

export async function creatorWithdraw() {
  const contract = init()
  const transaction = await contract.creatorWithdraw()
  await transaction.wait()
}

export async function createPledge(address: string, period: string, amountPerPeriod: BigNumber) {
  const contract = init()
  const transaction = await contract.createPledge(address, amountPerPeriod, period)
  await transaction.wait()
}

export async function getContributorPledges() {
  const contract = init()
  return await contract.getContributorPledges()
}

export async function getCreatorPledges() {
  const contract = init()
  return await contract.getCreatorPledges()
}

export async function getExpiredPledges() {
  const contract = init()
  return await contract.getExpiredPledges()
}

export async function cancelPledge(creator: string) {
  const contract = init()
  return contract.cancelPledge(creator)
}