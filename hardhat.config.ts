import * as dotenv from "dotenv"
dotenv.config()

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition-ethers"

/** 
 * I have a .env file in this directory
 */
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
  },
  typechain: {
    outDir: "frontend/typechain-types"
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: process.env.DEVELOPMENT_SEED_PHRASE
      },
      chainId: 1337
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_ID}`,
      accounts: [`0x${process.env.WALLET_PRIVATE_KEY}`],
    }
  }
};

export default config;
