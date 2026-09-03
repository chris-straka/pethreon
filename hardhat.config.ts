import * as dotenv from "dotenv"
dotenv.config()

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition-ethers"

/**
 * Secrets live in a .env file next to this one (see .env.example).
 *
 * Everything needed for local development is optional: `npx hardhat compile`
 * and `npx hardhat test` work with no .env at all. Only deploying to Sepolia
 * needs real credentials, so that network is registered only when they exist.
 */
const { DEVELOPMENT_SEED_PHRASE, INFURA_ID, WALLET_PRIVATE_KEY } = process.env

// Hardhat's own well-known test mnemonic. Never put real funds on it.
const DEFAULT_TEST_MNEMONIC =
  "test test test test test test test test test test test junk"

const canDeployToSepolia = Boolean(INFURA_ID && WALLET_PRIVATE_KEY)

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.30",
    settings: {
      optimizer: { enabled: true, runs: 200 },
      // 0.8.30's default EVM version is "prague"; pin it so builds stay
      // reproducible and deployable to chains that haven't adopted it yet.
      evmVersion: "cancun",
    },
  },
  typechain: {
    outDir: "frontend/typechain-types"
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: DEVELOPMENT_SEED_PHRASE || DEFAULT_TEST_MNEMONIC
      },
      chainId: 1337
    },
    ...(canDeployToSepolia && {
      sepolia: {
        url: `https://sepolia.infura.io/v3/${INFURA_ID}`,
        accounts: [`0x${WALLET_PRIVATE_KEY!.replace(/^0x/, "")}`],
      }
    })
  }
};

export default config;
