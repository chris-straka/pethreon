import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy-ethers";
import "hardhat-deploy";
import "hardhat-typechain";
import "@typechain/ethers-v5";

task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const INFURA_API = 'https://mainnet.infura.io/v3/5934efc92cb841e4ac589e7c070d6975'

const config: HardhatUserConfig = {
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
    // hardhat: {
    //   accounts: [
    //     {
    //       balance: "10000000000000000000000",
    //       privateKey:
    //         "0xe87d780e4c31c953a68aef2763df56599c9cfe73df4740fc24c2d0f5acd21bae",
    //     },
    //   ],
    // },
  },
  solidity: "0.7.6",
  paths: {
    artifacts: "./frontend/src/artifacts"
  }
}

export default config