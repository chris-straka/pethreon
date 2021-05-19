import "@nomiclabs/hardhat-ethers" // stops the error
import { ethers } from 'hardhat';
import { expect } from 'chai';

describe("Pethreon", function () {
  it("Creates the contract", async function () {
    const Pethreon = await ethers.getContractFactory("Pethreon");
    const pethreon = await Pethreon.deploy();

    await pethreon.deployed();
    console.log("Pethreon Deployed")
  });
});