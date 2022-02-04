import { providers, BigNumber } from "ethers"
import { EthereumWindow } from "./utils";
import { Pethreon__factory } from "./types/factories/Pethreon__factory"

// localhost 0x5FbDB2315678afecb367f032d93F642f64180aa3
const PETHREON_CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function initWithProvider() {
  const { ethereum } = window as EthereumWindow         // check if they have metamask installed (ethereum)
  const provider = new providers.Web3Provider(ethereum) // grab their wallet          (Provider)
  return Pethreon__factory.connect(PETHREON_CONTRACT_ADDRESS, provider)
}

function initWithSigner() {
  const { ethereum } = window as EthereumWindow         // check if they have metamask installed (ethereum)
  const provider = new providers.Web3Provider(ethereum) // grab their wallet          (Provider)
  const signer = provider.getSigner()                   // grab their current account (Signer)
  return Pethreon__factory.connect(PETHREON_CONTRACT_ADDRESS, signer)
}

export async function deposit(amount: BigNumber) {
  const contract = initWithSigner()
  const transaction = await contract.deposit({ value: amount })
  return await transaction.wait()
}

// Need to turn it into a string with await toString()
// Then turn it into ether with utils.formatEther()
export async function getContributorBalanceInWei() {
  console.log(PETHREON_CONTRACT_ADDRESS)
  const contract = initWithProvider()
  return await contract.getContributorBalanceInWei()
}

export async function getCreatorBalanceInWei() {
  const contract = initWithProvider()
  return await contract.getCreatorBalanceInWei()
}

export async function contributorWithdraw(amount: BigNumber) {
  const contract = initWithSigner()
  const transaction = await contract.contributorWithdraw(amount)
  await transaction.wait()
}

export async function creatorWithdraw() {
  const contract = initWithSigner()
  const transaction = await contract.creatorWithdraw()
  await transaction.wait()
}

export async function createPledge(address: string, period: string, amountPerPeriod: BigNumber) {
  const contract = initWithSigner()
  const transaction = await contract.createPledge(address, amountPerPeriod, period)
  await transaction.wait()
}

export async function getContributorPledges() {
  const contract = initWithSigner()
  return await contract.getContributorPledges()
}

export async function getCreatorPledges() {
  const contract = initWithProvider()
  return await contract.getCreatorPledges()
}

export async function getExpiredPledges() {
  const contract = initWithProvider()
  return await contract.getExpiredPledges()
}

export async function cancelPledge(creator: string) {
  const contract = initWithSigner()
  const transaction = await contract.cancelPledge(creator)
  return transaction.wait()
}