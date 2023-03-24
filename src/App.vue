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
	import CFooter from "./components/CFooter.vue";
	import CNav from "./components/CNav.vue";

	export default {
		name: "App",

		components: {
			CNav,
			CFooter
		},

		async created()
		{
			const accounts = await window.ethereum.request({
				method: "eth_accounts"
			});

			if (accounts && accounts.length > 0)
			{
				this.$store.state.connected = true;
				this.$store.state.accounts = accounts;
			}
		},
	};
</script>
