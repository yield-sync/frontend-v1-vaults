import { createStore } from "vuex";
import Web3 from "web3";
import { AbiItem } from "web3-utils";

import config from "../config";
import YieldSyncGovernance from "../abi/YieldSyncGovernance";
import YieldSyncV1VaultFactory from "../abi/YieldSyncV1VaultFactory";
import YieldSyncV1VaultAccessControl from "../abi/YieldSyncV1VaultAccessControl";

export default createStore({
	state: {
		config: config as any,

		web3: window.ethereum ? new Web3(window.ethereum) : undefined as any | undefined,

		chainName: "" as string,
		chainId: 0 as number,
		etherscanDomainStart: "www" as string,

		accounts: [
		] as any,

		connected: false as boolean,
		loading: true as boolean,
		error: "" as string,

		vaults: [
		] as any,

		alchemyApiKey: "" as string,
		isAdmin: false as boolean,
		contract: {
			yieldSyncGovernance: undefined,
			yieldSyncV1VaultFactory: undefined,
			yieldSyncV1VaultAccessControl: undefined,
		} as any
	},

	mutations: {
		setYieldSyncGovernance(state, contract) {
			state.contract.yieldSyncGovernance = contract
		},

		setYieldSyncV1VaultFactory(state, contract) {
			state.contract.yieldSyncV1VaultFactory = contract
		},

		setYieldSyncV1VaultAccessControl(state, contract) {
			state.contract.yieldSyncV1VaultAccessControl = contract
		},
	},

	actions: {
		// Governance
		generateYieldSyncGovernance: async ({ commit, state }) => {
			commit(
				"setYieldSyncGovernance",
				new state.web3.eth.Contract(
					YieldSyncGovernance as AbiItem[],
					state.config.address[state.chainName].yieldSyncGovernance
				)
			);
		},

		// Factory
		generateYieldSyncV1VaultFactory: async ({ commit, state }) => {
			commit(
				"setYieldSyncV1VaultFactory",
				new state.web3.eth.Contract(
					YieldSyncV1VaultFactory as AbiItem[],
					state.config.address[state.chainName].yieldSyncV1VaultFactory
				)
			);
		},

		// Access Control
		generateYieldSyncV1AccessControl: async ({ commit, state }) => {
			commit(
				"setYieldSyncV1VaultAccessControl",
				new state.web3.eth.Contract(
					YieldSyncV1VaultAccessControl as AbiItem[],
					state.config.address[state.chainName].yieldSyncV1VaultAccessControl
				)
			);
		},
	},

	getters: {
	},

	modules: {
	}
});
