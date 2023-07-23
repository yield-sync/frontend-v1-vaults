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
			yieldSyncV1VaultFactory: "0x835efa9eeec4eE11Ee70e4A9BB966cD59035B874",
			yieldSyncV1VaultAccessControl: "0xf45B17C464Dfe3159d49EA8F12741ebfBa174a1c",
			yieldSyncV1ATransferRequestProtocol: "0xDDe40A5f6d35bBd680925E0c0bE4527a74c527EA",
		},
	} as {
		goerli: yieldSyncContractAddresses,
		mainnet: yieldSyncContractAddresses,
		sepolia: yieldSyncContractAddresses
	}
};
