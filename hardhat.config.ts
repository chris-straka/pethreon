import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
  },
  typechain: {
    outDir: "frontend/typechain-types"
  }
};

export default config;
