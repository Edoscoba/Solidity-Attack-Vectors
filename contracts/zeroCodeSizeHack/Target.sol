// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Target {
    bool public pwnd = false;
  function isContract(address account) public view returns (bool) {
    uint size;

    assembly {
      size := extcodesize(account)
    }
    return size > 0;
  }

  function protected() public {
    require(!isContract(msg.sender), "no contract allowed");
    pwnd = true;
  }


}