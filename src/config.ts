type yieldSyncContractAddresses = {
	yieldSyncGovernance: string,
	yieldSyncV1VaultFactory: string,
	yieldSyncV1VaultAccessControl: string
}

type networkYieldSyncContractAddresses = {
	goerli: yieldSyncContractAddresses,
	mainnet: yieldSyncContractAddresses,
	sepolia: yieldSyncContractAddresses
}

export default {
	address: {
		goerli: {
			yieldSyncGovernance: "",
			yieldSyncV1VaultFactory: "",
			yieldSyncV1VaultAccessControl: "",
		},

		mainnet: {
			yieldSyncGovernance: "",
			yieldSyncV1VaultFactory: "",
			yieldSyncV1VaultAccessControl: "",
		},

		sepolia: {
			yieldSyncGovernance: "0x2dbd8bA2F7C400f15d8779F4bB234f0CD60e4617",
			yieldSyncV1VaultFactory: "0x29669074FfA446308ac72A3A060b3215BC4699b3",
			yieldSyncV1VaultAccessControl: "0x3191d2C62C920297b8E50f45CF10025C86af119C",
		},
	} as networkYieldSyncContractAddresses
};
