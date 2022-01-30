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

/**
|--------------------------------------------------
| The following is how the hardhat-deploy plugin does it
| not sure if I want to use it yet or if I'll stick to vanilla
|--------------------------------------------------
*/


// import { HardhatRuntimeEnvironment } from 'hardhat/types';
// import { DeployFunction } from 'hardhat-deploy/types';
// import "../hardhat.config"

// /**
//  * 
//  * @args - the amount of seconds each payment period should be processed in (daily 86400, weekly 604800, months)
//  */
// const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
//   const { deployments, getNamedAccounts } = hre;
//   const { deploy } = deployments;
//   const { deployer } = await getNamedAccounts();

//   await deploy('Pethreon', {
//     from: deployer,
//     args: [86400], 
//     log: true,
//   });
// };

