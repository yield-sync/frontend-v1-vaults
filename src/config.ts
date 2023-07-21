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
			yieldSyncV1VaultFactory: "0x39fBd5D5adb411E62EbB04d9e5b54FbfeaF56c5c",
			yieldSyncV1VaultAccessControl: "0xF976934eA4d2c21e05363F5207cC34C9E4AABE30",
			yieldSyncV1ATransferRequestProtocol: "0xB27330c131aaAD8E1f744dcC5F8b54a22F65394b",
		},
	} as {
		goerli: yieldSyncContractAddresses,
		mainnet: yieldSyncContractAddresses,
		sepolia: yieldSyncContractAddresses
	}
};
