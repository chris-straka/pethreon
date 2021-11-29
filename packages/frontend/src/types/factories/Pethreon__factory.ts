/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  Overrides,
  BigNumberish,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Pethreon, PethreonInterface } from "../Pethreon";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_period",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "period",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "contributor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ContributorDeposited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "period",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "contributor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ContributorWithdrew",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "period",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creatorAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "CreatorWithdrew",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "period",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creatorAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "contributor",
        type: "address",
      },
    ],
    name: "PledgeCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "period",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creatorAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "contributor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "weiPerPeriod",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "periods",
        type: "uint256",
      },
    ],
    name: "PledgeCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_creatorAddress",
        type: "address",
      },
    ],
    name: "cancelPledge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "contributorWithdraw",
    outputs: [
      {
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_creatorAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_weiPerPeriod",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_periods",
        type: "uint256",
      },
    ],
    name: "createPledge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "creatorWithdraw",
    outputs: [
      {
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "currentPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "periodNumber",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [
      {
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getContributorBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getContributorPledges",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "creatorAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "contributorAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "weiPerPeriod",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "dateCreated",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "periodExpires",
            type: "uint256",
          },
          {
            internalType: "enum Pethreon.Status",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct Pethreon.Pledge[]",
        name: "allPledges",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCreatorBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCreatorPledges",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "creatorAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "contributorAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "weiPerPeriod",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "dateCreated",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "periodExpires",
            type: "uint256",
          },
          {
            internalType: "enum Pethreon.Status",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct Pethreon.Pledge[]",
        name: "allPledges",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getExpiredPledges",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "creatorAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "contributorAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "weiPerPeriod",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "dateCreated",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "periodExpires",
            type: "uint256",
          },
          {
            internalType: "enum Pethreon.Status",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct Pethreon.Pledge[]",
        name: "allPledges",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startOfEpoch",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200302438038062003024833981810160405281019062000037919062000063565b426001819055508060008190555050620000be565b6000815190506200005d81620000a4565b92915050565b6000602082840312156200007c576200007b6200009f565b5b60006200008c848285016200004c565b91505092915050565b6000819050919050565b600080fd5b620000af8162000095565b8114620000bb57600080fd5b50565b612f5680620000ce6000396000f3fe6080604052600436106100a75760003560e01c80638197a398116100645780638197a398146101be5780638b104d82146101e9578063a432548514610214578063aa60145b1461023f578063d0e30db014610268578063ff8e08d514610286576100a7565b8063018aba3f146100ac57806306040618146100d557806339d78d23146101005780633cdb48c21461013d5780633f64c1ab1461016857806364ec8bdb14610193575b600080fd5b3480156100b857600080fd5b506100d360048036038101906100ce91906125d8565b6102b1565b005b3480156100e157600080fd5b506100ea610bf0565b6040516100f79190612993565b60405180910390f35b34801561010c57600080fd5b506101276004803603810190610122919061262b565b610c11565b6040516101349190612993565b60405180910390f35b34801561014957600080fd5b50610152610e21565b60405161015f9190612993565b60405180910390f35b34801561017457600080fd5b5061017d610e68565b60405161018a9190612993565b60405180910390f35b34801561019f57600080fd5b506101a8610e6e565b6040516101b59190612993565b60405180910390f35b3480156101ca57600080fd5b506101d3610fff565b6040516101e091906128b1565b60405180910390f35b3480156101f557600080fd5b506101fe6111aa565b60405161020b91906128b1565b60405180910390f35b34801561022057600080fd5b50610229611355565b6040516102369190612993565b60405180910390f35b34801561024b57600080fd5b50610266600480360381019061026191906125ab565b611429565b005b610270611730565b60405161027d9190612993565b60405180910390f35b34801561029257600080fd5b5061029b611851565b6040516102a891906128b1565b60405180910390f35b80826102bd9190612b4b565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561033e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161033590612913565b60405180910390fd5b808261034a9190612b4b565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546103989190612ba5565b925050819055506000600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b8282101561054157838290600052602060002090600702016040518060e00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282015481526020016003820154815260200160048201548152602001600582015481526020016006820160009054906101000a900460ff16600281111561051c5761051b612ce1565b5b600281111561052e5761052d612ce1565b5b8152505081526020019060010190610400565b50505050905060005b81518110156107d7578473ffffffffffffffffffffffffffffffffffffffff1682828151811061057d5761057c612d3f565b5b60200260200101516000015173ffffffffffffffffffffffffffffffffffffffff1614156107c4578181815181106105b8576105b7612d3f565b5b602002602001015160a001516105cc610bf0565b101561060d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610604906128d3565b60405180910390fd5b600082828151811061062257610621612d3f565b5b6020026020010151905060028160c00190600281111561064557610644612ce1565b5b9081600281111561065957610658612ce1565b5b81525050600560008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081908060018154018082558091505060019003906000526020600020906007020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155606082015181600301556080820151816004015560a0820151816005015560c08201518160060160006101000a81548160ff021916908360028111156107a7576107a6612ce1565b5b021790555050506107b7866119fc565b506107c186611f81565b50505b80806107cf90612c3a565b91505061054a565b5060006107e2610bf0565b905060008190505b83826107f69190612ac4565b8110156108775784600760008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000838152602001908152602001600020600082825461085d9190612ac4565b92505081905550808061086f90612c3a565b9150506107ea565b5060006040518060e001604052808773ffffffffffffffffffffffffffffffffffffffff1681526020013373ffffffffffffffffffffffffffffffffffffffff168152602001868152602001858152602001428152602001856108d8610bf0565b6108e29190612ac4565b8152602001600060028111156108fb576108fa612ce1565b5b8152509050600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081908060018154018082558091505060019003906000526020600020906007020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155606082015181600301556080820151816004015560a0820151816005015560c08201518160060160006101000a81548160ff02191690836002811115610a4a57610a49612ce1565b5b02179055505050600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081908060018154018082558091505060019003906000526020600020906007020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155606082015181600301556080820151816004015560a0820151816005015560c08201518160060160006101000a81548160ff02191690836002811115610b9b57610b9a612ce1565b5b021790555050507f8e09f18192ecfb9b3f5f9d5e64a99285daf66bbd42f237261ef72fa03590b2cd610bcb610bf0565b87338888604051610be09594939291906129e5565b60405180910390a1505050505050565b6000805460015442610c029190612ba5565b610c0c9190612b1a565b905090565b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115610c95576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c8c90612913565b60405180910390fd5b81600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610ce49190612ba5565b9250508190555060003373ffffffffffffffffffffffffffffffffffffffff1683604051610d119061289c565b60006040518083038185875af1925050503d8060008114610d4e576040519150601f19603f3d011682016040523d82523d6000602084013e610d53565b606091505b5050905080610d97576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d8e90612973565b60405180910390fd5b7fe91b2e1970531db1e757470f91918e5ae187999ac2ea50e4e37466d8c2f04095610dc0610bf0565b3385604051610dd193929190612a38565b60405180910390a1600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054915050919050565b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905090565b60015481565b600080610e79611355565b9050610e83610bf0565b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555060008111610f09576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f00906128f3565b60405180910390fd5b60003373ffffffffffffffffffffffffffffffffffffffff1682604051610f2f9061289c565b60006040518083038185875af1925050503d8060008114610f6c576040519150601f19603f3d011682016040523d82523d6000602084013e610f71565b606091505b5050905080610fb5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fac90612933565b60405180910390fd5b7ff2f5ee55e951acd7f51568e21f2f82e8b2b809ead086416336d5921757ab8e5a610fde610bf0565b3384604051610fef93929190612a38565b60405180910390a1819250505090565b6060600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b828210156111a157838290600052602060002090600702016040518060e00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282015481526020016003820154815260200160048201548152602001600582015481526020016006820160009054906101000a900460ff16600281111561117c5761117b612ce1565b5b600281111561118e5761118d612ce1565b5b8152505081526020019060010190611060565b50505050905090565b6060600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b8282101561134c57838290600052602060002090600702016040518060e00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282015481526020016003820154815260200160048201548152602001600582015481526020016006820160009054906101000a900460ff16600281111561132757611326612ce1565b5b600281111561133957611338612ce1565b5b815250508152602001906001019061120b565b50505050905090565b600080600090506000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b6113a9610bf0565b81101561142157600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828152602001908152602001600020548261140c9190612ac4565b9150808061141990612c3a565b9150506113a1565b508091505090565b6000611434826119fc565b90506000611440610bf0565b90505b8160a001518110156114cd578160400151600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002060008282546114b39190612ba5565b9250508190555080806114c590612c3a565b915050611443565b5060006114d983611f81565b90506114e3610bf0565b8160a001818152505060018160c00190600281111561150557611504612ce1565b5b9081600281111561151957611518612ce1565b5b81525050600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081908060018154018082558091505060019003906000526020600020906007020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155606082015181600301556080820151816004015560a0820151816005015560c08201518160060160006101000a81548160ff0219169083600281111561166757611666612ce1565b5b02179055505050611676610bf0565b8260a001516116859190612ba5565b82604001516116949190612b4b565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546116e29190612ac4565b925050819055507f0e5d37f92c75ec89c26e8d6cc3efe3b5e5a199bd47e0b37e82abb2a9f4e12373611712610bf0565b8433604051611723939291906129ae565b60405180910390a1505050565b6000803411611774576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161176b90612953565b60405180910390fd5b34600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546117c39190612ac4565b925050819055507f5ec7b93ad058ea473cead27435445c1fa823b4eef297beebbc1193ef9c6575196117f3610bf0565b333460405161180493929190612a38565b60405180910390a1600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905090565b6060600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b828210156119f357838290600052602060002090600702016040518060e00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282015481526020016003820154815260200160048201548152602001600582015481526020016006820160009054906101000a900460ff1660028111156119ce576119cd612ce1565b5b60028111156119e0576119df612ce1565b5b81525050815260200190600101906118b2565b50505050905090565b611a04612506565b6000600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050611a4f612506565b60005b8280549050811015611eca578473ffffffffffffffffffffffffffffffffffffffff16838281548110611a8857611a87612d3f565b5b906000526020600020906007020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415611eb757828181548110611ae957611ae8612d3f565b5b90600052602060002090600702016040518060e00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282015481526020016003820154815260200160048201548152602001600582015481526020016006820160009054906101000a900460ff166002811115611bfb57611bfa612ce1565b5b6002811115611c0d57611c0c612ce1565b5b8152505091508260018480549050611c259190612ba5565b81548110611c3657611c35612d3f565b5b9060005260206000209060070201838281548110611c5757611c56612d3f565b5b90600052602060002090600702016000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600282015481600201556003820154816003015560048201548160040155600582015481600501556006820160009054906101000a900460ff168160060160006101000a81548160ff02191690836002811115611d9357611d92612ce1565b5b0217905550905050818360018580549050611dae9190612ba5565b81548110611dbf57611dbe612d3f565b5b906000526020600020906007020160008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155606082015181600301556080820151816004015560a0820151816005015560c08201518160060160006101000a81548160ff02191690836002811115611eae57611ead612ce1565b5b02179055509050505b8080611ec290612c3a565b915050611a52565b5081805480611edc57611edb612d10565b5b6001900381819060005260206000209060070201600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560028201600090556003820160009055600482016000905560058201600090556006820160006101000a81549060ff0219169055505090558092505050919050565b611f89612506565b6000600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050611fd4612506565b60005b828054905081101561244f573373ffffffffffffffffffffffffffffffffffffffff1683828154811061200d5761200c612d3f565b5b906000526020600020906007020160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561243c5782818154811061206e5761206d612d3f565b5b90600052602060002090600702016040518060e00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282015481526020016003820154815260200160048201548152602001600582015481526020016006820160009054906101000a900460ff1660028111156121805761217f612ce1565b5b600281111561219257612191612ce1565b5b81525050915082600184805490506121aa9190612ba5565b815481106121bb576121ba612d3f565b5b90600052602060002090600702018382815481106121dc576121db612d3f565b5b90600052602060002090600702016000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600282015481600201556003820154816003015560048201548160040155600582015481600501556006820160009054906101000a900460ff168160060160006101000a81548160ff0219169083600281111561231857612317612ce1565b5b02179055509050508183600185805490506123339190612ba5565b8154811061234457612343612d3f565b5b906000526020600020906007020160008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155606082015181600301556080820151816004015560a0820151816005015560c08201518160060160006101000a81548160ff0219169083600281111561243357612432612ce1565b5b02179055509050505b808061244790612c3a565b915050611fd7565b508180548061246157612460612d10565b5b6001900381819060005260206000209060070201600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560028201600090556003820160009055600482016000905560058201600090556006820160006101000a81549060ff0219169055505090558092505050919050565b6040518060e00160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600081526020016000815260200160008152602001600081526020016000600281111561257b5761257a612ce1565b5b81525090565b60008135905061259081612ef2565b92915050565b6000813590506125a581612f09565b92915050565b6000602082840312156125c1576125c0612d6e565b5b60006125cf84828501612581565b91505092915050565b6000806000606084860312156125f1576125f0612d6e565b5b60006125ff86828701612581565b935050602061261086828701612596565b925050604061262186828701612596565b9150509250925092565b60006020828403121561264157612640612d6e565b5b600061264f84828501612596565b91505092915050565b600061266483836127f0565b60e08301905092915050565b61267981612bd9565b82525050565b61268881612bd9565b82525050565b600061269982612a7f565b6126a38185612a97565b93506126ae83612a6f565b8060005b838110156126df5781516126c68882612658565b97506126d183612a8a565b9250506001810190506126b2565b5085935050505092915050565b6126f581612c28565b82525050565b6000612708607183612ab3565b915061271382612d73565b608082019050919050565b600061272b601383612ab3565b915061273682612e0e565b602082019050919050565b600061274e601283612ab3565b915061275982612e37565b602082019050919050565b6000612771601183612ab3565b915061277c82612e60565b602082019050919050565b6000612794600f83612ab3565b915061279f82612e89565b602082019050919050565b60006127b7600083612aa8565b91506127c282612eb2565b600082019050919050565b60006127da601183612ab3565b91506127e582612eb5565b602082019050919050565b60e0820160008201516128066000850182612670565b5060208201516128196020850182612670565b50604082015161282c604085018261287e565b50606082015161283f606085018261287e565b506080820151612852608085018261287e565b5060a082015161286560a085018261287e565b5060c082015161287860c08501826126ec565b50505050565b61288781612c1e565b82525050565b61289681612c1e565b82525050565b60006128a7826127aa565b9150819050919050565b600060208201905081810360008301526128cb818461268e565b905092915050565b600060208201905081810360008301526128ec816126fb565b9050919050565b6000602082019050818103600083015261290c8161271e565b9050919050565b6000602082019050818103600083015261292c81612741565b9050919050565b6000602082019050818103600083015261294c81612764565b9050919050565b6000602082019050818103600083015261296c81612787565b9050919050565b6000602082019050818103600083015261298c816127cd565b9050919050565b60006020820190506129a8600083018461288d565b92915050565b60006060820190506129c3600083018661288d565b6129d0602083018561267f565b6129dd604083018461267f565b949350505050565b600060a0820190506129fa600083018861288d565b612a07602083018761267f565b612a14604083018661267f565b612a21606083018561288d565b612a2e608083018461288d565b9695505050505050565b6000606082019050612a4d600083018661288d565b612a5a602083018561267f565b612a67604083018461288d565b949350505050565b6000819050602082019050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600081905092915050565b600082825260208201905092915050565b6000612acf82612c1e565b9150612ada83612c1e565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115612b0f57612b0e612c83565b5b828201905092915050565b6000612b2582612c1e565b9150612b3083612c1e565b925082612b4057612b3f612cb2565b5b828204905092915050565b6000612b5682612c1e565b9150612b6183612c1e565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615612b9a57612b99612c83565b5b828202905092915050565b6000612bb082612c1e565b9150612bbb83612c1e565b925082821015612bce57612bcd612c83565b5b828203905092915050565b6000612be482612bfe565b9050919050565b6000819050612bf982612ede565b919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000612c3382612beb565b9050919050565b6000612c4582612c1e565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415612c7857612c77612c83565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600080fd5b7f596f75277265206f6e6c7920616c6c6f77656420746f2068617665206f6e652060008201527f61637469766520706c656467652061742061742074696d652c2063616e63656c60208201527f20796f7572206578697374696e67206f6e65206669727374206f72207761697460408201527f20756e74696c2069742065787069726573000000000000000000000000000000606082015250565b7f4e6f7468696e6720746f20776974686472617700000000000000000000000000600082015250565b7f496e73756666696369656e742066756e64730000000000000000000000000000600082015250565b7f7769746864726177616c206661696c6564000000000000000000000000000000600082015250565b7f43616e2774206465706f73697420300000000000000000000000000000000000600082015250565b50565b7f5769746864726177616c206661696c6564000000000000000000000000000000600082015250565b60038110612eef57612eee612ce1565b5b50565b612efb81612bd9565b8114612f0657600080fd5b50565b612f1281612c1e565b8114612f1d57600080fd5b5056fea26469706673582212206f8f6c4a8ef03d9d5a72db0c907c4657577fde27ea525947523b8cf444df52e264736f6c63430008060033";

type PethreonConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PethreonConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Pethreon__factory extends ContractFactory {
  constructor(...args: PethreonConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    _period: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Pethreon> {
    return super.deploy(_period, overrides || {}) as Promise<Pethreon>;
  }
  getDeployTransaction(
    _period: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_period, overrides || {});
  }
  attach(address: string): Pethreon {
    return super.attach(address) as Pethreon;
  }
  connect(signer: Signer): Pethreon__factory {
    return super.connect(signer) as Pethreon__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PethreonInterface {
    return new utils.Interface(_abi) as PethreonInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Pethreon {
    return new Contract(address, _abi, signerOrProvider) as Pethreon;
  }
}
