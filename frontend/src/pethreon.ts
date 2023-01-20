import { BigNumber } from "ethers"


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

export async function getExpiredPledges() {
  const contract = init()
  return await contract.getExpiredPledges()
}

export async function cancelPledge(creator: string) {
  const contract = init()
  const transaction = await contract.cancelPledge(creator)
  return transaction.wait()
}