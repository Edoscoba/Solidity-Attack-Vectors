// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Wallet {
  address public owner;

  constructor() {
    owner = msg.sender;
  }

function deposit() public payable{}
receive() external payable {}
  function transfer(address _to, uint _amount) public {
    require(tx.origin == owner, "not owner");
    (bool sent,) = _to.call{value: _amount}("");
    require(sent, "transfer failed");
}

function checkBalance() public view returns (uint) {
    return address(this).balance;
}

}