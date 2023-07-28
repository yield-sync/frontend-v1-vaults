import { ethers } from "ethers";
import { createStore } from "vuex";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { Contract } from "web3-eth-contract";

import abiER20 from "../abi/erc20";
import alchemyGetBalances from "../alchemy/getBalances";
import alchemyGetGetNFTBalances from "../alchemy/getNFTBalances";
import config from "../config";
import YieldSyncGovernance from "../abi/YieldSyncGovernance";
import YieldSyncV1VaultFactory from "../abi/YieldSyncV1VaultFactory";
import YieldSyncV1VaultAccessControl from "../abi/YieldSyncV1VaultAccessControl";


export default createStore({
	state: {
		ZERO_ADDRESS: ethers.ZeroAddress as string,
		loading: true as boolean,
		error: "" as string,

		// eslint-disable-next-line
		config: config as any,

		// eslint-disable-next-line
		web3: window.ethereum ? new Web3(window.ethereum) : undefined as undefined | any,

		currentChain: {
			name: "mainnet" as string,
			id: 1 as number,
		},

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
		alchemyOpApiKey: "" as string,

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
					for: "Ether" as "Ether" | "ERC 20" | "ERC 721",
					to: "" as string,
					token: "" as string,
					amount: 0 as number,
					tokenId: 0 as number,
				}
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

		setCurrentChainId(state, chainId: number)
		{
			state.currentChain.id = chainId;
		},

		setCurrentChainName(state, chainId: number)
		{
			switch (chainId)
			{
			case 1:
				state.currentChain.name = "mainnet";
				break;

			case 11155111:
				state.currentChain.name = "sepolia";
				break;

			case 420:
				state.currentChain.name = "optimisticGoerli";
				break;

			default:
				state.currentChain.name = "?";
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
			commit("setCurrentChainId", await state.web3.eth.net.getId());
			commit("setCurrentChainName", await state.web3.eth.net.getId());
			commit(
				"setEtherscanDomainStart",
				state.currentChain.name !== "mainnet" ? state.currentChain.name : "www"
			);
		},

		generateYieldSyncContracts: async ({ commit, state }) =>
		{
			if (state.config.address[state.currentChain.name].yieldSyncGovernance == state.ZERO_ADDRESS)
			{
				state.error = "Network not currently supported";

				return;
			}

			state.error = "";

			// Governance
			commit(
				"setYieldSyncGovernance",
				new state.web3.eth.Contract(
					YieldSyncGovernance as AbiItem[],
					state.config.address[state.currentChain.name].yieldSyncGovernance
				)
			);
			// Factory
			commit(
				"setYieldSyncV1VaultFactory",
				new state.web3.eth.Contract(
					YieldSyncV1VaultFactory as AbiItem[],
					state.config.address[state.currentChain.name].yieldSyncV1VaultFactory
				)
			);
			// Access Control
			commit(
				"setYieldSyncV1VaultAccessControl",
				new state.web3.eth.Contract(
					YieldSyncV1VaultAccessControl as AbiItem[],
					state.config.address[state.currentChain.name].yieldSyncV1VaultAccessControl
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
				const alchemyERCData: any = await alchemyGetBalances(state.alchemyApiKey, vaultAddress);

				if (!alchemyERCData)
				{
					return;
				}

				for (let i = 0; i < alchemyERCData.tokenBalances.length; i++)
				{
					if (alchemyERCData.tokenBalances[i].tokenBalance != state.ZERO_ADDRESS)
					{
						const contract = new state.web3.eth.Contract(
							abiER20 as AbiItem[],
							alchemyERCData.tokenBalances[i].contractAddress
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
								contract: alchemyERCData.tokenBalances[i].contractAddress
							}
						);
					}
				}

				commit("setPagesRVV1VaultErc20s", erc20s);
			}
		},

		getERC721Tokens: async ({ commit, state }) =>
		{
			const vaultAddress: string = String(state.pages.RVV1Vault.vaultAddress);

			const erc721s: {
				name: string,
				symbol: string,
				contract: string,
			}[] = [
			];

			if (state.web3.utils.isAddress(vaultAddress))
			{
				// eslint-disable-next-line
				const alchemyNFTData: any = await alchemyGetGetNFTBalances(state.alchemyApiKey, vaultAddress);

				if (!alchemyNFTData)
				{
					return;
				}

				for (let i = 0; i < alchemyNFTData.ownedNfts.length; i++)
				{
					let name = "Unknown";

					try
					{
						name = alchemyNFTData.ownedNfts[i].contract.name;
					}
					catch (e)
					{
						state.error = String(e);
					}

					let symbol = "NA";

					try
					{
						symbol = alchemyNFTData.ownedNfts[i].contract.symbol;
					}
					catch (e)
					{
						state.error = "Symbol: " + String(e);
					}

					erc721s.push(
						{
							name,
							symbol,
							contract: alchemyNFTData.ownedNfts[i].contract.address
						}
					);
				}
			}

			commit("setPagesRVV1VaultErc721s", erc721s);
		}
	},

	getters: {
	},

	modules: {
	}
});
