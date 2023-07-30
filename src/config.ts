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
			yieldSyncV1VaultAccessControl: "0x0000000000000000000000000000000000000000",
			yieldSyncV1ATransferRequestProtocol: "0x0000000000000000000000000000000000000000",
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
			yieldSyncV1VaultFactory: "0x3F0CdE27B437C58FF6e06E14d60df830D3503649",
			yieldSyncV1VaultAccessControl: "0xc8dd5EE160d97c59A5fD4634a1Ce25D916ee612c",
			yieldSyncV1ATransferRequestProtocol: "0xeccd81fA847E67F59D0197e99B652c0eC9F84785",

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
			yieldSyncV1VaultAccessControl: "0x0000000000000000000000000000000000000000",
			yieldSyncV1ATransferRequestProtocol: "0x0000000000000000000000000000000000000000",

		},
	},
} as {
	networkChain: {
		[key: string]: {
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
		}
	},
};
