<template>
	<div class="bg-primary">
		<CNav/>

		<div>
			<RouterView />
		</div>

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

		created()
		{
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
						console.log(`Error checking MetaMask connection: ${error}`);
					}
				)
			;
		},
	});
</script>
