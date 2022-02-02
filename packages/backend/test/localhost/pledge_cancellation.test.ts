import { ContractFactory, Signer } from 'ethers';
import { Pethreon } from "../../frontend/src/types/Pethreon";
import { ethers, network } from 'hardhat';
import { expect } from 'chai';
import { PledgeType } from "./types"
import "@nomiclabs/hardhat-ethers" // stops the error until I figure it out

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

  describe("Pledge Deletion Tests", async () => {
    beforeEach(async () => {
      await Pethreon.deposit({ value: 10 })
      await Pethreon.createPledge(fooAddress, 1, 3)
    })

    it("The contributor should be reimbursed correctly", async function () {
      const balanceBeforeCancellation = await (await Pethreon.getContributorBalanceInWei()).toNumber()
      await Pethreon.cancelPledge(fooAddress)
      const balanceAfterCancellation = await (await Pethreon.getContributorBalanceInWei()).toNumber()

      expect(balanceAfterCancellation).to.equal(balanceBeforeCancellation + 3)
    })

    it('The pledge should should be deleted on the contributor\'s side', async function () {
      const pledgesBefore = await Pethreon.getContributorPledges() as PledgeType[]
      await Pethreon.cancelPledge(fooAddress)
      const pledgesAfter = await Pethreon.getContributorPledges() as PledgeType[]

      expect(pledgesBefore.length).to.equal(1)
      expect(pledgesAfter.length).to.equal(0)
    })

    it('The pledge should be cancelled on the creator\'s side', async function () {
      const beforeCancellation = await Pethreon.connect(foo).getCreatorPledges() as PledgeType[]
      expect(beforeCancellation.length).to.equal(1)
      await Pethreon.cancelPledge(fooAddress)

      const afterCancellation = await Pethreon.connect(foo).getCreatorPledges() as PledgeType[]
      expect(afterCancellation.length).to.equal(0)
      expect(await (await Pethreon.connect(foo).getExpiredPledges()).length).to.equal(1)
    })

    it('The creator should not get any of the cancelled payments', async function () {
      const creatorBalanceBefore = await Pethreon.connect(foo).getCreatorBalanceInWei()
      expect(creatorBalanceBefore).to.equal(0)

      await Pethreon.cancelPledge(fooAddress)
      await network.provider.send("evm_increaseTime", [86400 * 5])
      await network.provider.send("evm_mine")

      const creatorBalanceAfter = await Pethreon.connect(foo).getCreatorBalanceInWei()
      expect(creatorBalanceBefore).to.equal(creatorBalanceAfter)
    })
  })
});