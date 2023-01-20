import { BigNumber } from "ethers"

export async function deposit(amount: BigNumber) {
  const contract = init()
  const transaction = await contract.deposit({ value: amount })
  return await transaction.wait()
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

export async function getExpiredPledges() {
  const contract = init()
  return await contract.getExpiredPledges()
}

export async function cancelPledge(creator: string) {
  const contract = init()
  const transaction = await contract.cancelPledge(creator)
  return transaction.wait()
}