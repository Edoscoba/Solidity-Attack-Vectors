// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;  

contract Bar {
  event Log(string message);


  function log() public {
    emit Log("bar was called");

  }
}


contract Foo {
  Bar bar;
  constructor(address _bar) {
    bar = Bar(_bar);
  }

  function callBar() public {
    bar.log();
  }
}