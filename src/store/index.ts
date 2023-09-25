import { ethers } from "ethers";
import { createStore } from "vuex";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { Contract } from "web3-eth-contract";

import abiER20 from "../abi/erc20";
import YieldSyncGovernance from "../abi/YieldSyncGovernance";
import YieldSyncV1Vault from "../abi/YieldSyncV1Vault";
import YieldSyncV1ATransferRequestProtocol from "../abi/YieldSyncV1ATransferRequestProtocol";
import YieldSyncV1VaultFactory from "../abi/YieldSyncV1VaultFactory";
import YieldSyncV1VaultRegistry from "../abi/YieldSyncV1VaultRegistry";
import alchemyGetBalances from "../alchemy/getBalances";
import alchemyGetGetNFTBalances from "../alchemy/getNFTBalances";
import config from "../config";


export default createStore({
	state: {
		ZERO_ADDRESS: ethers.ZeroAddress as string,

		message: "" as string,
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
			type: "" as string,
			connected: false as boolean,
			accounts: [
			] as string[],
		},

		alchemyApiKey: "" as string,
		alchemyOpApiKey: "" as string,

		isAdmin: false as boolean,

		contract: {
			yieldSyncGovernance: undefined as undefined | Contract,
			yieldSyncV1VaultFactory: undefined as undefined | Contract,
			yieldSyncV1VaultRegistry: undefined as undefined | Contract,
		},

		adminshipYieldSyncV1VaultVaults: [
		] as {
			address: string,
			voteAgainstRequired: number,
			voteForRequired: number,
			trpType: string,
		}[],

		membershipYieldSyncV1VaultVaults: [
		] as {
			address: string,
			voteAgainstRequired: number,
			voteForRequired: number,
			trpType: string,
		}[],

		view: {
			dashboard: {
				tab: "m" as "m" | "a" | "d",
			},

			v1Vault: {
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

				transferRequestA: {
					for: "Ether" as "Ether" | "ERC 20" | "ERC 721",
					to: "" as string,
					token: "" as string,
					amount: 0 as number,
					tokenId: 0 as number,
				},

				transferRequestB: {
					for: "Ether" as "Ether" | "ERC 20" | "ERC 721",
					to: "" as string,
					token: "" as string,
					amount: 0 as number,
					tokenId: 0 as number,
					voteCloseTimestamp: 86400 as number
				}
			}
		},
	},

	mutations: {
		setCurrentChainId(state, chainId: number): void
		{
			state.currentChain.id = chainId;
		},

		setCurrentChainName(state, chainId: number): void
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

		setError(state, e: string): void
		{
			state.error = e;
		},

		setEtherscanDomainStart(state, etherscanDomainStart: string): void
		{
			state.etherscanDomainStart = etherscanDomainStart;
		},

		setLoading(state, loading: boolean): void
		{
			state.loading = loading;
		},

		setMessage(state, message: string): void
		{
			state.message = message;
		},

		setPagesRVV1VaultVaultAddress(state, vaultAddress: string): void
		{
			state.view.v1Vault.vaultAddress = vaultAddress;
		},

		setPagesRVV1VaultErc20s(state, erc20s: { name: string, symbol: string, contract: string, }[]): void
		{
			state.view.v1Vault.erc20s = erc20s;
		},

		setPagesRVV1VaultErc721s(state, erc721s: { name: string, symbol: string, contract: string, }[]): void
		{
			state.view.v1Vault.erc721s = erc721s;
		},

		setYieldSyncGovernance(state, contract: Contract): void
		{
			state.contract.yieldSyncGovernance = contract;
		},

		setYieldSyncV1VaultFactory(state, contract: Contract): void
		{
			state.contract.yieldSyncV1VaultFactory = contract;
		},

		setYieldSyncV1VaultRegistry(state, contract: Contract): void
		{
			state.contract.yieldSyncV1VaultRegistry = contract;
		},
	},

	actions: {
		trpType: ({ state }, trpAddress: string): "a" | "b" | "?" =>
		{
			switch (trpAddress)
			{
			case state.config.networkChain[state.currentChain.name].yieldSyncV1ATransferRequestProtocol:
				return "a";

			case state.config.networkChain[state.currentChain.name].yieldSyncV1BTransferRequestProtocol:
				return "b";

			default:
				return "?";
			}
		},

		generateVaultAdminships: async ({ dispatch, state }): Promise<void> =>
		{
			state.adminshipYieldSyncV1VaultVaults = [
			];

			const transferRequestProtocol: Contract = new state.web3.eth.Contract(
				YieldSyncV1ATransferRequestProtocol as AbiItem[],
				state.config.networkChain[state.currentChain.name].yieldSyncV1ATransferRequestProtocol
			);

			if (!state.contract.yieldSyncV1VaultRegistry)
			{
				return;
			}

			const v1Vaults: string[] = await state.contract.yieldSyncV1VaultRegistry.methods.admin_yieldSyncV1Vaults(
				state.wallet.accounts[0]
			).call();

			for (let i = 0; i < v1Vaults.length; i++)
			{
				const vault: Contract = new state.web3.eth.Contract(YieldSyncV1Vault as AbiItem[], v1Vaults[i]);

				const vaultProperties = await transferRequestProtocol.methods.yieldSyncV1Vault_yieldSyncV1VaultProperty(
					state.wallet.accounts[0]
				).call();

				state.adminshipYieldSyncV1VaultVaults.push({
					address: v1Vaults[i],
					voteAgainstRequired: vaultProperties.voteAgainstRequired,
					voteForRequired: vaultProperties.voteForRequired,
					trpType: await dispatch("trpType", await vault.methods.transferRequestProtocol().call()),
				});
			}
		},

		generateVaultMemberships: async ({ dispatch, state }): Promise<void> =>
		{
			state.membershipYieldSyncV1VaultVaults = [
			];

			const transferRequestProtocol: Contract = new state.web3.eth.Contract(
				YieldSyncV1ATransferRequestProtocol as AbiItem[],
				state.config.networkChain[state.currentChain.name].yieldSyncV1ATransferRequestProtocol
			);

			if (!state.contract.yieldSyncV1VaultRegistry)
			{
				return;
			}

			const v1Vaults: string[] = await state.contract.yieldSyncV1VaultRegistry.methods.member_yieldSyncV1Vaults(
				state.wallet.accounts[0]
			).call();

			for (let i = 0; i < v1Vaults.length; i++)
			{
				const vault: Contract = new state.web3.eth.Contract(YieldSyncV1Vault as AbiItem[], v1Vaults[i]);

				const vaultProperties = await transferRequestProtocol.methods.yieldSyncV1Vault_yieldSyncV1VaultProperty(
					state.wallet.accounts[0]
				).call();

				state.membershipYieldSyncV1VaultVaults.push({
					address: v1Vaults[i],
					voteAgainstRequired: vaultProperties.voteAgainstRequired,
					voteForRequired: vaultProperties.voteForRequired,
					trpType: await dispatch("trpType", await vault.methods.transferRequestProtocol().call()),
				});
			}
		},

		generateChainRelatedData: async ({ commit, state }): Promise<void> =>
		{
			commit("setCurrentChainId", await state.web3.eth.net.getId());
			commit("setCurrentChainName", await state.web3.eth.net.getId());
			commit(
				"setEtherscanDomainStart",
				state.currentChain.name !== "mainnet" ? state.currentChain.name : "www"
			);
		},

		generateYieldSyncContracts: async ({ commit, state }): Promise<void> =>
		{
			if (state.config.networkChain[state.currentChain.name].yieldSyncGovernance == state.ZERO_ADDRESS)
			{
				commit("setError", "Network not currently supported");

				return;
			}

			state.error = "";

			// Governance
			commit(
				"setYieldSyncGovernance",
				new state.web3.eth.Contract(
					YieldSyncGovernance as AbiItem[],
					state.config.networkChain[state.currentChain.name].yieldSyncGovernance
				)
			);
			// Factory
			commit(
				"setYieldSyncV1VaultFactory",
				new state.web3.eth.Contract(
					YieldSyncV1VaultFactory as AbiItem[],
					state.config.networkChain[state.currentChain.name].yieldSyncV1VaultFactory
				)
			);
			// Registry
			commit(
				"setYieldSyncV1VaultRegistry",
				new state.web3.eth.Contract(
					YieldSyncV1VaultRegistry as AbiItem[],
					state.config.networkChain[state.currentChain.name].yieldSyncV1VaultRegistry
				)
			);
		},

		getTokens: async ({ commit, state }): Promise<void> =>
		{
			const vaultAddress: string = String(state.view.v1Vault.vaultAddress);

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

		getERC721Tokens: async ({ commit, state }): Promise<void> =>
		{
			const vaultAddress: string = String(state.view.v1Vault.vaultAddress);

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
		},

		connectWallet: async ({ commit, dispatch, state }): Promise<void> =>
		{
			if (typeof window.ethereum == "undefined")
			{
				commit("setError", "No wallet found, please install one.");

				commit("setLoading", false);

				return;
			}

			console.log("Connecting wallet..");

			// Governance
			await dispatch("generateChainRelatedData");

			// Yield Sync Contracts
			await dispatch("generateYieldSyncContracts");

			console.log("window.ethereum", window.ethereum);

			// Connected account
			window.ethereum.request({
				method: "eth_requestAccounts"
			}).then(
				(accounts: string[]) =>
				{
					if (accounts.length == 0)
					{
						commit("setError", "Accounts.length = 0");

						return;
					}

					console.log("Wallet connected with account:", accounts[0]);

					state.wallet.connected = true;
					state.wallet.accounts = accounts;

					console.log("Connected!");
				}
			).catch(
				(e: string) =>
				{
					state.error = e;
				}
			);

			commit("setLoading", false);

			// Handle network
			window.ethereum.on("chainChanged", async (chainId: number) =>
			{
				commit("setLoading", true);

				// Governance
				await dispatch("generateChainRelatedData");

				// Yield Sync Contracts
				await dispatch("generateYieldSyncContracts");

				commit("setLoading", false);
			});
		},

		disconnectWallet: async ({ commit, dispatch, state }): Promise<void> =>
		{
			state.wallet.connected = false;

			state.wallet.accounts = [
			];
		}
	},

	getters: {
	},

	modules: {
	},
});
