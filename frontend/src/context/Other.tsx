// import { createContext, Dispatch, ReactNode, useReducer, Reducer } from "react";
// import { Pethreon__factory, Pethreon, } from "../typechain-types";
// import { ethers } from "ethers"

// type Web3Provider = ethers.providers.Web3Provider

// type Web3ContextType = {
//   provider: Web3Provider | null
//   contract: Pethreon | null
// }

// type Web3DispatchContextType = Dispatch<ACTIONTYPE> | null

// const initialState = {
//   provider: null,
//   contract: null,
// }

// export const Web3Context = createContext<Web3ContextType>(initialState);
// export const Web3DispatchContext = createContext<Web3DispatchContextType>(null);

// type ACTIONTYPE = { type: "setWeb3", payload: Web3Provider };

// function web3Reducer(_: Web3ContextType, action: ACTIONTYPE): Web3ContextType {
//   switch (action.type) {
//     case "setWeb3": {
//       const provider = action.payload
//       const signer = provider.getSigner()
//       const contract = Pethreon__factory.connect(import.meta.env.VITE_CONTRACT_ADDRESS, signer)
//       return { provider, contract }
//     }
//     default: {
//       throw new Error("Action not found")
//     }
//   }
// }

// export const Web3ContextProvider = ({ children }: { children: ReactNode }) => {
//   const [web3, dispatch] = useReducer(web3Reducer, initialState)

//   return (
//     <Web3Context.Provider value={web3}>
//       <Web3DispatchContext.Provider value={dispatch}>
//         {children}
//       </Web3DispatchContext.Provider>
//     </Web3Context.Provider>
//   )
// }

export const Other = () => <p>hey</p>