let abiNestQuery = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "latestPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "ethAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint128",
				"name": "avgPrice",
				"type": "uint128"
			},
			{
				"internalType": "int128",
				"name": "vola",
				"type": "int128"
			},
			{
				"internalType": "uint256",
				"name": "bn",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "params",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "single",
				"type": "uint256"
			},
			{
				"internalType": "uint64",
				"name": "leadTime",
				"type": "uint64"
			},
			{
				"internalType": "uint256",
				"name": "nestAmount",
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
				"name": "payback",
				"type": "address"
			}
		],
		"name": "queryPriceAvgVola",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "ethAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint128",
				"name": "avgPrice",
				"type": "uint128"
			},
			{
				"internalType": "int128",
				"name": "vola",
				"type": "int128"
			},
			{
				"internalType": "uint256",
				"name": "bn",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
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
				"internalType": "uint128",
				"name": "_avg",
				"type": "uint128"
			}
		],
		"name": "setPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
export default abiNestQuery
