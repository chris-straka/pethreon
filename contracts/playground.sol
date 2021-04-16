// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;
import "hardhat/console.sol";

contract Token {
    string public name = "My Hardhat Token";
    string public symbol = "MHT";
    uint256 public totalSupply = 1000000;
    address public owner;

    mapping(address => uint256) balances;

    constructor() {
        console.log("\n totalSupply of 100000 is assigned to", msg.sender);
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint256 amount) external {
        console.log("Sending ", amount);
        console.log("From ", msg.sender);
        console.log("to ", to);
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
