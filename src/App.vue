<template>
	<nav>
		<div class="container" style="margin-bottom: 36px;">
			<div class="row">
				<div class="col-6">
					<h6 v-if="$store.state.connected">{{ this.$store.state.address }}</h6>
				</div>
				<div class="">
					<div class="w-100 text-right">
						<button v-if="!$store.state.connected" @click="this.connectWallet()" class="ml-auto">
							Connect Wallet
						</button>
						<button v-if="$store.state.connected" @click="this.disconnectWallet()" class="ml-auto">
							Disconnect Wallet
						</button>
					</div>
				</div>

				<div class="col-12 text-center">
					<router-link to="/">Home</router-link> |
					<router-link to="/about">About</router-link> |
					<router-link to="/sign-message">Sign Message</router-link>
				</div>
			</div>
		</div>
	</nav>

	<router-view />
</template>

<script>

	export default {
		name: "App",

		methods: {
			async connectWallet()
			{
				console.log("Connecting wallet..");

				if (typeof window.ethereum !== "undefined")
				{
					window.ethereum.request({
						method: "eth_requestAccounts"
					})
						.then((accounts) =>
						{
							this.$store.state.connected = true;
							this.$store.state.address = accounts[0];

							console.log("Connected!");
						})
					;
				}
				else
				{
					this.$store.state.error = "No ethereum deteceted";
				}
			},

			async disconnectWallet()
			{
				this.$store.state.connected = false;
				this.$store.state.address = "";
			}
		},

		async created()
		{
			const accounts = await window.ethereum.request({
				method: "eth_accounts"
			});

			if (accounts && accounts.length > 0)
			{
				this.$store.state.connected = true;
				this.$store.state.address = accounts[0];
			}
		},
	};
</script>

<style lang="scss">

</style>
