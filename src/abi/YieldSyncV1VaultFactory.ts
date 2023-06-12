export default [
	{
		"inputs": [
			{
				"internalType": "address", "name": "_yieldSyncV1Vault", "type": "address"
			},
			{
				"internalType": "address", "name": "admin", "type": "address"
			},
		], "name": "addAdmin", "outputs": [
		], "stateMutability": "nonpayable", "type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address", "name": "_yieldSyncV1Vault", "type": "address"
			},
			{
				"internalType": "address", "name": "member", "type": "address"
			},
		], "name": "addMember", "outputs": [
		], "stateMutability": "nonpayable", "type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address", "name": "admin", "type": "address"
			},
		], "name": "admin_yieldSyncV1Vaults", "outputs": [
			{
				"internalType": "address[]", "name": "", "type": "address[]"
			},
		], "stateMutability": "view", "type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address", "name": "member", "type": "address"
			},
		], "name": "member_yieldSyncV1Vaults", "outputs": [
			{
				"internalType": "address[]", "name": "", "type": "address[]"
			},
		], "stateMutability": "view", "type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address", "name": "participant", "type": "address"
			},
			{
				"internalType": "address", "name": "yieldSyncV1Vault", "type": "address"
			},
		], "name": "participant_yieldSyncV1Vault_access", "outputs": [
			{
				"internalType": "bool", "name": "admin", "type": "bool"
			},
			{
				"internalType": "bool", "name": "member", "type": "bool"
			},
		], "stateMutability": "view", "type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address", "name": "_yieldSyncV1Vault", "type": "address"
			},
			{
				"internalType": "address", "name": "admin", "type": "address"
			},
		], "name": "removeAdmin", "outputs": [
		], "stateMutability": "nonpayable", "type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address", "name": "_yieldSyncV1Vault", "type": "address"
			},
			{
				"internalType": "address", "name": "member", "type": "address"
			},
		], "name": "removeMember", "outputs": [
		], "stateMutability": "nonpayable", "type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address", "name": "yieldSyncV1Vault", "type": "address"
			},
		], "name": "yieldSyncV1Vault_admins", "outputs": [
			{
				"internalType": "address[]", "name": "", "type": "address[]"
			},
		], "stateMutability": "view", "type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address", "name": "yieldSyncV1Vault", "type": "address"
			},
		], "name": "yieldSyncV1Vault_members", "outputs": [
			{
				"internalType": "address[]", "name": "", "type": "address[]"
			},
		], "stateMutability": "view", "type": "function"
	},
];
