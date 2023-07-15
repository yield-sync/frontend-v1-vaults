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
			yieldSyncV1VaultFactory: "0xfF91158c8BAE2a922ceeB6F011b0d0Bc4911c033",
			yieldSyncV1VaultAccessControl: "0x3476d5c5d4Bf849F483A95dCcC7ECAe305c3fB3F",
			yieldSyncV1ATransferRequestProtocol: "0x98D23B69d852B751F25b92981262cBb579989879",
		},
	} as {
		goerli: yieldSyncContractAddresses,
		mainnet: yieldSyncContractAddresses,
		sepolia: yieldSyncContractAddresses
	}
};
