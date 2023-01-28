/** 
 * Checks localStorage for a wallet and returns it if found
 */
export const useLocalWallet = () => {
  const wallet = localStorage.getItem('wallet')
  return wallet ? JSON.parse(wallet) : null
}