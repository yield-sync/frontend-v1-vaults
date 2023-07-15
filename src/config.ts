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
			yieldSyncV1VaultFactory: "0x03fC0D60dFa8CCF80c59CaBa7d20c48DBd4e3727",
			yieldSyncV1VaultAccessControl: "0xb1AE4F8CBEd7e81764897AD141983ca4058ed8be",
			yieldSyncV1ATransferRequestProtocol: "0x7e4237DCEcDcf0B133F6d258eDFc088B525A0e1F",
		},
	} as networkYieldSyncContractAddresses
};
