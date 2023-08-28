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
			yieldSyncV1VaultFactory: "0xE531B12d37D952e3C33fdD62B3506F7642191272",
			yieldSyncV1VaultRegistry: "0x43b4E1F9F7A00536bd1De0bFe080c8536dAc4091",
			yieldSyncV1ATransferRequestProtocol: "0xa31587Fa3031243fcb535B45a1bbB29420EA30EB",
			yieldSyncV1BTransferRequestProtocol: "0x0000000000000000000000000000000000000000",

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
