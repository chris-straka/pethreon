import { ContractFactory, Signer } from 'ethers';
import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Pethreon } from "../../../frontend/src/types/Pethreon";
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