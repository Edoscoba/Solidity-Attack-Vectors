const { ethers } = require("hardhat");

async function main() {
  // Deploy Bar contract
  const Bar = await ethers.getContractFactory("Bar");
  const bar = await Bar.deploy();
  await bar.waitForDeployment();
  console.log("Bar contract deployed to:", bar.target);

  // Deploy Foo contract
  const Foo = await ethers.getContractFactory("Foo");
  const fooContract = await Foo.deploy(bar.target);
  await fooContract.waitForDeployment();
  console.log("Foo contract deployed to:", fooContract.target);

  // Deploy Mal contract
  const Mal = await ethers.getContractFactory("Mal");
  const malContract = await Mal.deploy(bar.target);
  await malContract.waitForDeployment();
  console.log("Mal contract deployed to:", malContract.target);

  // Call callBar function on Foo contract
  await fooContract.callBar();
  console.log("Called callBar function on Foo contract");

  // Call callBar function on Mal contract
  await malContract.callBar();
  console.log("Called callBar function on Mal contract");

  // Verify log events
  const logEventBar = await bar.queryFilter("Log");
  console.log("Log event on Bar contract:", logEventBar[0].args.message);

  const logEventMal = await malContract.queryFilter("Log");
  console.log("Log event on Mal contract:", logEventMal[0].args.message);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });