type yieldSyncContractAddresses = {
	yieldSyncGovernance: string,
	yieldSyncV1VaultFactory: string,
	yieldSyncV1VaultAccessControl: string
}

export default {
	address: {
		goerli: {
			yieldSyncGovernance: "",
			yieldSyncV1VaultFactory: "",
			yieldSyncV1VaultAccessControl: "",
			yieldSyncV1ATransferRequestProtocol: "",
		},

		mainnet: {
			yieldSyncGovernance: "",
			yieldSyncV1VaultFactory: "",
			yieldSyncV1VaultAccessControl: "",
			yieldSyncV1ATransferRequestProtocol: "",
		},

		sepolia: {
			yieldSyncGovernance: "0x2dbd8bA2F7C400f15d8779F4bB234f0CD60e4617",
			yieldSyncV1VaultFactory: "0x5a6a5A471a5A46Ad988FCa03B4a464Aaf42A50c0",
			yieldSyncV1VaultAccessControl: "0x79bb72F5f3157754770A32bb4d2e74b385540C30",
			yieldSyncV1ATransferRequestProtocol: "0x17df27f4371F8f8660525A86FA17bC58a0384f4b",
		},
	} as {
		goerli: yieldSyncContractAddresses,
		mainnet: yieldSyncContractAddresses,
		sepolia: yieldSyncContractAddresses
	}
};
