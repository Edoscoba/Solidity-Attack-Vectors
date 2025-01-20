// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./HidingMalicousCode.sol";
contract Mal{
  Bar bar;
  
  event Log(string message);
  constructor(address _bar) {
    bar = Bar(_bar);
  }

  function callBar() public {
    bar.log();
  }

   function log() public {
    emit Log("bar was called, but this is malicious code");

  }

}