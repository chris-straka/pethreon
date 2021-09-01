import { ContractFactory, Signer, BigNumber } from 'ethers';
import { Pethreon } from "../frontend/src/types/Pethreon";
import { ethers, network } from 'hardhat';
import { expect } from 'chai';
import "@nomiclabs/hardhat-ethers" // stops the error until I figure it out

enum PledgeStatus {
  ACTIVE,
  CANCELLED,
  EXPIRED
}

type PledgeType = {
  contributorAddress: string,
  creatorAddress: string,
  dateCreated: BigNumber,
  duration: BigNumber,
  periodExpires: BigNumber,
  status: PledgeStatus,
  weiPerPeriod: BigNumber,
}

describe("Pethreon", () => {
  let PethreonFactory: ContractFactory
  let Pethreon: Pethreon
  let owner: Signer
  let foo: Signer
  let bar: Signer
  let ownerAddress: string // 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
  let fooAddress: string   // 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
  let barAddress: string   // 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
  let oneEther = ethers.utils.parseEther("1")
  let oneWei = 1

  beforeEach(async () => {
    PethreonFactory = await ethers.getContractFactory('Pethreon')
    Pethreon = await PethreonFactory.deploy(86400) as Pethreon
    [owner, foo, bar] = await ethers.getSigners()
    fooAddress = await foo.getAddress()
    barAddress = await bar.getAddress()
  })

  describe("Deposit and Withdraw", async () => {
    it("should deposit and withdraw 1 ether", async () => {
      expect(await Pethreon.getContributorBalance()).to.equal(0)

      await Pethreon.deposit({ value: oneEther })
      expect(await Pethreon.getContributorBalance()).to.equal(oneEther)

      await Pethreon.contributorWithdraw(oneEther)
      expect(await Pethreon.getContributorBalance()).to.equal(0)
    })
  })

  describe("Pledge creation", async () => {
    beforeEach(async () => {
      await Pethreon.deposit({ value: 100 })
      await Pethreon.createPledge(fooAddress, 1, 3)
    })

    it("The pledge should look correct", async () => {
      const pledges = await Pethreon.getContributorPledges() as PledgeType[]
      const pledge = pledges[0]

      const duration = await pledge.duration.toNumber()
      const weiPerPeriod = await pledge.weiPerPeriod.toNumber()
      const expirationDate = await pledge.periodExpires.toNumber()
      const currentPeriod = await (await Pethreon.currentPeriod()).toNumber()

      expect(weiPerPeriod).to.equal(oneWei)
      expect(expirationDate - currentPeriod).to.equal(duration)
    })

    it("The creator should be receiving money in the correct increments", async () => {
      expect(await Pethreon.connect(foo).getCreatorBalance()).to.equal(0)
      expect(await Pethreon.getContributorBalance()).to.equal(97)

      await network.provider.send("evm_increaseTime", [86400])
      await network.provider.send("evm_mine")
      expect(await Pethreon.connect(foo).getCreatorBalance()).to.equal(1)

      await network.provider.send("evm_increaseTime", [86400])
      await network.provider.send("evm_mine")
      expect(await Pethreon.connect(foo).getCreatorBalance()).to.equal(2)

      await network.provider.send("evm_increaseTime", [86400])
      await network.provider.send("evm_mine")
      expect(await Pethreon.connect(foo).getCreatorBalance()).to.equal(3)

      await network.provider.send("evm_increaseTime", [86400])
      await network.provider.send("evm_mine")
      expect(await Pethreon.getContributorBalance()).to.equal(97)
      expect(await Pethreon.connect(foo).getCreatorBalance()).to.equal(3)
      expect(await (await Pethreon.connect(foo).getCreatorBalance())).to.equal(3)

      const pledges = await Pethreon.connect(foo).getCreatorPledges()
      expect(pledges.length).to.equal(1)
    })

    it('Contributors should only have one active pledge per creator at a time', async function () {
      // Currently doesn't work in hardhat yet (to my knowledge)
      // expect(await Pethreon.createPledge(fooAddress, 1, 3)).to.be.reverted

      await network.provider.send("evm_increaseTime", [86400 * 3]) // jump from period 0 -> 3
      await network.provider.send("evm_mine")
      await Pethreon.createPledge(fooAddress, 1, 3)

      expect(await Pethreon.connect(foo).getCreatorBalance()).to.equal(3)       // hasn't been a day yet on the 2nd pledge
      expect(await (await Pethreon.getContributorPledges()).length).to.equal(1) // the contributor should only have one active pledge
    })

    it('Creators should have old pledges show up as expired', async function () {
      await network.provider.send("evm_increaseTime", [86400 * 3]) // jump from period 0 -> 3
      await network.provider.send("evm_mine")
      await Pethreon.createPledge(fooAddress, 1, 3)
      const pledges = await Pethreon.connect(foo).getCreatorPledges()
      console.log(pledges)

      expect(pledges.length).to.equal(2)
    })

    it("The creator should be able to withdraw money sent in from two contributors", async () => {
      await Pethreon.connect(bar).deposit({ value: oneEther })
      await Pethreon.connect(bar).createPledge(fooAddress, 1, 3)

      const pledges = await Pethreon.connect(foo).getCreatorPledges()
      expect(pledges.length).to.equal(2)
      expect(await Pethreon.connect(foo).getCreatorBalance()).to.equal(0)

      await network.provider.send("evm_increaseTime", [86400 * 3])
      await network.provider.send("evm_mine")

      expect(await Pethreon.connect(foo).getCreatorBalance()).to.equal(6)
      await Pethreon.connect(foo).creatorWithdraw()
      expect(await Pethreon.connect(foo).getCreatorBalance()).to.equal(0)
    })
  })

  describe("Pledge deletion", async () => {
    beforeEach(async () => {
      await Pethreon.deposit({ value: 10 })
      await Pethreon.createPledge(fooAddress, 1, 3)
      await Pethreon.createPledge(barAddress, 1, 3)

      await network.provider.send("evm_increaseTime", [86400]) // wait a day
      await network.provider.send("evm_mine")
    })

    it('The contributor should be reimbursed correctly', async function () {
      const balanceBeforeCancellation = await (await Pethreon.getContributorBalance()).toNumber()
      await Pethreon.cancelPledge(fooAddress)
      const balanceAfterCancellation = await (await Pethreon.getContributorBalance()).toNumber()

      expect(balanceAfterCancellation).to.equal(balanceBeforeCancellation + 2)
    })

    it('The pledge should should be deleted on the contributor\'s side', async function () {
      const pledgesBefore = await Pethreon.getContributorPledges() as PledgeType[]
      await Pethreon.cancelPledge(fooAddress)
      const pledgesAfter = await Pethreon.getContributorPledges() as PledgeType[]

      expect(pledgesBefore.length).to.equal(2)
      expect(pledgesAfter.length).to.equal(1)
      expect(pledgesAfter[0].creatorAddress).to.equal(barAddress)
    })

    it('The pledge should end abruptly on the creator\'s side', async function () {
      const pledgesBefore = await Pethreon.connect(foo).getCreatorPledges() as PledgeType[]
      const pledgeBefore = pledgesBefore[0]
      await Pethreon.cancelPledge(fooAddress)
      const pledges = await Pethreon.connect(foo).getCreatorPledges() as PledgeType[]
      const pledge = pledges[0]

      expect(pledge.periodExpires).to.equal(await (pledgeBefore.periodExpires).toNumber() - 2)
      expect(pledge.status).to.equal(1)
    })

    it('The creator should not get any of the cancelled payments', async function () {
      const creatorBalanceBefore = await Pethreon.connect(foo).getCreatorBalance()
      await Pethreon.cancelPledge(fooAddress)
      await network.provider.send("evm_increaseTime", [86400 * 5])
      await network.provider.send("evm_mine")
      const creatorBalanceAfter = await Pethreon.connect(foo).getCreatorBalance()

      expect(creatorBalanceBefore).to.equal(creatorBalanceAfter)
    })
  })
});