import * as dotenv from "dotenv"
dotenv.config()

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

/** 
 * I have a .env file in this directory
 */
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
  },
  typechain: {
    outDir: "frontend/typechain-types"
  },
  networks: {
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`,
      accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`],
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_ID}`,
      accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`],
    }
  }
};

export default config;
