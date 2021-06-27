import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction, Deployment} from 'hardhat-deploy/types';
import 'hardhat-deploy/src/type-extensions' // prevents the error lol

export const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy('Pethreon', {
    from: deployer,
    args: [0],
    log: true,
  });
};