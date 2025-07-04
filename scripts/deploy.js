const hre = require("hardhat");

async function main() {
  const NarcChain = await hre.ethers.getContractFactory("NarcChain");
  const contract = await NarcChain.deploy();
  await contract.deployed();
  console.log("NarcChain deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
