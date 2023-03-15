<template>
	<div>
		<VApp class="container" style="margin-bottom: 36px;">
			<VToolbar app >
				<div>
					<h6 v-if="$store.state.connected">{{ this.$store.state.address }}</h6>
				</div>
				<div>
					<div>
						<VBtn v-if="!$store.state.connected" @click="this.connectWallet()" class="ml-auto">
							Connect Wallet
						</VBtn>
						<VBtn v-if="$store.state.connected" @click="this.disconnectWallet()" class="ml-auto">
							Disconnect Wallet
						</VBtn>
					</div>
				</div>

				<div class="col-12 text-center">
					<RouterLink to="/">
						<VBtn>Home</VBtn>
					</RouterLink>
					<RounterLink to="/about">
						<VBtn>About</VBtn>
					</RounterLink>
					<RounterLink to="/sign-message">
						<VBtn>Sign Message</VBtn>
					</RounterLink>
				</div>
			</VToolbar>

			<VContent>
				<RouterView />
			</VContent>
		</VApp>
	</div>
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
