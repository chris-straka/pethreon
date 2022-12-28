import { providers, BigNumber } from "ethers"
import { EthereumWindow } from "./utils";
import { Pethreon__factory } from "../../typechain-types/factories";

const PETHREON_CONTRACT_ADDRESS = process.env.NODE_ENV === "development" ?
  process.env.REACT_APP_LOCALHOST_CONTRACT_ADDRESS as string :
  process.env.REACT_APP_RINKEBY_CONTRACT_ADDRESS as string

function init() {
  const { ethereum } = window as EthereumWindow         // check if they have metamask installed (Ethereum)
  const provider = new providers.Web3Provider(ethereum) // grab their connection to ethereum     (Provider)
  const signer = provider.getSigner()                   // grab their current account            (Signer)
  return Pethreon__factory.connect(PETHREON_CONTRACT_ADDRESS, signer)
}

export async function deposit(amount: BigNumber) {
  const contract = init()
  const transaction = await contract.deposit({ value: amount })
  return await transaction.wait()
}

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

export async function createPledge(address: string, amountPerPeriod: BigNumber, period: string) {
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
  const transaction = await contract.cancelPledge(creator)
  return transaction.wait()
}