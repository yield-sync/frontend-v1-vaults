import { createStore } from "vuex";
import Web3 from "web3";
import { AbiItem } from "web3-utils";

import config from "../config";
import YieldSyncGovernance from "../abi/YieldSyncGovernance";
import YieldSyncV1Vault from "../abi/YieldSyncV1Vault";
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
			adminshipYieldSyncV1VaultVaults: [
			] as any[],
			membershipYieldSyncV1VaultVaults: [
			] as any[]
		} as any,

		adminshipYieldSyncV1VaultVaults: [
		] as {
			address: string;
			againstVoteCountRequired: number;
			forVoteCountRequired: number;
			withdrawalDelaySeconds: number;
		}[],

		membershipYieldSyncV1VaultVaults: [
		] as {
			address: string;
			againstVoteCountRequired: number;
			forVoteCountRequired: number;
			withdrawalDelaySeconds: number;
		}[],
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

		setContractAdminshipYieldSyncV1VaultVaults(state, contract)
		{
			state.contract.adminshipYieldSyncV1VaultVaults.push(contract);
		},

		setContractMembershipYieldSyncV1VaultVaults(state, contract)
		{
			state.contract.membershipYieldSyncV1VaultVaults.push(contract);
		},

		setAdminshipYieldSyncV1VaultVaults(state, contract)
		{
			state.adminshipYieldSyncV1VaultVaults.push(contract);
		},

		setMembershipYieldSyncV1VaultVaults(state, contract)
		{
			state.membershipYieldSyncV1VaultVaults.push(contract);
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

		generateMembershipVaults: async ({ commit, state }) =>
		{
			const v1Vaults = await state.contract.yieldSyncV1VaultAccessControl.methods.member_yieldSyncV1Vaults(
				state.wallet.accounts[0]
			).call();

			for (let i = 0; i < v1Vaults.length; i++)
			{
				const yieldSyncV1Vault = new state.web3.eth.Contract(YieldSyncV1Vault as AbiItem[], v1Vaults[i]);

				commit("setContractMembershipYieldSyncV1VaultVaults", yieldSyncV1Vault);

				commit("setMembershipYieldSyncV1VaultVaults", {
					address: v1Vaults[i],
					againstVoteCountRequired: await yieldSyncV1Vault.methods.againstVoteCountRequired().call(),
					forVoteCountRequired: await yieldSyncV1Vault.methods.forVoteCountRequired().call(),
					withdrawalDelaySeconds: await yieldSyncV1Vault.methods.withdrawalDelaySeconds().call(),
				});
			}
		},

		generateAdminshipVaults: async ({ commit, state }) =>
		{
			const v1Vaults = await state.contract.yieldSyncV1VaultAccessControl.methods.admin_yieldSyncV1Vaults(
				state.wallet.accounts[0]
			).call();

			for (let i = 0; i < v1Vaults.length; i++)
			{
				const yieldSyncV1Vault = new state.web3.eth.Contract(YieldSyncV1Vault as AbiItem[], v1Vaults[i]);

				commit("setContractAdminshipYieldSyncV1VaultVaults", yieldSyncV1Vault);

				commit("setAdminshipYieldSyncV1VaultVaults", {
					address: v1Vaults[i],
					againstVoteCountRequired: await yieldSyncV1Vault.methods.againstVoteCountRequired().call(),
					forVoteCountRequired: await yieldSyncV1Vault.methods.forVoteCountRequired().call(),
					withdrawalDelaySeconds: await yieldSyncV1Vault.methods.withdrawalDelaySeconds().call(),
				});
			}
		},
	},

	getters: {
	},

	modules: {
	}
});
