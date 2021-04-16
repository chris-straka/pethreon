import { expect } from "chai";
import { ethers } from 'hardhat';

describe("Token Contract", function () {
  let Token
  let token
  let owner
  let addresses
  let firstGuy

  beforeEach("Deploy the contract", async function () {
    Token = await ethers.getContractFactory("Perthreon");
    [owner, firstGuy, ...addresses] = await ethers.getSigners();
    token = await Token.deploy(0); // period 0
  })

  describe("Make a deposit", function () { })

});