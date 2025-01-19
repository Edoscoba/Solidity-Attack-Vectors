// scripts/interact.js
const hre = require("hardhat");

async function main() {
  // Deploy the Target contract
  const TargetFactory = await hre.ethers.getContractFactory("Target");
  const targetContract = await TargetFactory.deploy();
  await targetContract.waitForDeployment();
  console.log(`Target contract deployed to: ${targetContract.address}`);

  // Deploy the FailedAttack contract
  const FailedAttackFactory = await hre.ethers.getContractFactory("FailedAttack");
  const failedAttackContract = await FailedAttackFactory.deploy();
  await failedAttackContract.waitForDeployment();
  console.log(`FailedAttack contract deployed to: ${failedAttackContract.target}`);

  // Deploy the Hack contract
  const HackFactory = await hre.ethers.getContractFactory("Hack");
  const hackContract = await HackFactory.deploy(targetContract.address);
  await hackContract.waitForDeployment();
  console.log(`Hack contract deployed to: ${hackContract.target}`);

  // Check the initial state of the Target contract
  const initialPwnd = await targetContract.pwnd();
  console.log(`Initial pwnd state: ${initialPwnd}`);

  // Attempt to call the protected function using the FailedAttack contract
  try {
    await failedAttackContract.pwn(targetContract.address);
  } catch (error) {
    console.log(`FailedAttack: ${error.message}`);
  }

  // Attempt to call the protected function using the Hack contract
  await hackContract.deployTransaction.wait();
  const pwndState = await targetContract.pwnd();
  console.log(`pwnd state after hack: ${pwndState}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });