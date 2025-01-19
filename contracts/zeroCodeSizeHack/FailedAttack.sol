// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./Target.sol";
contract FailedAttack {
  function pwn(address _target) external {
    Target(_target).protected();
  }
}