type NetworkChain = {
	chainId: string,
	chainName: string,
	nativeCurrency: {
		name: string,
		symbol: string,
		decimals: number,
	},
	rpcUrls: string[],
	blockExplorerUrls: string[]
	icon: string,
	yieldSyncGovernance: string,
	yieldSyncV1VaultFactory: string,
	yieldSyncV1VaultRegistry: string,
	yieldSyncV1ATransferRequestProtocol: string,
}

export default {
	networkChain: {
		// Mainnet
		mainnet: {
			chainId: "0x1",
			chainName: "Ethereum Mainnet",
			nativeCurrency: {
				name: "ETH",
				symbol: "ETH",
				decimals: 18
			},
			rpcUrls: [
			],
			blockExplorerUrls: [
				"https://etherscan.io",
			],
			icon: require("./assets/eth.svg"),
			yieldSyncGovernance: "0x0000000000000000000000000000000000000000",
			yieldSyncV1VaultFactory: "0x0000000000000000000000000000000000000000",
			yieldSyncV1VaultRegistry: "0x0000000000000000000000000000000000000000",
			yieldSyncV1ATransferRequestProtocol: "0x0000000000000000000000000000000000000000",
			yieldSyncV1BTransferRequestProtocol: "0x0000000000000000000000000000000000000000",
		},

		// Seploia
		sepolia: {
			chainId: "0xAA36A7",
			chainName: "Ethereum Sepolia",
			nativeCurrency: {
				name: "ETH",
				symbol: "ETH",
				decimals: 18
			},
			rpcUrls: [
			],
			blockExplorerUrls: [
				"https://etherscan.io",
			],
			icon: require("./assets/eth.svg"),
			yieldSyncGovernance: "0x2dbd8bA2F7C400f15d8779F4bB234f0CD60e4617",
			yieldSyncV1VaultFactory: "0xE5fbf26920660f5a7048a9030E23A30b9BDA48bF",
			yieldSyncV1VaultRegistry: "0xcEa06314a6627F1166375e03D70b9E80EA1Fe1eA",
			yieldSyncV1ATransferRequestProtocol: "0xa31587Fa3031243fcb535B45a1bbB29420EA30EB",
			yieldSyncV1BTransferRequestProtocol: "0xe8633fC32Dd4B46FCfa559aCDe88861B330f07a1",

		},

		// Optimistic Goerli
		optimisticGoerli: {
			chainId: "0x1A4",
			chainName: " Optimistic Görli",
			nativeCurrency: {
				name: "GOR",
				symbol: "GOR",
				decimals: 18
			},
			rpcUrls: [
			],
			blockExplorerUrls: [
				"https://etherscan.io",
			],
			icon: require("./assets/op.svg"),
			yieldSyncGovernance: "0x0000000000000000000000000000000000000000",
			yieldSyncV1VaultFactory: "0x0000000000000000000000000000000000000000",
			yieldSyncV1VaultRegistry: "0x0000000000000000000000000000000000000000",
			yieldSyncV1ATransferRequestProtocol: "0x0000000000000000000000000000000000000000",
			yieldSyncV1BTransferRequestProtocol: "0x0000000000000000000000000000000000000000",

		},
	},
} as {
	networkChain: {
		[key: string]: NetworkChain
	},
};
