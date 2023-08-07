export default [
	{
		"inputs": [
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
				"indexed": false,
				"internalType": "address",
				"name": "yieldSyncV1Vault",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "transferRequestId",
				"type": "uint256"
			},
		],
		"name": "CreatedTransferRequest",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "yieldSyncV1Vault",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "transferRequestId",
				"type": "uint256"
			},
		],
		"name": "DeletedTransferRequest",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "yieldSyncV1Vault",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "transferRequestId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "member",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "vote",
				"type": "bool"
			},
		],
		"name": "MemberVoted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "yieldSyncV1Vault",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "transferRequestId",
				"type": "uint256"
			},
		],
		"name": "TransferRequestReadyToBeProcessed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "yieldSyncV1Vault",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "bool",
						"name": "forERC20",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "forERC721",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "created",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
				],
				"indexed": false,
				"internalType": "struct TransferRequest",
				"name": "transferRequest",
				"type": "tuple"
			},
		],
		"name": "UpdateTransferRequest",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "yieldSyncV1Vault",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "latestForVoteTime",
						"type": "uint256"
					},
					{
						"internalType": "address[]",
						"name": "voteAgainstMembers",
						"type": "address[]"
					},
					{
						"internalType": "address[]",
						"name": "voteForMembers",
						"type": "address[]"
					},
				],
				"indexed": false,
				"internalType": "struct TransferRequestPoll",
				"name": "transferRequestPoll",
				"type": "tuple"
			},
		],
		"name": "UpdateTransferRequestPoll",
		"type": "event"
	},
	{
		"inputs": [
		],
		"name": "YieldSyncV1VaultAccessControl",
		"outputs": [
			{
				"internalType": "contract IYieldSyncV1VaultAccessControl",
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
				"name": "initiator",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "yieldSyncV1Vault",
				"type": "address"
			},
		],
		"name": "yieldSyncV1VaultInitialize",
		"outputs": [
		],
		"stateMutability": "nonpayable",
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
		"name": "yieldSyncV1Vault_openTransferRequestIds",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
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
			{
				"internalType": "uint256",
				"name": "transferRequestId",
				"type": "uint256"
			},
		],
		"name": "yieldSyncV1Vault_transferRequestId_transferRequest",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bool",
						"name": "forERC20",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "forERC721",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "created",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
				],
				"internalType": "struct TransferRequest",
				"name": "",
				"type": "tuple"
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
			{
				"internalType": "bool",
				"name": "forERC20",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "forERC721",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
		],
		"name": "yieldSyncV1Vault_transferRequestId_transferRequestCreate",
		"outputs": [
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "yieldSyncV1Vault",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "transferRequestId",
				"type": "uint256"
			},
		],
		"name": "yieldSyncV1Vault_transferRequestId_transferRequestDelete",
		"outputs": [
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "yieldSyncV1Vault",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "transferRequestId",
				"type": "uint256"
			},
		],
		"name": "yieldSyncV1Vault_transferRequestId_transferRequestPoll",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "latestForVoteTime",
						"type": "uint256"
					},
					{
						"internalType": "address[]",
						"name": "voteAgainstMembers",
						"type": "address[]"
					},
					{
						"internalType": "address[]",
						"name": "voteForMembers",
						"type": "address[]"
					},
				],
				"internalType": "struct TransferRequestPoll",
				"name": "",
				"type": "tuple"
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
			{
				"internalType": "uint256",
				"name": "transferRequestId",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "latestForVoteTime",
						"type": "uint256"
					},
					{
						"internalType": "address[]",
						"name": "voteAgainstMembers",
						"type": "address[]"
					},
					{
						"internalType": "address[]",
						"name": "voteForMembers",
						"type": "address[]"
					},
				],
				"internalType": "struct TransferRequestPoll",
				"name": "transferRequestPoll",
				"type": "tuple"
			},
		],
		"name": "yieldSyncV1Vault_transferRequestId_transferRequestPollUpdate",
		"outputs": [
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "yieldSyncV1Vault",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "transferRequestId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "vote",
				"type": "bool"
			},
		],
		"name": "yieldSyncV1Vault_transferRequestId_transferRequestPollVote",
		"outputs": [
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "yieldSyncV1Vault",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "transferRequestId",
				"type": "uint256"
			},
		],
		"name": "yieldSyncV1Vault_transferRequestId_transferRequestProcess",
		"outputs": [
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "yieldSyncV1Vault",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "transferRequestId",
				"type": "uint256"
			},
		],
		"name": "yieldSyncV1Vault_transferRequestId_transferRequestStatus",
		"outputs": [
			{
				"internalType": "bool",
				"name": "readyToBeProcessed",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "message",
				"type": "string"
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
			{
				"internalType": "uint256",
				"name": "transferRequestId",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "bool",
						"name": "forERC20",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "forERC721",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "created",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
				],
				"internalType": "struct TransferRequest",
				"name": "transferRequest",
				"type": "tuple"
			},
		],
		"name": "yieldSyncV1Vault_transferRequestId_transferRequestUpdate",
		"outputs": [
		],
		"stateMutability": "nonpayable",
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
		"name": "yieldSyncV1Vault_yieldSyncV1VaultProperty",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "voteAgainstRequired",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "voteForRequired",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "transferDelaySeconds",
						"type": "uint256"
					},
				],
				"internalType": "struct YieldSyncV1VaultProperty",
				"name": "",
				"type": "tuple"
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
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "voteAgainstRequired",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "voteForRequired",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "transferDelaySeconds",
						"type": "uint256"
					},
				],
				"internalType": "struct YieldSyncV1VaultProperty",
				"name": "yieldSyncV1VaultProperty",
				"type": "tuple"
			},
		],
		"name": "yieldSyncV1Vault_yieldSyncV1VaultPropertyUpdate",
		"outputs": [
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
];
