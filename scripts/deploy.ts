import { ethers } from "hardhat"

async function main() {
  const PethreonFactory = await ethers.getContractFactory("Pethreon");
  const dailyPayments = 60 * 60 * 24
  const pethreon = await PethreonFactory.deploy(dailyPayments);

  await pethreon.deployed();
  console.log("Pethreon deployed to: ", pethreon.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });