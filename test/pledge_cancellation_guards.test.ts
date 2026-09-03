import { Signer } from 'ethers';
import { Pethreon } from "../frontend/typechain-types";
import { ethers } from 'hardhat';
import { expect } from 'chai';

/**
 * Regression tests for the cancelPledge guard.
 *
 * cancelPledge used to accept any address. Its delete helpers called pop()
 * outside the loop that searched for a match, so a call naming a creator you
 * had never pledged to still removed the last element of both arrays.
 */
describe("Pethreon - cancelPledge guards", () => {
  let Pethreon: Pethreon
  let victim: Signer, attacker: Signer
  let creatorA: string, creatorB: string

  beforeEach(async () => {
    const factory = await ethers.getContractFactory('Pethreon')
    Pethreon = await factory.deploy(86400) as unknown as Pethreon
    const signers = await ethers.getSigners()
      ;[, victim, attacker] = signers
    creatorA = await signers[3].getAddress()
    creatorB = await signers[4].getAddress()
  })

  it("rejects cancelling a creator you never pledged to", async () => {
    await Pethreon.connect(attacker).deposit({ value: ethers.parseEther("1") })
    await Pethreon.connect(attacker).createPledge(creatorA, 1000n, 3)

    await expect(Pethreon.connect(attacker).cancelPledge(creatorB))
      .to.be.revertedWith("No active pledge to that creator")
  })

  it("leaves the caller's unrelated pledge intact after a rejected cancel", async () => {
    await Pethreon.connect(attacker).deposit({ value: ethers.parseEther("1") })
    await Pethreon.connect(attacker).createPledge(creatorA, 1000n, 3)

    await expect(Pethreon.connect(attacker).cancelPledge(creatorB)).to.be.reverted
    expect(await Pethreon.connect(attacker).getContributorPledges()).to.have.length(1)
  })

  // The damaging case: creatorB has pledges, so the empty-array panic that
  // used to mask the bug never fires and the corruption committed silently.
  it("cannot strip another contributor's pledge from a creator's list", async () => {
    await Pethreon.connect(victim).deposit({ value: ethers.parseEther("1") })
    await Pethreon.connect(victim).createPledge(creatorB, 1000n, 3)

    await Pethreon.connect(attacker).deposit({ value: ethers.parseEther("1") })
    await Pethreon.connect(attacker).createPledge(creatorA, 1000n, 3)

    await expect(Pethreon.connect(attacker).cancelPledge(creatorB)).to.be.reverted

    const creatorBSigner = (await ethers.getSigners())[4]
    expect(await Pethreon.connect(creatorBSigner).getCreatorPledges()).to.have.length(1)
    expect(await Pethreon.connect(attacker).getContributorPledges()).to.have.length(1)
  })

  it("rejects cancelling with no pledges at all", async () => {
    await expect(Pethreon.connect(attacker).cancelPledge(creatorA))
      .to.be.revertedWith("No active pledge to that creator")
  })

  it("still cancels a genuine pledge and refunds the remainder", async () => {
    await Pethreon.connect(attacker).deposit({ value: 10n })
    await Pethreon.connect(attacker).createPledge(creatorA, 1n, 3)
    expect(await Pethreon.connect(attacker).getContributorBalanceInWei()).to.equal(7n)

    await Pethreon.connect(attacker).cancelPledge(creatorA)

    expect(await Pethreon.connect(attacker).getContributorBalanceInWei()).to.equal(10n)
    expect(await Pethreon.connect(attacker).getContributorPledges()).to.have.length(0)
  })
})
