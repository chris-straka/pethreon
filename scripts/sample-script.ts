import { ethers } from "hardhat"

async function main() {
  const PethreonFactory = await ethers.getContractFactory("Pethreon");
  const pethreon = await PethreonFactory.deploy(0);

  await pethreon.deployed();
  console.log("Greeter deployed to: ", pethreon.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
 });