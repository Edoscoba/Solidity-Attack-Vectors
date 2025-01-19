// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EtherGame {
  uint public targetAmount = 3 ether;

  address public winner;
  
  function deposit() external payable {

    require(msg.value == 1 ether,"you can only send 1 ether");

    uint balance = address(this).balance;
    require(balance <= targetAmount,"game is over");

  if (balance == targetAmount) {
    winner = msg.sender;
  }
  }
  
  function claimReward() external {
    require(msg.sender == winner,"not winner");

    (bool success,)= msg.sender.call{value: targetAmount}("");
    require(success,"transfer failed");
  }

  function getBalance() external view returns (uint256) {
    return address(this).balance;
  }
}