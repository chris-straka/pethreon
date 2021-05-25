import "@nomiclabs/hardhat-ethers" // stops the error
import { ethers } from 'hardhat';
import { expect } from 'chai';
import { ContractFactory, Contract, Signer } from 'ethers';

describe("Pethreon", () => {
  let PethreonFactory: ContractFactory
  let Pethreon: Contract
  let owner: Signer // 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
  let addr1: Signer // 0x70997970C51812dc3A010C7d01b50e0d17dc79C8

  beforeEach(async () => {
    PethreonFactory = await ethers.getContractFactory('Pethreon');
    Pethreon = await PethreonFactory.deploy(1);
    [owner, addr1] = await ethers.getSigners()
  })

  describe("The owner's balance", async () => {
    it("should start at 0", async () => {
      expect(await Pethreon.getContributorBalance()).to.equal(0)
    })

    it("should be able to deposit and remove 1 wei", async () => {
      await Pethreon.deposit({ value: 1 }) // value: ethers.utils.parseEther("") to add ether
      expect(await Pethreon.getContributorBalance()).to.equal(1)

      await Pethreon.withdrawAsContributor(1)
      expect(await Pethreon.getContributorBalance()).to.equal(0)
    })

    it("should be payable", async () => {
    })

  })
});