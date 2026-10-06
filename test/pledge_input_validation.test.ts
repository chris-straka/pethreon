import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Signer } from 'ethers';
import { Pethreon } from "../frontend/typechain-types";

/**
 * KNOWN_ISSUES item 4: createPledge used to trust the frontend for input
 * validation. Each of these used to succeed and either burn escrow (pledging
 * to address(0)) or add zero-value entries to a creator's active list.
 */
describe("Pethreon - createPledge input validation", () => {
  let Pethreon: Pethreon
  let contributor: Signer
  let creatorAddress: string

  beforeEach(async () => {
    const factory = await ethers.getContractFactory('Pethreon')
    Pethreon = await factory.deploy(86400) as unknown as Pethreon
    const signers = await ethers.getSigners()
    contributor = signers[0]
    creatorAddress = await signers[1].getAddress()
    await Pethreon.deposit({ value: 1000n })
  })

  it("rejects the zero address as creator", async () => {
    await expect(Pethreon.createPledge(ethers.ZeroAddress, 1n, 3n))
      .to.be.revertedWith("Creator is the zero address")
  })

  it("rejects pledging to yourself", async () => {
    await expect(Pethreon.createPledge(await contributor.getAddress(), 1n, 3n))
      .to.be.revertedWith("You can't pledge to yourself")
  })

  it("rejects a zero amount per period", async () => {
    await expect(Pethreon.createPledge(creatorAddress, 0n, 3n))
      .to.be.revertedWith("Pledge must be at least 1 wei per period")
  })

  it("rejects a zero-length pledge", async () => {
    await expect(Pethreon.createPledge(creatorAddress, 1n, 0n))
      .to.be.revertedWith("Pledge must last at least one period")
  })

  it("leaves the escrow untouched after a rejected pledge", async () => {
    await expect(Pethreon.createPledge(creatorAddress, 0n, 3n)).to.be.reverted
    expect(await Pethreon.getContributorBalanceInWei()).to.equal(1000n)
  })

  it("rejects a zero period length at deployment", async () => {
    const factory = await ethers.getContractFactory('Pethreon')
    await expect(factory.deploy(0)).to.be.revertedWith("Period must be positive")
  })
})
