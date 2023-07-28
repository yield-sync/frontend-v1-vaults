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
			yieldSyncV1VaultFactory: "0xEde9646b1e60A92F4E66f84BD49604912De635C1",
			yieldSyncV1VaultAccessControl: "0x348bcF3657CB008503fB56618F9EA03FDbCa2205",
			yieldSyncV1ATransferRequestProtocol: "0x5F85Ee84D38E0b6B7b57817Ccf8B70117e7864cc",

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
			yieldSyncGovernance: "0x35E0Df7a18E112e879FA34576e412d999557C1a5",
			yieldSyncV1VaultFactory: "0x2772a4ffc5d27EfB07c629b3fEB17E4D46550fe3",
			yieldSyncV1VaultAccessControl: "0x8f06A70d0BE255B851ef838f3593D410e4144550",
			yieldSyncV1ATransferRequestProtocol: "0x9157F5854bD49CC7e13FAe5209A447e241a49582",

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
