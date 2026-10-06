import { expect } from 'chai';
import { Pethreon } from "../frontend/typechain-types";
import { ethers, network } from 'hardhat';
import { Signer } from 'ethers';

/**
 * Regression tests for KNOWN_ISSUES item 2 (unbounded withdrawal loop).
 *
 * `getCreatorBalanceInWei` used to loop from the last withdrawal period to
 * the current one, so withdrawal gas grew linearly with elapsed time until
 * funds became unwithdrawable. `createPledge`/`cancelPledge` had the same
 * shape over per-period slots. Accounting is now a checkpoint/accumulator
 * (running `ratePerPeriod` + `lastWithdrawalPeriod` + `accruedPayments`),
 * so gas must stay bounded no matter how much time has passed.
 */
describe("Pethreon - bounded withdrawal gas", () => {
  const DAY = 86400;

  let Pethreon: Pethreon
  let contributor: Signer
  let creator: Signer
  let creatorAddress: string

  async function freshDeploy() {
    const factory = await ethers.getContractFactory('Pethreon')
    Pethreon = await factory.deploy(DAY) as unknown as Pethreon
    const signers = await ethers.getSigners()
    contributor = signers[0]
    creator = signers[1]
    creatorAddress = await creator.getAddress()
  }

  beforeEach(freshDeploy)

  async function pledgeAndFastForward(periods: number) {
    // 1 wei per period, escrowed exactly. Under the old per-period-slot
    // accounting, a large `periods` value here was itself unaffordable.
    await Pethreon.deposit({ value: BigInt(periods) })
    await Pethreon.createPledge(creatorAddress, 1n, BigInt(periods))
    await network.provider.send("evm_increaseTime", [DAY * periods])
    await network.provider.send("evm_mine")
  }

  it("withdrawal gas stays bounded after a long elapsed time", async () => {
    await pledgeAndFastForward(3)
    expect(await Pethreon.connect(creator).getCreatorBalanceInWei()).to.equal(3n)
    const shortTx = await Pethreon.connect(creator).creatorWithdraw()
    const shortGas = Number((await shortTx.wait())!.gasUsed)

    await freshDeploy()
    const LONG = 5000 // ~13.7 years of daily periods; old code looped 5000 slots
    await pledgeAndFastForward(LONG)
    expect(await Pethreon.connect(creator).getCreatorBalanceInWei()).to.equal(BigInt(LONG))
    const longTx = await Pethreon.connect(creator).creatorWithdraw()
    const longGas = Number((await longTx.wait())!.gasUsed)
    expect(await Pethreon.connect(creator).getCreatorBalanceInWei()).to.equal(0n)

    // ~1666x more elapsed periods must not meaningfully move gas.
    expect(longGas).to.be.lessThan(shortGas * 3)
  })

  it("partial withdrawal, then a long idle stretch, still settles exactly", async () => {
    const LONG = 2000
    await Pethreon.deposit({ value: BigInt(LONG) })
    await Pethreon.createPledge(creatorAddress, 1n, BigInt(LONG))

    await network.provider.send("evm_increaseTime", [DAY * 10])
    await network.provider.send("evm_mine")
    await Pethreon.connect(creator).creatorWithdraw()
    expect(await Pethreon.connect(creator).getCreatorBalanceInWei()).to.equal(0n)

    await network.provider.send("evm_increaseTime", [DAY * (LONG - 10)])
    await network.provider.send("evm_mine")
    expect(await Pethreon.connect(creator).getCreatorBalanceInWei()).to.equal(BigInt(LONG - 10))
    await expect(Pethreon.connect(creator).creatorWithdraw()).to.not.be.reverted
    expect(await Pethreon.connect(creator).getCreatorBalanceInWei()).to.equal(0n)
  })

  it("cancel after a long elapsed time stays bounded and splits vested/refund exactly", async () => {
    const LONG = 3000
    await Pethreon.deposit({ value: BigInt(LONG) })
    await Pethreon.createPledge(creatorAddress, 1n, BigInt(LONG))

    await network.provider.send("evm_increaseTime", [DAY * 100])
    await network.provider.send("evm_mine")

    await Pethreon.cancelPledge(creatorAddress)
    // 100 periods vested to the creator, the rest refunded to the contributor.
    expect(await Pethreon.getContributorBalanceInWei()).to.equal(BigInt(LONG - 100))
    expect(await Pethreon.connect(creator).getCreatorBalanceInWei()).to.equal(100n)
  })
});
