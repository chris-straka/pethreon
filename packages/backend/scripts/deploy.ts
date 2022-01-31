import "@nomiclabs/hardhat-ethers" // stops the error
import { ethers } from "hardhat"

async function main() {
  const PethreonFactory = await ethers.getContractFactory("Pethreon");
  const pethreon = await PethreonFactory.deploy(86400);

  await pethreon.deployed();
  console.log("Pethreon deployed to: ", pethreon.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });