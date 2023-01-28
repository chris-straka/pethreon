/** 
 * My typewriter can only handle one link in a single message at a time
 */

export const GREETINGS = "This app uses your ethereum wallet to make subscriptions to creators"
export const LOGGING_IN = "Logging in..."
export const WALLET_NOT_FOUND = "This app requires a metamask wallet to work, <a href=\"https://metamask.io/download\">download metamask!</a>"

export const DISCLAIMER = `
1. This smart contract has not yet been professionally audited for security vulnerabilities. Please use at your own risk!

2. This smart contract is not yet on the ethereum mainnet. It's on the sepolia testnet for now. 

3. It will take time for your transaction to be mined on the blockchain, please be patient.

4. Creators might not get their payments on time (they might get it earlier or later). This is because Pethreon makes payments using "blocktime".

Pethreon makes payments to people every 6500 blocks. Ethereum mines 1 block every 10-19 seconds, so ~4547-8640 blocks a day.
`