<template>
	<div class="bg-gradient" style="background-attachment: fixed; background-size: cover;">
		<!-- Top Navigation -->
		<CNav/>

		<!-- Loading -->
		<VContainer v-if="this.$store.state.loading" class="py-12">
			<h2  class="text-center">Loading..</h2>
		</VContainer>

		<!-- !Connected -->
		<VContainer v-if="!this.$store.state.wallet.connected && this.$store.state.error === ''" class="py-12">
			<h2 class="text-center">Wallet not connected</h2>
		</VContainer>

		<!-- Error -->
		<VContainer v-if="this.$store.state.error" class="py-12">
			<h2 class="text-center">{{ this.$store.state.error }}</h2>
		</VContainer>

		<!-- Router -->
		<RouterView
			v-if="!this.$store.state.loading && this.$store.state.wallet.connected && this.$store.state.error === ''"
		/>

		<!-- Bottom Navigation -->
		<CFooter v-if="!this.$store.state.loading"/>

		<div
			v-if="this.$store.state.message"
			class="popup-box px-3 py-5 text-center text-primary rounded-xl bg-light-frost"
		>
			{{ this.$store.state.message }}
		</div>
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

		async created(): Promise<void>
		{
			try
			{
				await this.$store.dispatch("connectWallet");

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
		},
	});
</script>

<style lang="scss" scoped>
	.popup-box {
		position: fixed;
		z-index: 1000;
		top: 90%;
		left: 50%;
		transform: translate(-50%, -50%);

		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
	}
</style>
