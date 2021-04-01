// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

contract Wallet {
    mapping(address => uint8) public balances;

    function deposit() public payable {
        balances[msg.sender] = balances[msg.sender] + uint8(msg.value);
    }

    function withdraw(uint8 a) public {
        require(balances[msg.sender] - a >= 0, "withdrawing too much");
        balances[msg.sender] = balances[msg.sender] - uint8(a);
        payable(msg.sender).transfer(a);
    }

    function balanceOf() public view returns (uint8) {
        return balances[msg.sender];
    }
}
