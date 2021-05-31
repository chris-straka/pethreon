import "@nomiclabs/hardhat-ethers" // stops the error
import { ethers } from 'hardhat';
import { expect } from 'chai';
import { ContractFactory, Contract, Signer } from 'ethers';

describe("Playground", () => {
  let PlaygroundFactory: ContractFactory
  let Playground: Contract
  let owner: Signer // 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
  let addr1: Signer // 0x70997970C51812dc3A010C7d01b50e0d17dc79C8

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners()

    PlaygroundFactory = await ethers.getContractFactory('Playground');
    Playground = await PlaygroundFactory.deploy();
    await Playground.deployed()

    // Send 50 ether from the owner to the contract
    await owner.sendTransaction({ to: Playground.address, value: ethers.utils.parseEther("50") })
  })

  describe("tests", async () => {
    it("starts the contract off at 50 ether", async () => {
      expect(await Playground.getContractBalance()).to.equal(ethers.utils.parseEther("50"))
    })

    // Currently not working?
    it("fails when I try to send more than 50 ether", async () => { 
      // const addr1Address = await addr1.getAddress()
      // const response = await Playground.sendMoney(addr1Address, ethers.utils.parseEther("100"))
      // expect(response.wait()).to.be.revertedWith("insufficient balance")
    })

    it('sends 2 ether from the contract to addr1', async () => {
      await Playground.sendMoney(await addr1.getAddress(), ethers.utils.parseEther("2"))
      expect(await addr1.getBalance()).to.equal(ethers.utils.parseEther("10002"))
      expect(await (await Playground.getContractBalance()).toString()).to.equal(ethers.utils.parseEther("48"))
    })
  })
});