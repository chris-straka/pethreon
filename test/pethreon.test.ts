import "@nomiclabs/hardhat-ethers" // stops the error
import { ethers, network } from 'hardhat';
import { expect } from 'chai';
import { ContractFactory, Signer } from 'ethers';
import { Pethreon } from "../frontend/src/types/Pethreon";
import { PledgeType } from "../frontend/src/pethreon"

describe("Pethreon", () => {
  let PethreonFactory: ContractFactory
  let Pethreon: Pethreon
  let owner: Signer
  let foo: Signer
  let bar: Signer
  let ownerAddress: string // 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
  let fooAddress: string   // 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
  let barAddress: string   // 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
  let oneEther = ethers.utils.parseEther("1");
  let oneWei = 1

  beforeEach(async () => {
    PethreonFactory = await ethers.getContractFactory('Pethreon');
    Pethreon = <Pethreon>await PethreonFactory.deploy(86400);
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

  describe("Pledge", async () => {
    it("Should create a pledge", async () => {
      await Pethreon.deposit({ value: oneEther })
      await Pethreon.createPledge(fooAddress, 1, 3)

      const pledges = await Pethreon.getContributorPledges() as PledgeType[]
      const pledge = pledges[0]

      const weiPerPeriod = await pledge.weiPerPeriod.toNumber()
      const expirationDate = await pledge.periodExpires.toNumber()
      const currentPeriod = await (await Pethreon.currentPeriod()).toNumber()

      expect(weiPerPeriod).to.equal(oneWei)
      expect(expirationDate - currentPeriod).to.equal(3)
    })

    it("The creator should be receiving money in the correct increments", async () => {
      expect(await Pethreon.connect(foo).getCreatorBalance()).to.equal(0)
      await Pethreon.deposit({ value: oneEther })
      await Pethreon.createPledge(fooAddress, 1, 3)

      expect(await Pethreon.connect(foo).getCreatorBalance()).to.equal(0)
      expect(await (await Pethreon.currentPeriod()).toNumber()).to.equal(0) // hasn't been a day yet

      await network.provider.send("evm_increaseTime", [86400])
      await network.provider.send("evm_mine")
      expect(await Pethreon.connect(foo).getCreatorBalance()).to.equal(1)
      expect(await (await Pethreon.currentPeriod()).toNumber()).to.equal(1)

      await network.provider.send("evm_increaseTime", [86400])
      await network.provider.send("evm_mine")
      expect(await Pethreon.connect(foo).getCreatorBalance()).to.equal(2)
      expect(await (await Pethreon.currentPeriod()).toNumber()).to.equal(2)

      await network.provider.send("evm_increaseTime", [86400])
      await network.provider.send("evm_mine")
      expect(await Pethreon.connect(foo).getCreatorBalance()).to.equal(3)
      expect(await (await Pethreon.currentPeriod()).toNumber()).to.equal(3)
    })

    it("The creator should be able to withdraw money sent in from two contributors", async () => {
      await Pethreon.deposit({ value: oneEther })
      await Pethreon.createPledge(barAddress, 1, 3)
      await Pethreon.connect(foo).deposit({ value: oneEther })
      await Pethreon.connect(foo).createPledge(barAddress, 1, 3)

      const pledges = await Pethreon.connect(bar).getCreatorPledges()
      expect(pledges.length).to.equal(2)
      expect(await Pethreon.connect(bar).getCreatorBalance()).to.equal(0)

      await network.provider.send("evm_increaseTime", [86400 * 3])
      await network.provider.send("evm_mine")

      expect(await Pethreon.connect(bar).getCreatorBalance()).to.equal(6)
      await Pethreon.connect(bar).creatorWithdraw()
      expect(await Pethreon.connect(bar).getCreatorBalance()).to.equal(0)
    })

    it("Should remove the pledge from the list", async () => {
      await Pethreon.deposit({ value: oneEther })
      await Pethreon.createPledge(fooAddress, 1, 3)
      await Pethreon.createPledge(barAddress, 1, 3)

      const pledgesBefore = await Pethreon.getContributorPledges() as PledgeType[]

      await Pethreon.deletePledge(fooAddress)

      const pledgesAfter = await Pethreon.getContributorPledges() as PledgeType[]

      await Pethreon.deletePledge(fooAddress)

      const pledgesAfterAfter = await Pethreon.getContributorPledges() as PledgeType[]

      console.log(pledgesAfterAfter.length)

    })
  })
});