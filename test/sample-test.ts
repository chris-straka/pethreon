import { expect } from "chai";
import { ethers } from 'hardhat';

beforeEach(() => {
  it("Should load my contracts", )
})

describe("Wei Contract", function () {
  it("Should return a new greeting once changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");

    await greeter.deployed();
    expect(await greeter.greet()).to.equal("Hello, world!");

    await greeter.setGreeting("Hola, mundo!");
    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
