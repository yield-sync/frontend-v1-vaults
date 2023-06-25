import { createStore } from "vuex";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { Contract } from "web3-eth-contract";

import abiER20 from "../abi/erc20";
import alchemyGetBalances from "../alchemy/getBalances";
import config from "../config";
import YieldSyncGovernance from "../abi/YieldSyncGovernance";
import YieldSyncV1VaultFactory from "../abi/YieldSyncV1VaultFactory";
import YieldSyncV1VaultAccessControl from "../abi/YieldSyncV1VaultAccessControl";


export default createStore({
	state: {
		ZeroAddress: "0x0000000000000000000000000000000000000000" as const,

		loading: true as boolean,
		error: "" as string,

		// eslint-disable-next-line
		config: config as any,

		// eslint-disable-next-line
		web3: window.ethereum ? new Web3(window.ethereum) : undefined as undefined | any,

		chainName: "" as string,
		chainId: 0 as number,
		etherscanDomainStart: "www" as "www" | "sepolia" | string,

		wallet: {
			connected: false,
			accounts: [
			],
		} as {
			connected: boolean,
			accounts: string[]
		},

		alchemyApiKey: "" as string,
		isAdmin: false as boolean,

		contract: {
			yieldSyncGovernance: undefined,
			yieldSyncV1VaultFactory: undefined,
			yieldSyncV1VaultAccessControl: undefined,
		} as {
			yieldSyncGovernance: undefined | Contract
			yieldSyncV1VaultFactory: undefined | Contract
			yieldSyncV1VaultAccessControl: undefined | Contract
		},

		pages: {
			RVDashboard: {
				tab: "m" as "m" | "a" | "d"
			},

			RVV1Vault: {
				vaultAddress: "" as string,

				tab: "overview" as "tr" | "overview" | "admins-and-members" | "settings",

				erc20s: [
				] as {
					name: string,
					symbol: string,
					contract: string,
				}[],

				erc721s: [
				] as {
					name: string,
					symbol: string,
					contract: string,
				}[],

				transferRequests: {
					tab: "o" as  "o" | "c",
					key: 0 as number,
				},

				transferRequest: {
					for: "Ether",
					to: "",
					token: "",
					amount: 0,
					tokenId: 0,
				} as {
					for: "Ether" | "ERC 20" | "ERC 721",
					to:  string,
					token: string,
					amount: number,
					tokenId: number,
				},
			}
		},
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

		setYieldSyncGovernance(state, contract: Contract)
		{
			state.contract.yieldSyncGovernance = contract;
		},

		setYieldSyncV1VaultFactory(state, contract: Contract)
		{
			state.contract.yieldSyncV1VaultFactory = contract;
		},

		setYieldSyncV1VaultAccessControl(state, contract: Contract)
		{
			state.contract.yieldSyncV1VaultAccessControl = contract;
		},

		setPagesRVV1VaultVaultAddress(state, vaultAddress: string)
		{
			state.pages.RVV1Vault.vaultAddress = vaultAddress;
		},

		setPagesRVV1VaultErc20s(state, erc20s: { name: string, symbol: string, contract: string, }[])
		{
			state.pages.RVV1Vault.erc20s = erc20s;
		},

		setPagesRVV1VaultErc721s(state, erc721s: { name: string, symbol: string, contract: string, }[])
		{
			state.pages.RVV1Vault.erc721s = erc721s;
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

		getTokens: async ({ commit, state }) =>
		{
			const vaultAddress: string = String(state.pages.RVV1Vault.vaultAddress);

			const erc20s: {
				name: string,
				symbol: string,
				contract: string,
			}[] = [
			];

			if (state.web3.utils.isAddress(vaultAddress))
			{
				// eslint-disable-next-line
				const data: any = await alchemyGetBalances(state.alchemyApiKey, vaultAddress);

				for (let i = 0; i < data.tokenBalances.length; i++)
				{
					if (data.tokenBalances[i].tokenBalance != state.ZeroAddress)
					{
						const contract = new state.web3.eth.Contract(
							abiER20 as AbiItem[],
							data.tokenBalances[i].contractAddress
						);

						let n = "NA";
						try
						{
							n = await contract.methods.name().call();
						}
						catch (e)
						{
							state.error = String(e);
						}

						let s = "NA";
						try
						{
							s = await contract.methods.symbol().call();
						}
						catch (e)
						{
							state.error = String(e);
						}

						erc20s.push(
							{
								name: n,
								symbol: s,
								contract: data.tokenBalances[i].contractAddress
							}
						);
					}
				}

				commit("setPagesRVV1VaultErc20s", erc20s);
			}
		}
	},

	getters: {
	},

	modules: {
	}
});
