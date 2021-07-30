export interface EthereumWindow extends Window {
  ethereum?: any
}

export const PETHREON_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

export async function login() {
  const { ethereum } = window as EthereumWindow
  if (typeof ethereum === undefined) window.alert("Couldn't find an ethereum wallet")
  try {
    await ethereum.request({ method: 'eth_requestAccounts' });
  } catch (error) {
    window.alert(`Couldn't login: ${error}`)
  }
}