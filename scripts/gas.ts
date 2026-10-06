/**
 * Gas benchmark for the pledge lifecycle on the in-process Hardhat network.
 *
 *   npx hardhat run scripts/gas.ts
 *
 * Prints gas for: createPledge by pledge length, creatorWithdraw by elapsed
 * periods since the last withdrawal, and creatorWithdraw by the number of
 * active pledges the creator holds. Every number comes from a mined receipt.
 */
import { ethers, network } from "hardhat"

const DAY = 86400

async function deploy() {
  const factory = await ethers.getContractFactory("Pethreon")
  return (await factory.deploy(DAY)) as any
}

async function advance(periods: number) {
  await network.provider.send("evm_increaseTime", [DAY * periods])
  await network.provider.send("evm_mine")
}

async function gasOf(tx: Promise<any>): Promise<number> {
  return Number((await (await tx).wait()).gasUsed)
}

async function main() {
  const [contributor, creator] = await ethers.getSigners()
  const creatorAddress = await creator.getAddress()

  console.log("createPledge gas by pledge length (periods):")
  for (const periods of [1, 30, 365]) {
    const c = await deploy()
    await c.deposit({ value: BigInt(periods) })
    const gas = await gasOf(c.createPledge(creatorAddress, 1n, BigInt(periods)))
    console.log(`  ${String(periods).padStart(5)} periods  ${gas.toLocaleString("en-US")}`)
  }

  console.log("creatorWithdraw gas by periods elapsed since the last withdrawal (1 active pledge):")
  for (const elapsed of [1, 100, 1000, 5000]) {
    const c = await deploy()
    await c.deposit({ value: 1n })
    await c.createPledge(creatorAddress, 1n, 1n)
    await advance(elapsed)
    const gas = await gasOf(c.connect(creator).creatorWithdraw())
    console.log(`  ${String(elapsed).padStart(5)} periods  ${gas.toLocaleString("en-US")}`)
  }

  console.log("creatorWithdraw gas by active pledges to the creator (1 period elapsed):")
  for (const pledgers of [1, 10, 50]) {
    const c = await deploy()
    for (let i = 0; i < pledgers; i++) {
      const w = ethers.Wallet.createRandom().connect(ethers.provider)
      await network.provider.send("hardhat_setBalance", [w.address, "0xDE0B6B3A7640000"]) // 1 ETH
      await c.connect(w).deposit({ value: 100n })
      await c.connect(w).createPledge(creatorAddress, 1n, 100n)
    }
    await advance(1)
    const gas = await gasOf(c.connect(creator).creatorWithdraw())
    console.log(`  ${String(pledgers).padStart(5)} pledges  ${gas.toLocaleString("en-US")}`)
  }
  void contributor
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
