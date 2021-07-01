import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy-ethers";
import "hardhat-deploy";
import "hardhat-typechain";
import "@typechain/ethers-v5";

const INFURA_API = 'https://mainnet.infura.io/v3/5934efc92cb841e4ac589e7c070d6975'

const config: HardhatUserConfig = {
  typechain: {
    outDir: "./frontend/src/types"
  },
  namedAccounts: {
    deployer: 0,
    goofy: 1
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
      },
    },
  },
  solidity: "0.7.6",
  paths: {
    deployments: "./frontend/src/artifacts"
  }
}

export default config