// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "hardhat/console.sol";
contract TimeLock {
 mapping (address => uint256) balances;
 mapping(address => uint256)  lockTime;

 function deposit() external payable {
    balances[msg.sender] += msg.value;
    lockTime[msg.sender] = block.timestamp + 1 weeks;
 }

 function increaseTime(uint256 _secondsToIncrease) external {
    unchecked {
        lockTime[msg.sender] += _secondsToIncrease;
    }
}


function withdraw() external {
    require(balances[msg.sender] > 0, "Insufficient balance");
    require(block.timestamp >= lockTime[msg.sender], "Time lock not expired");

    uint256 amount = balances[msg.sender];
    balances[msg.sender] = 0;

    // Log the transfer attempt
    console.log("Transferring amount:", amount);

    (bool success,) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed");

    console.log("Transfer successful");
}


 function getLockTime(address _owner) public view returns (uint256) {
    return lockTime[_owner];
  }

  function getBalance(address _owner) public view returns (uint256) {
    return balances[_owner];
  }

}