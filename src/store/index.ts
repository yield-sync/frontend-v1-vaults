import {createStore} from "vuex";
import Web3 from "web3";

import config from "../config";


const web3 = window.ethereum ? new Web3(window.ethereum) : undefined;


export default createStore({
	state: {
		config,

		web3: web3,

		chainName: "",
		chainid: 0,
		etherscanDomainStart: "www",

		accounts: [
		],

		connected: false,
		loading: true,
		error: "",

		vaults: [
		],

		alchemyApiKey: "",

		isAdmin: false,

		contract: {
			yieldSyncGovernance: undefined,
			yieldSyncV1VaultFactory: undefined,
			yieldSyncV1VaultAccessControl: undefined,
		}
	},
	getters: {
	},
	mutations: {
	},
	actions: {
	},
	modules: {
	}
});
