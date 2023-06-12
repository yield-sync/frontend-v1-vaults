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
				"internalType": "uint256", "name": "_transferDelaySeconds", "type": "uint256" 
			},
		], "stateMutability": "nonpayable", "type": "constructor" 
	},
	{
		"anonymous": false, "inputs": [
			{
				"indexed": false, "internalType": "uint256", "name": "transferRequestId", "type": "uint256" 
			},
		], "name": "CreatedTransferRequest", "type": "event" 
	},
	{
		"anonymous": false, "inputs": [
			{
				"indexed": false, "internalType": "uint256", "name": "transferRequestId", "type": "uint256" 
			},
		], "name": "DeletedTransferRequest", "type": "event" 
	},
	{
		"anonymous": false, "inputs": [
			{
				"indexed": false, "internalType": "uint256", "name": "transferRequestId", "type": "uint256" 
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
				"indexed": false, "internalType": "uint256", "name": "transferRequestId", "type": "uint256" 
			},
		], "name": "ProcessTransferRequestFailed", "type": "event" 
	},
	{
		"anonymous": false, "inputs": [
			{
				"indexed": true, "internalType": "address", "name": "to", "type": "address" 
			},
			{
				"indexed": true, "internalType": "address", "name": "token", "type": "address" 
			},
			{
				"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" 
			},
		], "name": "TokensTransferred", "type": "event" 
	},
	{
		"anonymous": false, "inputs": [
			{
				"indexed": false, "internalType": "uint256", "name": "transferRequestId", "type": "uint256" 
			},
		], "name": "TransferRequestReadyToBeProcessed", "type": "event" 
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
				"indexed": false, "internalType": "uint256", "name": "transferDelaySeconds", "type": "uint256" 
			},
		], "name": "UpdatedTransferDelaySeconds", "type": "event" 
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
						"internalType": "address", "name": "token", "type": "address" 
					},
					{
						"internalType": "uint256", "name": "tokenId", "type": "uint256" 
					},
					{
						"internalType": "uint256", "name": "amount", "type": "uint256" 
					},
					{
						"internalType": "address", "name": "to", "type": "address" 
					},
					{
						"internalType": "uint256", "name": "forVoteCount", "type": "uint256" 
					},
					{
						"internalType": "uint256", "name": "againstVoteCount", "type": "uint256" 
					},
					{
						"internalType": "uint256", "name": "latestRelevantForVoteTime", "type": "uint256" 
					},
					{
						"internalType": "address[]", "name": "votedMembers", "type": "address[]" 
					},
				], "indexed": false, "internalType": "struct TransferRequest", "name": "transferRequest", "type": "tuple" 
			},
		], "name": "UpdatedTransferRequest", "type": "event" 
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
		], "name": "createTransferRequest", "outputs": [
		], "stateMutability": "nonpayable", "type": "function" 
	},
	{
		"inputs": [
			{
				"internalType": "uint256", "name": "transferRequestId", "type": "uint256" 
			},
		], "name": "deleteTransferRequest", "outputs": [
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
		], "name": "idsOfOpenTransferRequests", "outputs": [
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
				"internalType": "uint256", "name": "transferRequestId", "type": "uint256" 
			},
		], "name": "processTransferRequest", "outputs": [
		], "stateMutability": "nonpayable", "type": "function" 
	},
	{
		"inputs": [
		], "name": "processTransferRequestLocked", "outputs": [
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
		], "name": "transferDelaySeconds", "outputs": [
			{
				"internalType": "uint256", "name": "", "type": "uint256" 
			},
		], "stateMutability": "view", "type": "function" 
	},
	{
		"inputs": [
			{
				"internalType": "uint256", "name": "transferRequestId", "type": "uint256" 
			},
		], "name": "transferRequestId_transferRequest", "outputs": [
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
						"internalType": "address", "name": "token", "type": "address" 
					},
					{
						"internalType": "uint256", "name": "tokenId", "type": "uint256" 
					},
					{
						"internalType": "uint256", "name": "amount", "type": "uint256" 
					},
					{
						"internalType": "address", "name": "to", "type": "address" 
					},
					{
						"internalType": "uint256", "name": "forVoteCount", "type": "uint256" 
					},
					{
						"internalType": "uint256", "name": "againstVoteCount", "type": "uint256" 
					},
					{
						"internalType": "uint256", "name": "latestRelevantForVoteTime", "type": "uint256" 
					},
					{
						"internalType": "address[]", "name": "votedMembers", "type": "address[]" 
					},
				], "internalType": "struct TransferRequest", "name": "", "type": "tuple" 
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
				"internalType": "uint256", "name": "_transferDelaySeconds", "type": "uint256" 
			},
		], "name": "updateTransferDelaySeconds", "outputs": [
		], "stateMutability": "nonpayable", "type": "function" 
	},
	{
		"inputs": [
			{
				"internalType": "uint256", "name": "transferRequestId", "type": "uint256" 
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
						"internalType": "address", "name": "token", "type": "address" 
					},
					{
						"internalType": "uint256", "name": "tokenId", "type": "uint256" 
					},
					{
						"internalType": "uint256", "name": "amount", "type": "uint256" 
					},
					{
						"internalType": "address", "name": "to", "type": "address" 
					},
					{
						"internalType": "uint256", "name": "forVoteCount", "type": "uint256" 
					},
					{
						"internalType": "uint256", "name": "againstVoteCount", "type": "uint256" 
					},
					{
						"internalType": "uint256", "name": "latestRelevantForVoteTime", "type": "uint256" 
					},
					{
						"internalType": "address[]", "name": "votedMembers", "type": "address[]" 
					},
				], "internalType": "struct TransferRequest", "name": "__transferRequest", "type": "tuple" 
			},
		], "name": "updateTransferRequest", "outputs": [
		], "stateMutability": "nonpayable", "type": "function" 
	},
	{
		"inputs": [
			{
				"internalType": "uint256", "name": "transferRequestId", "type": "uint256" 
			},
			{
				"internalType": "bool", "name": "vote", "type": "bool" 
			},
		], "name": "voteOnTransferRequest", "outputs": [
		], "stateMutability": "nonpayable", "type": "function" 
	},
	{
		"stateMutability": "payable", "type": "receive" 
	},
];
