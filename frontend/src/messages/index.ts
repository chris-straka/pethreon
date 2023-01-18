/** 
 * If you include a link, make sure the href is the only attribute in that link
 * Otherwise my typewriter effect's "parseLinks" algorithm needs to be rewritten
 */

export const WALLET_FOUND = "This app uses your ethereum wallet to make subscriptions to creators"
export const WALLET_NOT_FOUND = "This app requires a metamask wallet to work, "
export const LOGGING_IN = "Logging in... You might have to click the metamask extension in your browser"

export const DOWNLOAD_METAMASK = "download metamask!"
export const METAMASK_LINK = "https://metamask.io/download"

export const WARNING_MESSAGE = `
1. This smart contract hasn't been professionally audited for security vulnerabilities. Please use at your own risk!

2. It will take time for this transaction to be mined on the blockchain, please be patient.

3. Creators might not get their payment on time (they might get it earlier or later). This is because Pethreon makes payments using "blocktime".

Ethereum mines 1 block every 10-19 seconds, which is roughly 4547-8640 blocks a day. Pethreon makes payments to people every 6500 blocks. 
`