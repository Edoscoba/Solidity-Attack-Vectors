// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ClaimOwner {
  address public owner;
  
  uint public balance;

  function claimOwner() public payable{
    require(msg.value > balance, "need to pay more to become the owner");

    (bool sent,) = owner.call{value: balance}("");
    require(sent);

    balance = msg.value;
    owner = msg.sender;
  }

function currentOwner() external view returns(address){
  return owner;
}

function currentBal() external view returns(uint){
  return balance;
}
}