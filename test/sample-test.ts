import { expect } from "chai";
import { ethers } from 'hardhat';

describe("Wallet", function () {
  it("should create my contract", async function () {
    const Wallet = await ethers.getContractFactory("Wallet");
    const wallet = await Wallet.deploy()
    console.log(wallet)

    // await greeter.deployed();

    // expect(await greeter.method().to.equal(""))
  })
});