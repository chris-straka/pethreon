/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { Pethreon } from "../Pethreon";

export class Pethreon__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
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
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Pethreon {
    return new Contract(address, _abi, signerOrProvider) as Pethreon;
  }
}

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
      {
        internalType: "uint256",
        name: "_dateCreated",
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
            internalType: "uint256",
            name: "weiPerPeriod",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "afterLastPeriod",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "dateCreated",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "exists",
            type: "bool",
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
    inputs: [
      {
        internalType: "address",
        name: "_creatorAddress",
        type: "address",
      },
    ],
    name: "myPledgeTo",
    outputs: [
      {
        internalType: "uint256",
        name: "weiPerPeriod",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "afterLastPeriod",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
    name: "withdrawAsContributor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawAsCreator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001b7938038062001b798339818101604052810190620000379190620000a4565b4260028190555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060008190555050620000ff565b6000815190506200009e81620000e5565b92915050565b600060208284031215620000bd57620000bc620000e0565b5b6000620000cd848285016200008d565b91505092915050565b6000819050919050565b600080fd5b620000f081620000d6565b8114620000fc57600080fd5b50565b611a6a806200010f6000396000f3fe6080604052600436106100865760003560e01c80638197a398116100595780638197a39814610146578063a432548514610171578063aa60145b1461019c578063b9f89751146101c5578063d0e30db0146101dc57610086565b806302474c591461008b5780633cdb48c2146100c957806354411012146100f45780636a6b04df1461011d575b600080fd5b34801561009757600080fd5b506100b260048036038101906100ad9190611214565b6101fa565b6040516100c0929190611640565b60405180910390f35b3480156100d557600080fd5b506100de61032b565b6040516100eb9190611564565b60405180910390f35b34801561010057600080fd5b5061011b600480360381019061011691906112a8565b610372565b005b34801561012957600080fd5b50610144600480360381019061013f9190611241565b6103c3565b005b34801561015257600080fd5b5061015b610862565b60405161016891906114c2565b60405180910390f35b34801561017d57600080fd5b5061018661098d565b6040516101939190611564565b60405180910390f35b3480156101a857600080fd5b506101c360048036038101906101be9190611214565b610a62565b005b3480156101d157600080fd5b506101da610db5565b005b6101e4610e5d565b6040516101f19190611564565b60405180910390f35b6000806000600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820154815260200160028201548152602001600382015481526020016004820160009054906101000a900460ff1615151515815250509050806020015181604001519250925050915091565b6000600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905090565b61037d600182610f7e565b507fe91b2e1970531db1e757470f91918e5ae187999ac2ea50e4e37466d8c2f040956103a7611171565b33836040516103b893929190611609565b60405180910390a150565b6103cd8383611192565b61040c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610403906114e4565b60405180910390fd5b600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040160009054906101000a900460ff16156104d9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104d090611544565b60405180910390fd5b81836104e59190611745565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610533919061179f565b925050819055506000610544611171565b90505b828110156105c95783600860008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002060008282546105af91906116be565b9250508190555080806105c19061181b565b915050610547565b5060006040518060a001604052808673ffffffffffffffffffffffffffffffffffffffff16815260200185815260200184610602611171565b61060c91906116be565b8152602001838152602001600115158152509050600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081908060018154018082558091505060019003906000526020600020906005020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155604082015181600201556060820151816003015560808201518160040160006101000a81548160ff021916908315150217905550505080600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155604082015181600201556060820151816003015560808201518160040160006101000a81548160ff0219169083151502179055509050507f8e09f18192ecfb9b3f5f9d5e64a99285daf66bbd42f237261ef72fa03590b2cd61083e611171565b863387876040516108539594939291906115b6565b60405180910390a15050505050565b6060600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b8282101561098457838290600052602060002090600502016040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820154815260200160028201548152602001600382015481526020016004820160009054906101000a900460ff161515151581525050815260200190600101906108c3565b50505050905090565b600080600090506000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b6109e1611171565b811015610a5a57600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000805481526020019081526020016000205482610a4591906116be565b91508080610a529061181b565b9150506109d9565b508091505090565b6000600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820154815260200160028201548152602001600382015481526020016004820160009054906101000a900460ff16151515158152505090508060800151610b8a57600080fd5b610b92611171565b8160400151610ba1919061179f565b8160200151610bb09190611745565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610bfe91906116be565b925050819055506000610c0f611171565b90505b8160400151811015610c9c578160200151600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008381526020019081526020016000206000828254610c82919061179f565b925050819055508080610c949061181b565b915050610c12565b50600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160009055600282016000905560038201600090556004820160006101000a81549060ff021916905550507f0e5d37f92c75ec89c26e8d6cc3efe3b5e5a199bd47e0b37e82abb2a9f4e12373610d98611171565b8333604051610da99392919061157f565b60405180910390a15050565b6000610dbf61098d565b9050610dc9611171565b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610e17600082610f7e565b507ff2f5ee55e951acd7f51568e21f2f82e8b2b809ead086416336d5921757ab8e5a610e41611171565b3383604051610e5293929190611609565b60405180910390a150565b6000803411610ea1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e9890611524565b60405180910390fd5b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610ef091906116be565b925050819055507f5ec7b93ad058ea473cead27435445c1fa823b4eef297beebbc1193ef9c657519610f20611171565b3334604051610f3193929190611609565b60405180910390a1600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905090565b60008083610f8d576005610f90565b60035b905060008160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050838260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561102557809250505061116b565b838260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611073919061179f565b9250508190555060003373ffffffffffffffffffffffffffffffffffffffff16856040516110a0906114ad565b60006040518083038185875af1925050503d80600081146110dd576040519150601f19603f3d011682016040523d82523d6000602084013e6110e2565b606091505b5050905080611126576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161111d90611504565b60405180910390fd5b8260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205493505050505b92915050565b6000805460025442611183919061179f565b61118d9190611714565b905090565b600081836111a09190611745565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015905092915050565b6000813590506111f981611a06565b92915050565b60008135905061120e81611a1d565b92915050565b60006020828403121561122a576112296118c2565b5b6000611238848285016111ea565b91505092915050565b6000806000806080858703121561125b5761125a6118c2565b5b6000611269878288016111ea565b945050602061127a878288016111ff565b935050604061128b878288016111ff565b925050606061129c878288016111ff565b91505092959194509250565b6000602082840312156112be576112bd6118c2565b5b60006112cc848285016111ff565b91505092915050565b60006112e18383611427565b60a08301905092915050565b6112f6816117d3565b82525050565b611305816117d3565b82525050565b600061131682611679565b6113208185611691565b935061132b83611669565b8060005b8381101561135c57815161134388826112d5565b975061134e83611684565b92505060018101905061132f565b5085935050505092915050565b611372816117e5565b82525050565b60006113856012836116ad565b9150611390826118c7565b602082019050919050565b60006113a86011836116ad565b91506113b3826118f0565b602082019050919050565b60006113cb600f836116ad565b91506113d682611919565b602082019050919050565b60006113ee6000836116a2565b91506113f982611942565b600082019050919050565b6000611411608e836116ad565b915061141c82611945565b60a082019050919050565b60a08201600082015161143d60008501826112ed565b506020820151611450602085018261148f565b506040820151611463604085018261148f565b506060820151611476606085018261148f565b5060808201516114896080850182611369565b50505050565b61149881611811565b82525050565b6114a781611811565b82525050565b60006114b8826113e1565b9150819050919050565b600060208201905081810360008301526114dc818461130b565b905092915050565b600060208201905081810360008301526114fd81611378565b9050919050565b6000602082019050818103600083015261151d8161139b565b9050919050565b6000602082019050818103600083015261153d816113be565b9050919050565b6000602082019050818103600083015261155d81611404565b9050919050565b6000602082019050611579600083018461149e565b92915050565b6000606082019050611594600083018661149e565b6115a160208301856112fc565b6115ae60408301846112fc565b949350505050565b600060a0820190506115cb600083018861149e565b6115d860208301876112fc565b6115e560408301866112fc565b6115f2606083018561149e565b6115ff608083018461149e565b9695505050505050565b600060608201905061161e600083018661149e565b61162b60208301856112fc565b611638604083018461149e565b949350505050565b6000604082019050611655600083018561149e565b611662602083018461149e565b9392505050565b6000819050602082019050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600081905092915050565b600082825260208201905092915050565b60006116c982611811565b91506116d483611811565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561170957611708611864565b5b828201905092915050565b600061171f82611811565b915061172a83611811565b92508261173a57611739611893565b5b828204905092915050565b600061175082611811565b915061175b83611811565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561179457611793611864565b5b828202905092915050565b60006117aa82611811565b91506117b583611811565b9250828210156117c8576117c7611864565b5b828203905092915050565b60006117de826117f1565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061182682611811565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561185957611858611864565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600080fd5b7f496e73756666696369656e742066756e64730000000000000000000000000000600082015250565b7f7769746864726177616c206661696c6564000000000000000000000000000000600082015250565b7f43616e2774206465706f73697420300000000000000000000000000000000000600082015250565b50565b7f4120706c6564676520616c72656164792065786973747320666f72207468697360008201527f2063726561746f72416464726573732e20596f752063616e277420656469742060208201527f6578697374696e6720706c65646765732c20796f75206861766520746f20636160408201527f6e63656c20796f7572206578697374696e6720706c6564676520616e6420637260608201527f656174652061206e6577206f6e65000000000000000000000000000000000000608082015250565b611a0f816117d3565b8114611a1a57600080fd5b50565b611a2681611811565b8114611a3157600080fd5b5056fea2646970667358221220ae36f2b59467ea50f313d75aa571692d1ecabfa15be574fe7b563fbfca799d0e64736f6c63430008060033";
