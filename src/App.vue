<template>
	<div class="bg-gradient" style="background-attachment: fixed; background-size: cover;">
		<!-- Top Navigation -->
		<CNav/>

		<!-- Loading -->
		<VContainer v-if="$store.state.loading" class="py-12">
			<h2  class="text-center">Loading..</h2>
		</VContainer>

		<!-- !Connected -->
		<VContainer v-if="!$store.state.wallet.connected && $store.state.error === ''" class="py-12">
			<h2 class="text-center">Wallet not connected</h2>
		</VContainer>

		<!-- Error -->
		<VContainer v-if="$store.state.error" class="py-12">
			<h2 class="text-center">{{ $store.state.error }}</h2>
		</VContainer>

		<!-- Router -->
		<RouterView v-if="!$store.state.loading && $store.state.wallet.connected && $store.state.error === ''"/>

		<!-- Bottom Navigation -->
		<CFooter v-if="!$store.state.loading"/>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	import CFooter from "./components/CFooter.vue";
	import CNav from "./components/CNav.vue";

	export default defineComponent({
		name: "App",

		components: {
			CNav,
			CFooter
		},

		methods: {
			async handleNetworkChange()
			{
				this.$store.state.loading = true;

				// Governance
				await this.$store.dispatch("generateChainRelatedData");

				// Yield Sync Contracts
				await this.$store.dispatch("generateYieldSyncContracts");

				this.$store.state.loading = false;
			},
		},

		async created(): Promise<void>
		{
			try
			{
				if (!window.ethereum)
				{
					await this.$store.commit("setError", "No wallet found, please install one.");
					await this.$store.commit("setLoading", false);
					return;
				}

				// Governance
				await this.$store.dispatch("generateChainRelatedData");

				// Yield Sync Contracts
				await this.$store.dispatch("generateYieldSyncContracts");

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

								this.$store.state.wallet.connected = true;
								this.$store.state.wallet.accounts = accounts;
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

				if (localStorage.alchemyApiKey)
				{
					this.$store.state.alchemyApiKey = localStorage.alchemyApiKey;
				}

				if (localStorage.alchemyOpApiKey)
				{
					this.$store.state.alchemyOpApiKey = localStorage.alchemyOpApiKey;
				}

				this.$store.state.loading = false;
			}
			catch (e)
			{
				this.$store.state.error = e;
			}

			// Handle network
			window.ethereum.on("chainChanged", (chainId: number) =>
			{
				console.log(chainId);

				return this.handleNetworkChange();
			});
		},
	});
</script>
