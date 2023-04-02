<template>
	<div class="bg-primary">
		<CNav/>

		<RouterView v-if="!loading" />

		<CFooter />
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { AbiItem } from "web3-utils";

	import YieldSyncV1VaultFactory from "./abi/YieldSyncV1VaultFactory";
	import CFooter from "./components/CFooter.vue";
	import CNav from "./components/CNav.vue";


	export default defineComponent({
		name: "App",

		components: {
			CNav,
			CFooter
		},

		data()
		{
			return {
				loading: true
			};
		},

		async created()
		{
			this.$store.state.network = await this.$store.state.web3.eth.net.getId();

			// Connected account
			window.ethereum.request({
				method: "eth_accounts"
			})
				.then(
					(accounts: Array<string>) =>
					{
						if (accounts.length > 0)
						{
							console.log(`MetaMask is connected with account: ${accounts[0]}`);

							this.$store.state.connected = true;
							this.$store.state.accounts = accounts;
						}
						else
						{
							console.log("MetaMask is not connected");
						}
					}
				)
				.catch(
					(error: string) =>
					{
						console.log(`MetaMask connection error: ${error}`);
					}
				)
			;

			const network = () =>
			{
				switch (this.$store.state.network) 
				{
					case 1:
						return "mainnet";

					case 5:
						return "goerli";

					default:
						return 0;
				}
			};

			const yieldSyncV1VaultFactoryContract = new this.$store.state.web3.eth.Contract(
				YieldSyncV1VaultFactory as AbiItem[],
				this.$store.state.variables.address[network()].yieldSyncV1VaultFactory
			);

			this.$store.state.contract.yieldSyncGovernance = await yieldSyncV1VaultFactoryContract
				.methods.YieldSyncGovernance().call()
			;
			this.$store.state.contract.yieldSyncV1VaultRecord = await yieldSyncV1VaultFactoryContract
				.methods.YieldSyncV1VaultRecord().call()
			;


			if (localStorage.alchemyApiKey)
			{
				this.$store.state.alchemyApiKey = localStorage.alchemyApiKey;
			}
		},

		mounted()
		{
			this.loading = false;
		},
	});
</script>
