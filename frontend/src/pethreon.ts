import { Pethreon } from "./types"
import { providers, Contract, BigNumberish } from "ethers"
import { formatEther } from "@ethersproject/units";
import { abi } from "./artifacts/localhost/Pethreon.json"
import { BigNumber } from "@ethersproject/bignumber"

const PETHREON_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function init() {
  const { ethereum } = window as EthereumWindow         // check if they have metamask installed (ethereum)
  const provider = new providers.Web3Provider(ethereum) // grab their wallet          (Provider)
  const signer = provider.getSigner()                   // grab their current account (Signer)
  return new Contract(PETHREON_CONTRACT_ADDRESS, abi, signer) as Pethreon
}

export async function contributorWithdraw(amount: BigNumberish) {
  const contract = init()
  const transaction = await contract.contributorWithdraw(amount)
  await transaction.wait()
}

export async function createPledge(address: string, period: string, amountPerPeriod: BigNumberish) {
  const contract = init()
  const transaction = await contract.createPledge(address, amountPerPeriod, period)
  await transaction.wait()
}

export async function creatorWithdraw() {
  const contract = init()
  const transaction = await contract.creatorWithdraw()
  await transaction.wait()
}

export async function deposit(amount: BigNumberish) {
  const contract = init()
  const transaction = await contract.deposit({ value: amount })
  await transaction.wait()
}

export async function getContributorBalance() {
  const contract = init()
  const balance: BigNumber = await contract.getContributorBalance()
  const balanceToString = await balance.toString()
  return formatEther(balanceToString)
}

export async function getContributorPledges() {
  const contract = init()
  return await contract.getContributorPledges()
}

export async function getCreatorBalance() {
  const contract = init()
  const balance: BigNumber = await contract.getCreatorBalance()
  const balanceToString = await balance.toString()
  return formatEther(balanceToString)
}

export async function getCreatorPledges() {
  const contract = init()
  return await contract.getCreatorPledges()
}

export async function cancelPledge(creator: string) {
  const contract = init()
  return contract.cancelPledge(creator)
}

export interface EthereumWindow extends Window {
  ethereum?: any,
}

export interface MetamaskError extends Error { code: number, message: string }

export enum EtherDenomination {
  ETHER = "Ether",
  GWEI = "Gwei",
  WEI = "Wei",
  ALL = "All",
}

export enum PledgeStatus {
  ACTIVE,
  CANCELLED,
  EXPIRED
}

export type PledgeType = {
  contributorAddress: string,
  creatorAddress: string,
  dateCreated: BigNumber,
  duration: BigNumber,
  periodExpires: BigNumber,
  status: PledgeStatus,
  weiPerPeriod: BigNumber,
}

// const PETHREON_DEVELOPMENT_PRIVATE_KEY = "test test test test test test test test test test test junk"
// const METAMASK_TEST_ACCOUNT_ONE = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
// const METAMASK_TEST_ACCOUNT_TWO = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
// const METAMASK_TEST_ACCOUNT_THREE = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"