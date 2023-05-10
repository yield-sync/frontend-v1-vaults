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
	import { AbiItem } from "web3-utils";

	import YieldSyncGovernance from "./abi/YieldSyncGovernance";
	import YieldSyncV1VaultFactory from "./abi/YieldSyncV1VaultFactory";
	import YieldSyncV1VaultAccessControl from "./abi/YieldSyncV1VaultAccessControl";
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
				this.$store.state.contract.yieldSyncGovernance = new this.$store.state.web3.eth.Contract(
					YieldSyncGovernance as AbiItem[],
					this.$store.state.config.address[this.$store.state.chainName].yieldSyncGovernance
				);

				// Factory
				this.$store.state.contract.yieldSyncV1VaultFactory = new this.$store.state.web3.eth.Contract(
					YieldSyncV1VaultFactory as AbiItem[],
					this.$store.state.config.address[this.$store.state.chainName].yieldSyncV1VaultFactory
				);

				// Record
				this.$store.state.contract.yieldSyncV1VaultAccessControl = new this.$store.state.web3.eth.Contract(
					YieldSyncV1VaultAccessControl as AbiItem[],
					this.$store.state.config.address[this.$store.state.chainName].yieldSyncV1VaultAccessControl
				);

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
