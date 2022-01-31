import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "ethereum-waffle";
import '@typechain/hardhat';

const INFURA_MAINNET_API = 'https://mainnet.infura.io/v3/5934efc92cb841e4ac589e7c070d6975'
const INFURA_TESTNET_API = 'https://rinkeby.infura.io/v3/5934efc92cb841e4ac589e7c070d6975'

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
    //   url: "https://rinkeby.infura.io/v3/5934efc92cb841e4ac589e7c070d6975",
    //   accounts: [`0x${process.env.RINKEBY_DEPLOYMENT_ACCOUNT}`]
    // }
  },
  // paths: {
  //   artifacts: '../frontend/src/artifacts'
  // },
  solidity: "0.8.6",
}

export default config