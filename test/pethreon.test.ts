import "@nomiclabs/hardhat-ethers" // stops the error
import { ethers } from 'hardhat';
import { expect } from 'chai';
import { ContractFactory, Signer } from 'ethers';
import { Pethreon } from "../frontend/src/types/Pethreon";

describe("Pethreon", () => {
  let PethreonFactory: ContractFactory
  let Pethreon: Pethreon
  let owner: Signer // 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
  let person1: Signer // 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
  let addr1: string;
  let oneEther = ethers.utils.parseEther("1");

  beforeEach(async () => {
    PethreonFactory = await ethers.getContractFactory('Pethreon');
    Pethreon = <Pethreon>await PethreonFactory.deploy(6400);
    [owner, person1] = await ethers.getSigners()
    addr1 = await person1.getAddress()
  })

  describe("owner tests", async () => {

    it("should be able to deposit and remove 1 ether", async () => {
      expect(await Pethreon.getContributorBalance()).to.equal(0)

      await Pethreon.deposit({ value: oneEther })
      expect(await Pethreon.getContributorBalance()).to.equal(oneEther)

      await Pethreon.withdrawAsContributor(oneEther)
      expect(await Pethreon.getContributorBalance()).to.equal(0)
    })

    it("should be able to pledge 1 ether 3x over three months", async () => {
      // deposit three ether
      await Pethreon.deposit({ value: ethers.utils.parseEther("3") })
      expect(await Pethreon.getContributorBalance()).to.equal(ethers.utils.parseEther("3"))

      // pledge 1 ether 3x over three months
      await Pethreon.createPledge(addr1, oneEther, 3)
      expect(await Pethreon.getContributorBalance()).to.equal(0)
      expect(await Pethreon.getCreatorBalance()).to.equal(0)

      // the owner should now have a pledge to addr1
      let [etherPerPeriod, periods] = await Pethreon.myPledgeTo(addr1)
      expect(etherPerPeriod).to.equal(oneEther)
      expect(periods).to.equal(3)

      // TODO: Figure a way to make the time transpire

    })

    it("should be able to cancel a pledge after making one", async () => {
      await Pethreon.deposit({ value: ethers.utils.parseEther("3") })
      await Pethreon.createPledge(addr1, oneEther, 3)
      await Pethreon.cancelPledge(addr1)
    })
  })
});