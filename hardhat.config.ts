import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
  },
  typechain: {
    outDir: "frontend/typechain-types"
  },
  // networks: {
  //   sepolia: {
  //     url: `${process.env.INFURA_SEPOLIA_URL}`,
  //     accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`],
  //   }
  // }
};

export default config;
