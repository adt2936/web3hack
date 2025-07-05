const hre = require("hardhat");

async function main() {
  const NarcChain = await hre.ethers.getContractFactory("NarcChain");
  const contract = await NarcChain.deploy();

  await contract.waitForDeployment(); // ✅ Replaces contract.deployed()
  const address = await contract.getAddress(); // ✅ Ethers v6

  console.log("NarcChain deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
