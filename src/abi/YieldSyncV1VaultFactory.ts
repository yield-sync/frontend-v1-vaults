export default  [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_YieldSyncGovernance",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_YieldSyncV1VaultAccessControl",
				"type": "address"
			},
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "vaultAddress",
				"type": "address"
			},
		],
		"name": "DeployedYieldSyncV1Vault",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [
		],
		"name": "YieldSyncGovernance",
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
				"name": "signatureProtocol",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "transferRequestProtocol",
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
		"name": "deployYieldSyncV1Vault",
		"outputs": [
			{
				"internalType": "address",
				"name": "deployedyieldSyncV1Vault",
				"type": "address"
			},
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
		],
		"name": "etherTransfer",
		"outputs": [
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
		],
		"name": "fee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_fee",
				"type": "uint256"
			},
		],
		"name": "feeUpdate",
		"outputs": [
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
		],
		"name": "yieldSyncV1VaultIdTracker",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "yieldSyncV1VaultId",
				"type": "uint256"
			},
		],
		"name": "yieldSyncV1VaultId_yieldSyncV1Vault",
		"outputs": [
			{
				"internalType": "address",
				"name": "yieldSyncV1Vault",
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
				"name": "yieldSyncV1Vault",
				"type": "address"
			},
		],
		"name": "yieldSyncV1Vault_yieldSyncV1VaultId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "yieldSyncV1VaultId",
				"type": "uint256"
			},
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
];
