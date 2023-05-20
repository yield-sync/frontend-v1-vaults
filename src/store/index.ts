import { createStore } from "vuex";
import Web3 from "web3";
import { AbiItem } from "web3-utils";

import config from "../config";
import YieldSyncGovernance from "../abi/YieldSyncGovernance";
import YieldSyncV1VaultFactory from "../abi/YieldSyncV1VaultFactory";
import YieldSyncV1VaultAccessControl from "../abi/YieldSyncV1VaultAccessControl";


export default createStore({
	state: {
		loading: true as boolean,
		error: "" as string,

		config: config as any,

		web3: window.ethereum ? new Web3(window.ethereum) : undefined as undefined | any,

		chainName: "" as string,
		chainId: 0 as number,
		etherscanDomainStart: "www" as string,

		wallet: {
			connected: false,
			accounts: [
			],
		} as {
			connected: boolean,
			accounts: any[]
		},

		vaults: [
		] as any,

		alchemyApiKey: "" as string,
		isAdmin: false as boolean,
		contract: {
			yieldSyncGovernance: undefined as undefined | any,
			yieldSyncV1VaultFactory: undefined as undefined | any,
			yieldSyncV1VaultAccessControl: undefined as undefined | any,
		} as any
	},

	mutations: {
		setError(state, e: string)
		{
			state.error = e;
		},

		setLoading(state, l: boolean)
		{
			state.loading = l;
		},

		setChainId(state, id: number)
		{
			state.chainId = id;
		},

		setChainName(state, chainId: number)
		{
			switch (chainId)
			{
			case 1:
				state.chainName = "mainnet";
				break;

			case 5:
				state.chainName = "goerli";
				break;

			case 11155111:
				state.chainName = "sepolia";
				break;

			default:
				state.chainName = "?";
				break;
			}
		},

		setEtherscanDomainStart(state, etherscanDomainStart: string)
		{
			state.etherscanDomainStart = etherscanDomainStart;
		},

		setYieldSyncGovernance(state, contract)
		{
			state.contract.yieldSyncGovernance = contract;
		},

		setYieldSyncV1VaultFactory(state, contract)
		{
			state.contract.yieldSyncV1VaultFactory = contract;
		},

		setYieldSyncV1VaultAccessControl(state, contract)
		{
			state.contract.yieldSyncV1VaultAccessControl = contract;
		},
	},

	actions: {
		generateChainRelatedData: async ({ commit, state }) =>
		{
			commit("setChainId", await state.web3.eth.net.getId());
			commit("setChainName", await state.web3.eth.net.getId());
			commit("setEtherscanDomainStart", state.chainName !== "mainnet" ? state.chainName : "www");
		},

		generateYieldSyncContracts: async ({ commit, state }) =>
		{
			// Governance
			commit(
				"setYieldSyncGovernance",
				new state.web3.eth.Contract(
					YieldSyncGovernance as AbiItem[],
					state.config.address[state.chainName].yieldSyncGovernance
				)
			);
			// Factory
			commit(
				"setYieldSyncV1VaultFactory",
				new state.web3.eth.Contract(
					YieldSyncV1VaultFactory as AbiItem[],
					state.config.address[state.chainName].yieldSyncV1VaultFactory
				)
			);
			// Access Control
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
