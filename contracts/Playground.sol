// SPDX-License-Identifier: MIT

pragma solidity 0.7.6;

import "hardhat/console.sol";

contract Playground {
    address owner;

    receive() external payable {}

    constructor () {
       owner = msg.sender; 
    }    

    function sendMoney (address payable guy, uint amount) public payable {
        // require(getContractBalance() >= amount, "not enough money");
        (bool success, ) = guy.call{value: amount}("");
        require(success, 'insufficient balance');
    }

    function getContractBalance() public view returns (uint256 balance) {
        return address(this).balance;
    }
}