import { expect } from 'chai';
import { Pethreon } from "../../frontend/src/types";
import { PledgeStatus, PledgeType } from "./types"
import { ethers, network } from 'hardhat';
import { ContractFactory, Signer } from 'ethers';
import "@nomiclabs/hardhat-ethers" // stops the hardhat error

describe("Pethreon", () => {
  let PethreonFactory: ContractFactory
  let Pethreon: Pethreon
  let owner: Signer         // 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
  let foo: Signer           // 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
  let bar: Signer           // 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
  let fooAddress: string   
  let barAddress: string   

  beforeEach(async () => {
    PethreonFactory = await ethers.getContractFactory('Pethreon')
    Pethreon = await PethreonFactory.deploy(86400) as Pethreon
    [owner, foo, bar] = await ethers.getSigners()
    fooAddress = await foo.getAddress()
    barAddress = await bar.getAddress()
  })

  describe("Pledge Creation Tests", async () => {
    beforeEach(async () => {
      await Pethreon.deposit({ value: 100 })
      await Pethreon.createPledge(fooAddress, 1, 3)
    })

    it("The pledge should look correct", async () => {
      const contributorPledges = await Pethreon.getContributorPledges() as PledgeType[]
      const pledge = contributorPledges[0]

      const duration = await pledge.duration.toNumber()
      const weiPerPeriod = await pledge.weiPerPeriod.toNumber()
      const expirationDate = await pledge.periodExpires.toNumber()
      const currentPeriod = await (await Pethreon.currentPeriod()).toNumber()

      expect(weiPerPeriod).to.equal(1)
      expect(expirationDate - currentPeriod).to.equal(duration)
    })

    it("The creator should be receiving money in the correct increments", async () => {
      expect(await Pethreon.connect(foo).getCreatorBalanceInWei()).to.equal(0)
      expect(await Pethreon.getContributorBalanceInWei()).to.equal(97)

      await network.provider.send("evm_increaseTime", [86400])
      await network.provider.send("evm_mine")
      expect(await Pethreon.connect(foo).getCreatorBalanceInWei()).to.equal(1)

      await network.provider.send("evm_increaseTime", [86400])
      await network.provider.send("evm_mine")
      expect(await Pethreon.connect(foo).getCreatorBalanceInWei()).to.equal(2)

      await network.provider.send("evm_increaseTime", [86400])
      await network.provider.send("evm_mine")
      expect(await Pethreon.connect(foo).getCreatorBalanceInWei()).to.equal(3)

      await network.provider.send("evm_increaseTime", [86400])
      await network.provider.send("evm_mine")
      expect(await Pethreon.getContributorBalanceInWei()).to.equal(97)
      expect(await Pethreon.connect(foo).getCreatorBalanceInWei()).to.equal(3)
      expect(await (await Pethreon.connect(foo).getCreatorBalanceInWei())).to.equal(3)

      const pledges = await Pethreon.connect(foo).getCreatorPledges()
      expect(pledges.length).to.equal(1)
    })

    it('Contributors should only have one active pledge per creator at a time', async function () {
      // Currently doesn't work in hardhat yet (to my knowledge)
      // expect(await Pethreon.createPledge(fooAddress, 1, 3)).to.be.reverted

      await network.provider.send("evm_increaseTime", [86400 * 3]) // jump from period 0 -> 3
      await network.provider.send("evm_mine")

      const pledgesBefore = await Pethreon.getContributorPledges()
      expect(pledgesBefore.length).to.equal(1)

      await Pethreon.createPledge(fooAddress, 1, 3) // this should replace it
      const pledges = await Pethreon.getContributorPledges()
      expect(pledges.length).to.equal(1)

      const creatorPledges = await Pethreon.connect(foo).getCreatorPledges()
      expect(creatorPledges.length).to.equal(1)

      expect(await Pethreon.connect(foo).getCreatorBalanceInWei()).to.equal(3)  // hasn't been a day yet for the 2nd pledge
    })

    it('Creators should have old pledges show up as expired', async function () {
      await network.provider.send("evm_increaseTime", [86400 * 3]) // jump from period 0 -> 3
      await network.provider.send("evm_mine")
      await Pethreon.createPledge(fooAddress, 1, 3)
      const expired = await Pethreon.connect(foo).getExpiredPledges()
      expect(expired.length).to.equal(1)
      expect(expired[0].status).to.equal(PledgeStatus.EXPIRED)
    })

    it("The creator should be able to withdraw money sent in from two contributors", async () => {
      await Pethreon.connect(bar).deposit({ value: 100 })
      await Pethreon.connect(bar).createPledge(fooAddress, 1, 3)

      const pledges = await Pethreon.connect(foo).getCreatorPledges()
      expect(pledges.length).to.equal(2)
      expect(await Pethreon.connect(foo).getCreatorBalanceInWei()).to.equal(0)

      await network.provider.send("evm_increaseTime", [86400 * 3])
      await network.provider.send("evm_mine")

      expect(await Pethreon.connect(foo).getCreatorBalanceInWei()).to.equal(6)
      await Pethreon.connect(foo).creatorWithdraw()
      expect(await Pethreon.connect(foo).getCreatorBalanceInWei()).to.equal(0)
    })
  })
});