let abiPriceController = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "add",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "inputToken",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "inputTokenAmount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "outputToken",
				"type": "address"
			}
		],
		"name": "getDecimalConversion",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "mortgageToken",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "underlyingToken",
				"type": "address"
			}
		],
		"name": "getPriceFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "uToken",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "pToken",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "payback",
				"type": "address"
			}
		],
		"name": "getPriceForPToken",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "tokenPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pTokenPrice",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPriceSingleFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export default abiPriceController
