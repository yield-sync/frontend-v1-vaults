export default [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "yieldSyncV1VaultAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "target",
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
				"name": "yieldSyncV1VaultAddress",
				"type": "address"
			},
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
				"internalType": "address",
				"name": "admin",
				"type": "address"
			},
		],
		"name": "admin_yieldSyncV1Vaults",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			},
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "yieldSyncV1VaultAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "target",
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
				"name": "yieldSyncV1VaultAddress",
				"type": "address"
			},
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
			{
				"internalType": "address",
				"name": "member",
				"type": "address"
			},
		],
		"name": "member_yieldSyncV1Vaults",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
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
		"name": "yieldSyncV1VaultAddress_admins",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
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
		"name": "yieldSyncV1VaultAddress_members",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			},
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "yieldSyncV1VaultAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "participant",
				"type": "address"
			},
		],
		"name": "yieldSyncV1VaultAddress_participant_access",
		"outputs": [
			{
				"internalType": "bool",
				"name": "admin",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "member",
				"type": "bool"
			},
		],
		"stateMutability": "view",
		"type": "function"
	},
];
