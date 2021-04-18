import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('It transfers money from signer 0 to signer 1', async () => {
  let signers = await ethers.getSigners()
  let Play = await ethers.getContractFactory('Playground')
  let play = await Play.deploy()
  console.log('heeeeeeeeeeeeeeeeeeeeeee')
  await play.deployed()
})