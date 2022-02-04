import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "ethereum-waffle";
import "@typechain/hardhat";
import "dotenv/config";

const config: HardhatUserConfig = {
  typechain: {
    outDir: "../frontend/src/types",
    target: "ethers-v5"
  },
  networks: {
    localhost: {
      chainId: 31337,
      accounts: {
        mnemonic: "test test test test test test test test test test test junk"
      },
    },
    // rinkeby: {
    //   url: `${process.env.RINKEBY_INFURA_API}`,
    //   accounts: [`0x${process.env.RINKEBY_PRIVATE_KEY}`]
    // }
  },
  solidity: "0.8.9",
}

export default config