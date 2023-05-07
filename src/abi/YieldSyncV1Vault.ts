export default [
	{
		"inputs": [
			{
				"internalType": "address", "name": "_YieldSyncV1VaultAccessControl", "type": "address"
			},
			{
				"internalType": "address[]", "name": "admins", "type": "address[]"
			},
			{
				"internalType": "address[]", "name": "members", "type": "address[]"
			},
			{
				"internalType": "address", "name": "_signatureManager", "type": "address"
			},
			{
				"internalType": "uint256", "name": "_againstVoteCountRequired", "type": "uint256"
			},
			{
				"internalType": "uint256", "name": "_forVoteCountRequired", "type": "uint256"
			},
			{
				"internalType": "uint256", "name": "_withdrawalDelaySeconds", "type": "uint256"
			},
		], "stateMutability": "nonpayable", "type": "constructor"
	},
	{
		"anonymous": false, "inputs": [
			{
				"indexed": false, "internalType": "uint256", "name": "withdrawalRequestId", "type": "uint256"
			},
		], "name": "CreatedWithdrawalRequest", "type": "event"
	},
	{
		"anonymous": false, "inputs": [
			{
				"indexed": false, "internalType": "uint256", "name": "withdrawalRequestId", "type": "uint256"
			},
		], "name": "DeletedWithdrawalRequest", "type": "event"
	},
	{
		"anonymous": false, "inputs": [
			{
				"indexed": false, "internalType": "uint256", "name": "withdrawalRequestId", "type": "uint256"
			},
			{
				"indexed": true, "internalType": "address", "name": "member", "type": "address"
			},
			{
				"indexed": false, "internalType": "bool", "name": "vote", "type": "bool"
			},
		], "name": "MemberVoted", "type": "event"
	},
	{
		"anonymous": false, "inputs": [
			{
				"indexed": false, "internalType": "uint256", "name": "withdrawalRequestId", "type": "uint256"
			},
		], "name": "ProcessWithdrawalRequestFailed", "type": "event"
	},
	{
		"anonymous": false, "inputs": [
			{
				"indexed": true, "internalType": "address", "name": "withdrawer", "type": "address"
			},
			{
				"indexed": true, "internalType": "address", "name": "token", "type": "address"
			},
			{
				"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"
			},
		], "name": "TokensWithdrawn", "type": "event"
	},
	{
		"anonymous": false, "inputs": [
			{
				"indexed": false, "internalType": "uint256", "name": "againstVoteCountRequired", "type": "uint256"
			},
		], "name": "UpdatedAgainstVoteCountRequired", "type": "event"
	},
	{
		"anonymous": false, "inputs": [
			{
				"indexed": false, "internalType": "uint256", "name": "forVoteCountRequired", "type": "uint256"
			},
		], "name": "UpdatedForVoteCountRequired", "type": "event"
	},
	{
		"anonymous": false, "inputs": [
			{
				"indexed": false, "internalType": "address", "name": "signatureManager", "type": "address"
			},
		], "name": "UpdatedSignatureManger", "type": "event"
	},
	{
		"anonymous": false, "inputs": [
			{
				"indexed": false, "internalType": "uint256", "name": "withdrawalDelaySeconds", "type": "uint256"
			},
		], "name": "UpdatedWithdrawalDelaySeconds", "type": "event"
	},
	{
		"anonymous": false, "inputs": [
			{
				"components": [
					{
						"internalType": "bool", "name": "forERC20", "type": "bool"
					},
					{
						"internalType": "bool", "name": "forERC721", "type": "bool"
					},
					{
						"internalType": "address", "name": "creator", "type": "address"
					},
					{
						"internalType": "address", "name": "to", "type": "address"
					},
					{
						"internalType": "address", "name": "token", "type": "address"
					},
					{
						"internalType": "uint256", "name": "amount", "type": "uint256"
					},
					{
						"internalType": "uint256", "name": "tokenId", "type": "uint256"
					},
					{
						"internalType": "uint256", "name": "forVoteCount", "type": "uint256"
					},
					{
						"internalType": "uint256", "name": "againstVoteCount", "type": "uint256"
					},
					{
						"internalType": "uint256", "name": "latestRelevantApproveVoteTime", "type": "uint256"
					},
					{
						"internalType": "address[]", "name": "votedMembers", "type": "address[]"
					},
				],
				"indexed": false,
				"internalType": "struct WithdrawalRequest",
				"name": "withdrawalRequest",
				"type": "tuple"
			},
		], "name": "UpdatedWithdrawalRequest", "type": "event"
	},
	{
		"anonymous": false, "inputs": [
			{
				"indexed": false, "internalType": "uint256", "name": "withdrawalRequestId", "type": "uint256"
			},
		], "name": "WithdrawalRequestReadyToBeProcessed", "type": "event"
	},
	{
		"stateMutability": "payable", "type": "fallback"
	},
	{
		"inputs": [
		], "name": "YieldSyncV1VaultAccessControl", "outputs": [
			{
				"internalType": "address", "name": "", "type": "address"
			},
		], "stateMutability": "view", "type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address", "name": "targetAddress", "type": "address"
			},
		], "name": "addAdmin", "outputs": [
		], "stateMutability": "nonpayable", "type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address", "name": "targetAddress", "type": "address"
			},
		], "name": "addMember", "outputs": [
		], "stateMutability": "nonpayable", "type": "function"
	},
	{
		"inputs": [
		], "name": "againstVoteCountRequired", "outputs": [
			{
				"internalType": "uint256", "name": "", "type": "uint256"
			},
		], "stateMutability": "view", "type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool", "name": "forERC20", "type": "bool"
			},
			{
				"internalType": "bool", "name": "forERC721", "type": "bool"
			},
			{
				"internalType": "address", "name": "to", "type": "address"
			},
			{
				"internalType": "address", "name": "tokenAddress", "type": "address"
			},
			{
				"internalType": "uint256", "name": "amount", "type": "uint256"
			},
			{
				"internalType": "uint256", "name": "tokenId", "type": "uint256"
			},
		], "name": "createWithdrawalRequest", "outputs": [
		], "stateMutability": "nonpayable", "type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256", "name": "withdrawalRequestId", "type": "uint256"
			},
		], "name": "deleteWithdrawalRequest", "outputs": [
		], "stateMutability": "nonpayable", "type": "function"
	},
	{
		"inputs": [
		], "name": "forVoteCountRequired", "outputs": [
			{
				"internalType": "uint256", "name": "", "type": "uint256"
			},
		], "stateMutability": "view", "type": "function"
	},
	{
		"inputs": [
		], "name": "idsOfOpenWithdrawalRequests", "outputs": [
			{
				"internalType": "uint256[]", "name": "", "type": "uint256[]"
			},
		], "stateMutability": "view", "type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32", "name": "_messageHash", "type": "bytes32"
			},
			{
				"internalType": "bytes", "name": "_signature", "type": "bytes"
			},
		], "name": "isValidSignature", "outputs": [
			{
				"internalType": "bytes4", "name": "magicValue", "type": "bytes4"
			},
		], "stateMutability": "view", "type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256", "name": "withdrawalRequestId", "type": "uint256"
			},
		], "name": "processWithdrawalRequest", "outputs": [
		], "stateMutability": "nonpayable", "type": "function"
	},
	{
		"inputs": [
		], "name": "processWithdrawalRequestLocked", "outputs": [
			{
				"internalType": "bool", "name": "", "type": "bool"
			},
		], "stateMutability": "view", "type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address", "name": "admin", "type": "address"
			},
		], "name": "removeAdmin", "outputs": [
		], "stateMutability": "nonpayable", "type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address", "name": "member", "type": "address"
			},
		], "name": "removeMember", "outputs": [
		], "stateMutability": "nonpayable", "type": "function"
	},
	{
		"inputs": [
		], "name": "renounceMembership", "outputs": [
		], "stateMutability": "nonpayable", "type": "function"
	},
	{
		"inputs": [
		], "name": "signatureManager", "outputs": [
			{
				"internalType": "address", "name": "", "type": "address"
			},
		], "stateMutability": "view", "type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256", "name": "_againstVoteCountRequired", "type": "uint256"
			},
		], "name": "updateAgainstVoteCountRequired", "outputs": [
		], "stateMutability": "nonpayable", "type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256", "name": "_forVoteCountRequired", "type": "uint256"
			},
		], "name": "updateForVoteCountRequired", "outputs": [
		], "stateMutability": "nonpayable", "type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address", "name": "_signatureManager", "type": "address"
			},
		], "name": "updateSignatureManager", "outputs": [
		], "stateMutability": "nonpayable", "type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256", "name": "_withdrawalDelaySeconds", "type": "uint256"
			},
		], "name": "updateWithdrawalDelaySeconds", "outputs": [
		], "stateMutability": "nonpayable", "type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256", "name": "withdrawalRequestId", "type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "bool", "name": "forERC20", "type": "bool"
					},
					{
						"internalType": "bool", "name": "forERC721", "type": "bool"
					},
					{
						"internalType": "address", "name": "creator", "type": "address"
					},
					{
						"internalType": "address", "name": "to", "type": "address"
					},
					{
						"internalType": "address", "name": "token", "type": "address"
					},
					{
						"internalType": "uint256", "name": "amount", "type": "uint256"
					},
					{
						"internalType": "uint256", "name": "tokenId", "type": "uint256"
					},
					{
						"internalType": "uint256", "name": "forVoteCount", "type": "uint256"
					},
					{
						"internalType": "uint256", "name": "againstVoteCount", "type": "uint256"
					},
					{
						"internalType": "uint256", "name": "latestRelevantApproveVoteTime", "type": "uint256"
					},
					{
						"internalType": "address[]", "name": "votedMembers", "type": "address[]"
					},
				], "internalType": "struct WithdrawalRequest", "name": "__withdrawalRequest", "type": "tuple"
			},
		], "name": "updateWithdrawalRequest", "outputs": [
		], "stateMutability": "nonpayable", "type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256", "name": "withdrawalRequestId", "type": "uint256"
			},
			{
				"internalType": "bool", "name": "vote", "type": "bool"
			},
		], "name": "voteOnWithdrawalRequest", "outputs": [
		], "stateMutability": "nonpayable", "type": "function"
	},
	{
		"inputs": [
		], "name": "withdrawalDelaySeconds", "outputs": [
			{
				"internalType": "uint256", "name": "", "type": "uint256"
			},
		], "stateMutability": "view", "type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256", "name": "withdrawalRequestId", "type": "uint256"
			},
		], "name": "withdrawalRequestId_withdralRequest", "outputs": [
			{
				"components": [
					{
						"internalType": "bool", "name": "forERC20", "type": "bool"
					},
					{
						"internalType": "bool", "name": "forERC721", "type": "bool"
					},
					{
						"internalType": "address", "name": "creator", "type": "address"
					},
					{
						"internalType": "address", "name": "to", "type": "address"
					},
					{
						"internalType": "address", "name": "token", "type": "address"
					},
					{
						"internalType": "uint256", "name": "amount", "type": "uint256"
					},
					{
						"internalType": "uint256", "name": "tokenId", "type": "uint256"
					},
					{
						"internalType": "uint256", "name": "forVoteCount", "type": "uint256"
					},
					{
						"internalType": "uint256", "name": "againstVoteCount", "type": "uint256"
					},
					{
						"internalType": "uint256", "name": "latestRelevantApproveVoteTime", "type": "uint256"
					},
					{
						"internalType": "address[]", "name": "votedMembers", "type": "address[]"
					},
				], "internalType": "struct WithdrawalRequest", "name": "", "type": "tuple"
			},
		], "stateMutability": "view", "type": "function"
	},
	{
		"stateMutability": "payable", "type": "receive"
	},
];
