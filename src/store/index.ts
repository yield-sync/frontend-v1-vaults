import {createStore} from "vuex";
import Web3 from "web3";

import variables from "../variables";


const web3 = window.ethereum ? new Web3(window.ethereum) : undefined;


export default createStore({
	state: {
		variables,

		web3: web3,

		chainName: "",
		chainid: 0,

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
			yieldSyncV1VaultRecord: undefined,
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
