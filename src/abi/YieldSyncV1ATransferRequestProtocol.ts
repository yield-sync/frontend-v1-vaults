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
				"name": "_YieldSyncV1VaultFactory",
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
				"name": "yieldSyncV1VaultAddress",
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
				"name": "yieldSyncV1VaultAddress",
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
				"name": "yieldSyncV1VaultAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "transferRequestId",
				"type": "uint256"
			},
			{
				"indexed": true,
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
				"name": "yieldSyncV1VaultAddress",
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
				"name": "yieldSyncV1VaultAddress",
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
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
				],
				"indexed": false,
				"internalType": "struct TransferRequest",
				"name": "transferRequest",
				"type": "tuple"
			},
		],
		"name": "UpdatedTransferRequest",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "yieldSyncV1VaultAddress",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "againstVoteCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "forVoteCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "latestRelevantForVoteTime",
						"type": "uint256"
					},
					{
						"internalType": "address[]",
						"name": "votedMembers",
						"type": "address[]"
					},
				],
				"indexed": false,
				"internalType": "struct TransferRequestPoll",
				"name": "transferRequestPoll",
				"type": "tuple"
			},
		],
		"name": "UpdatedTransferRequestPoll",
		"type": "event"
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

		],
		"name": "YieldSyncV1VaultFactory",
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
				"name": "yieldSyncV1VaultAddress",
				"type": "address"
			},
		],
		"name": "yieldSyncV1VaultAddress_openTransferRequestIds",
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
				"name": "yieldSyncV1VaultAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "transferRequestId",
				"type": "uint256"
			},
		],
		"name": "yieldSyncV1VaultAddress_transferRequestId_transferRequest",
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
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
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
				"name": "yieldSyncV1VaultAddress",
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
				"name": "tokenAddress",
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
		"name": "yieldSyncV1VaultAddress_transferRequestId_transferRequestCreate",
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
				"internalType": "uint256",
				"name": "transferRequestId",
				"type": "uint256"
			},
		],
		"name": "yieldSyncV1VaultAddress_transferRequestId_transferRequestDelete",
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
				"internalType": "uint256",
				"name": "transferRequestId",
				"type": "uint256"
			},
		],
		"name": "yieldSyncV1VaultAddress_transferRequestId_transferRequestPoll",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "againstVoteCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "forVoteCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "latestRelevantForVoteTime",
						"type": "uint256"
					},
					{
						"internalType": "address[]",
						"name": "votedMembers",
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
				"name": "yieldSyncV1VaultAddress",
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
						"name": "againstVoteCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "forVoteCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "latestRelevantForVoteTime",
						"type": "uint256"
					},
					{
						"internalType": "address[]",
						"name": "votedMembers",
						"type": "address[]"
					},
				],
				"internalType": "struct TransferRequestPoll",
				"name": "transferRequestPoll",
				"type": "tuple"
			},
		],
		"name": "yieldSyncV1VaultAddress_transferRequestId_transferRequestPollUpdate",
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
		"name": "yieldSyncV1VaultAddress_transferRequestId_transferRequestPollVote",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "yieldSyncV1VaultAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "transferRequestId",
				"type": "uint256"
			},
		],
		"name": "yieldSyncV1VaultAddress_transferRequestId_transferRequestStatus",
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
				"name": "yieldSyncV1VaultAddress",
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
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
				],
				"internalType": "struct TransferRequest",
				"name": "transferRequest",
				"type": "tuple"
			},
		],
		"name": "yieldSyncV1VaultAddress_transferRequestId_transferRequestUpdate",
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
		],
		"name": "yieldSyncV1VaultAddress_yieldSyncV1VaultProperty",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "againstVoteRequired",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "forVoteRequired",
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
				"name": "yieldSyncV1VaultAddress",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "againstVoteRequired",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "forVoteRequired",
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
		"name": "yieldSyncV1VaultAddress_yieldSyncV1VaultPropertyUpdate",
		"outputs": [

		],
		"stateMutability": "nonpayable",
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
				"name": "yieldSyncV1VaultAddress",
				"type": "address"
			},
		],
		"name": "yieldSyncV1VaultInitialize",
		"outputs": [

		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
];