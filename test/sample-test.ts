import { expect } from "chai";
import { ethers } from 'hardhat';

describe("Wallet", function () {
  it("should create my contract", async function () {
    const Wallet = await ethers.getContractFactory("Wallet");
    console.log(Wallet)
  })
});
