/** 
 * My typewriter can only handle one link in a single message at a time
 */

export const WALLET_FOUND = "This app uses your ethereum wallet to make monthly payments to creators"
export const WALLET_FOUND_ALT = "This app uses your ethereum wallet to make subscriptions to creators"
export const LOGGING_IN = "Logging in..."
export const WALLET_NOT_FOUND = "This app requires a metamask wallet to work, <a href=\"https://metamask.io/download\">download metamask!</a>"

export const WARNING_MESSAGE = `
1. This smart contract has not been professionally audited for security vulnerabilities. Please use at your own risk!

2. It will take time for your transaction to be mined on the blockchain, please be patient.

3. Creators might not get their payment on time (they might get it earlier or later). This is because Pethreon makes payments using "blocktime".

Ethereum mines 1 block every 10-19 seconds, which is roughly 4547-8640 blocks a day. Pethreon makes payments to people every 6500 blocks. 
`