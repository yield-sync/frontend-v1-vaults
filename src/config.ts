type Config = {
	address: {
		[key: string]: {
			yieldSyncGovernance: string,
			yieldSyncV1VaultFactory: string,
			yieldSyncV1VaultAccessControl: string
			yieldSyncV1ATransferRequestProtocol: string
		}
	}
}

export default {
	address: {
		mainnet: {
			yieldSyncGovernance: "",
			yieldSyncV1VaultFactory: "",
			yieldSyncV1VaultAccessControl: "",
			yieldSyncV1ATransferRequestProtocol: "",
		},

		optimisticEthereum: {
			yieldSyncGovernance: "",
			yieldSyncV1VaultFactory: "",
			yieldSyncV1VaultAccessControl: "",
			yieldSyncV1ATransferRequestProtocol: "",
		},

		optimisticGoerli: {
			yieldSyncGovernance: "0x35E0Df7a18E112e879FA34576e412d999557C1a5",
			yieldSyncV1VaultFactory: "0x2772a4ffc5d27EfB07c629b3fEB17E4D46550fe3",
			yieldSyncV1VaultAccessControl: "0x8f06A70d0BE255B851ef838f3593D410e4144550",
			yieldSyncV1ATransferRequestProtocol: "0x9157F5854bD49CC7e13FAe5209A447e241a49582",
		},

		arbitrumOne: {
			yieldSyncGovernance: "",
			yieldSyncV1VaultFactory: "",
			yieldSyncV1VaultAccessControl: "",
			yieldSyncV1ATransferRequestProtocol: "",
		},

		polygon: {
			yieldSyncGovernance: "",
			yieldSyncV1VaultFactory: "",
			yieldSyncV1VaultAccessControl: "",
			yieldSyncV1ATransferRequestProtocol: "",
		},

		sepolia: {
			yieldSyncGovernance: "0x2dbd8bA2F7C400f15d8779F4bB234f0CD60e4617",
			yieldSyncV1VaultFactory: "0xEde9646b1e60A92F4E66f84BD49604912De635C1",
			yieldSyncV1VaultAccessControl: "0x348bcF3657CB008503fB56618F9EA03FDbCa2205",
			yieldSyncV1ATransferRequestProtocol: "0x5F85Ee84D38E0b6B7b57817Ccf8B70117e7864cc",
		},
	}
} as Config;
