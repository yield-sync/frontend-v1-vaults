export default [
	{
		"inputs": [
		],
		"name": "ERC721Base__BalanceQueryZeroAddress",
		"type": "error"
	},
	{
		"inputs": [
		],
		"name": "ERC721Base__ERC721ReceiverNotImplemented",
		"type": "error"
	},
	{
		"inputs": [
		],
		"name": "ERC721Base__InvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
		],
		"name": "ERC721Base__MintToZeroAddress",
		"type": "error"
	},
	{
		"inputs": [
		],
		"name": "ERC721Base__NonExistentToken",
		"type": "error"
	},
	{
		"inputs": [
		],
		"name": "ERC721Base__NotOwnerOrApproved",
		"type": "error"
	},
	{
		"inputs": [
		],
		"name": "ERC721Base__NotTokenOwner",
		"type": "error"
	},
	{
		"inputs": [
		],
		"name": "ERC721Base__SelfApproval",
		"type": "error"
	},
	{
		"inputs": [
		],
		"name": "ERC721Base__TokenAlreadyMinted",
		"type": "error"
	},
	{
		"inputs": [
		],
		"name": "ERC721Base__TransferToZeroAddress",
		"type": "error"
	},
	{
		"inputs": [
		],
		"name": "ERC721Metadata__NonExistentToken",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			},
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
		],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
		],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
		],
		"stateMutability": "view",
		"type": "function"
	},
];
