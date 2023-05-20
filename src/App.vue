<template>
	<div class="bg-white">
		<!-- Top Navigation -->
		<CNav />

		<!-- Loading -->
		<VContainer v-if="$store.state.loading" class="py-12">
			<h2  class="text-center">Loading..</h2>
		</VContainer>

		<!-- !Connected -->
		<VContainer v-if="!$store.state.connected && $store.state.error === ''" class="py-12">
			<h2 class="text-center">Wallet not connected</h2>
		</VContainer>

		<!-- Error -->
		<VContainer v-if="$store.state.error" class="py-12">
			<h2 class="text-center">{{ $store.state.error }}</h2>
		</VContainer>

		<!-- Router -->
		<RouterView v-if="!$store.state.loading && $store.state.connected && $store.state.error === ''" />

		<!-- Bottom Navigation -->
		<CFooter />
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
			getChainName: (chainId: number) =>
			{
				switch (chainId)
				{
					case 1:
						return "mainnet";

					case 5:
						return "goerli";

					case 11155111:
						return "sepolia";

					default:
						return "?";
				}
			}
		},

		async created()
		{
			try
			{
				if (!window.ethereum)
				{
					this.$store.state.error = "No wallet found, please install one.";
					this.$store.state.loading = false;
				}

				this.$store.state.chainId = await this.$store.state.web3.eth.net.getId();
				this.$store.state.chainName = this.getChainName(this.$store.state.chainId);
				this.$store.state.etherscanDomainStart = this.$store.state.chainName !== "mainnet" ?
					this.$store.state.chainName : "www"
				;

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
						}
					)
					.catch(
						(error: string) =>
						{
							this.$store.state.error = error;
						}
					)
				;

				// Governance
				this.$store.dispatch("generateYieldSyncGovernance");

				// Factory
				this.$store.dispatch("generateYieldSyncV1VaultFactory");

				// Access Control
				this.$store.dispatch("generateYieldSyncV1AccessControl");

				if (localStorage.alchemyApiKey)
				{
					this.$store.state.alchemyApiKey = localStorage.alchemyApiKey;
				}

				this.$store.state.loading = false;
			}
			catch (e)
			{
				this.$store.state.error = e;
			}
		},
	});
</script>
