<template>
	<div class="bg-primary">
		<CNav/>

		<RouterView v-if="!$store.state.loading && $store.state.connected && !$store.state.error" />

		<VContainer v-else class="py-12">
			<!-- Loading -->
			<h2 v-if="$store.state.loading" class="text-center">Loading..</h2>
			<!-- !Connected -->
			<h2  v-if="!$store.state.connected" class="text-center">Wallet not connected</h2>
			<!-- Error -->
			<h2  v-if="$store.state.error" class="text-center">{{ $store.state.error }}</h2>
		</VContainer>

		<CFooter />
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { AbiItem } from "web3-utils";

	import YieldSyncGovernance from "./abi/YieldSyncGovernance";
	import YieldSyncV1VaultFactory from "./abi/YieldSyncV1VaultFactory";
	import CFooter from "./components/CFooter.vue";
	import CNav from "./components/CNav.vue";


	export default defineComponent({
		name: "App",

		components: {
			CNav,
			CFooter
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
						this.$store.state.error = error;
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

			// Governance
			this.$store.state.contract.yieldSyncGovernance = new this.$store.state.web3.eth.Contract(
				YieldSyncGovernance as AbiItem[],
				this.$store.state.variables.address[network()].yieldSyncGovernance
			);

			// Factory
			this.$store.state.contract.yieldSyncV1VaultFactory = new this.$store.state.web3.eth.Contract(
				YieldSyncV1VaultFactory as AbiItem[],
				this.$store.state.variables.address[network()].yieldSyncV1VaultFactory
			);

			this.$store.state.contract.yieldSyncV1VaultRecord = await this.$store.state.contract.yieldSyncV1VaultFactory
				.methods.YieldSyncV1VaultRecord().call();

			if (localStorage.alchemyApiKey)
			{
				this.$store.state.alchemyApiKey = localStorage.alchemyApiKey;
			}

			this.$store.state.loading = false;
		},
	});
</script>
