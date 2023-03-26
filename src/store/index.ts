import {createStore} from "vuex";
import Web3 from "web3";

export default createStore({
	state: {
		web3: window.ethereum ? new Web3(window.ethereum) : undefined,
		accounts: [
		],

		connected: false,
		error: "",

		vaults: [
		],

		alchemyApiKey: "",
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
