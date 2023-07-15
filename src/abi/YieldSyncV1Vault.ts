export default [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_YieldSyncV1VaultAccessControl",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_transferRequestProtocol",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_signatureProtocol",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "admins",
				"type": "address[]"
			},
			{
				"internalType": "address[]",
				"name": "members",
				"type": "address[]"
			},
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "transferRequestId",
				"type": "uint256"
			},
		],
		"name": "ProcessTransferRequestFailed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
		],
		"name": "TokensTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "signatureProtocol",
				"type": "address"
			},
		],
		"name": "UpdatedSignatureProtocol",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [

		],
		"name": "YieldSyncV1VaultAccessControl",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "targetAddress",
				"type": "address"
			},
		],
		"name": "adminAdd",
		"outputs": [

		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "admin",
				"type": "address"
			},
		],
		"name": "adminRemove",
		"outputs": [

		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_messageHash",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "_signature",
				"type": "bytes"
			},
		],
		"name": "isValidSignature",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "magicValue",
				"type": "bytes4"
			},
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "targetAddress",
				"type": "address"
			},
		],
		"name": "memberAdd",
		"outputs": [

		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "member",
				"type": "address"
			},
		],
		"name": "memberRemove",
		"outputs": [

		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [

		],
		"name": "processTransferRequestLocked",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [

		],
		"name": "renounceMembership",
		"outputs": [

		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [

		],
		"name": "signatureProtocol",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_signatureProtocol",
				"type": "address"
			},
		],
		"name": "signatureProtocolUpdate",
		"outputs": [

		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [

		],
		"name": "transferRequestProtocol",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_transferRequestProtocol",
				"type": "address"
			},
		],
		"name": "transferRequestProtocolUpdate",
		"outputs": [

		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "transferRequestId",
				"type": "uint256"
			},
		],
		"name": "yieldSyncV1VaultAddress_transferRequestId_transferRequestProcess",
		"outputs": [

		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
];
