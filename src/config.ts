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
			yieldSyncV1VaultFactory: "0xf368bdA5498E263DD2b191e3587a37196B2A3D6A",
			yieldSyncV1VaultAccessControl: "0x082090098D8dd09144c7A443F7A38044e98c4647",
			yieldSyncV1ATransferRequestProtocol: "0x2016aef7bfe6e0755a23195Faa37BA06a9266CA9",
		},
	} as {
		goerli: yieldSyncContractAddresses,
		mainnet: yieldSyncContractAddresses,
		sepolia: yieldSyncContractAddresses
	}
};
