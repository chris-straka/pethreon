import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy-ethers";
import "hardhat-deploy";
import "ethereum-waffle"
import '@typechain/hardhat';

const INFURA_MAINNET_API = 'https://mainnet.infura.io/v3/5934efc92cb841e4ac589e7c070d6975'
const INFURA_TESTNET_API = 'https://rinkeby.infura.io/v3/5934efc92cb841e4ac589e7c070d6975'

const config: HardhatUserConfig = {
  typechain: {
    outDir: "../frontend/src/types",
    target: "ethers-v5"
  },
  namedAccounts: {
    deployer: 0,
    first: 1
  },
  networks: {
    hardhat: {
      chainId: 31337,
      accounts: {
        mnemonic: "test test test test test test test test test test test junk"
      },
    },
  },
  solidity: "0.8.6",
}

export default config