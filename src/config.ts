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
			yieldSyncV1VaultFactory: "0x97d1e8cd994579cedea02dca668e7d61fe1dea5c",
			yieldSyncV1VaultAccessControl: "0x0A1Bd6B7769458f346Fe2eA10a9795Cd32376DEA",
		},
	} as networkYieldSyncContractAddresses
};
