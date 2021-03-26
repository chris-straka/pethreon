//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0;

import "hardhat/console.sol";

/*
Creator: 
  1. Can post their ethereum address
  2. Receives payments from contributors

Contributor:
  1. Can make recurring payments to a creator
  2. Can make payments to all creators
*/ 

contract WeiBuddies {

  // EVENTS
  event pledgeCreated();
  event pledgeCancelled();

  constructor() { }

  struct Pledge { }

  function createPledge() {}

  function createUniPledge() {}

  function cancelPledge() {}

}
