import { ContractFactory, Signer } from 'ethers';
import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Pethreon } from "../../../frontend/src/types";
import "@nomiclabs/hardhat-ethers" // stops the error until I figure it out

describe("Pethreon", () => {
  let PethreonFactory: ContractFactory
  let Pethreon: Pethreon

  beforeEach(async () => {
    PethreonFactory = await ethers.getContractFactory('Pethreon')
    Pethreon = await PethreonFactory.deploy(86400) as Pethreon
  })

  describe("Deposit and Withdraw Tests", async () => {
    it("Should deposit and withdraw 1 ether", async () => {
      expect(await Pethreon.getContributorBalanceInWei()).to.equal(0)

      await Pethreon.deposit({ value: 100 })
      expect(await Pethreon.getContributorBalanceInWei()).to.equal(100)

      await Pethreon.contributorWithdraw(100)
      expect(await Pethreon.getContributorBalanceInWei()).to.equal(0)
    })
  })
})