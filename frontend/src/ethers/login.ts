import { EthereumWindow } from "./utility";

export async function login() {
  const { ethereum } = window as EthereumWindow
  if (typeof ethereum === undefined) window.alert("Couldn't find an ethereum wallet")
  try {
    await ethereum.request({ method: 'eth_requestAccounts' });
  } catch (error) {
    window.alert(`Couldn't login: ${error}`)
  }
}