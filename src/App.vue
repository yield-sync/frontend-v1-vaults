<template>
	<VSheet>
		<VApp class="container" style="margin-bottom: 36px;">
			<VSheet color="primary">
				<VContainer>
					<VRow>
						<VCol
							cols="6"
							class="text-left"
						>
							<RouterLink to="/" class="mr-2 text-decoration-none text-white">
								<VBtn variant="primary">
									Home
								</VBtn>
							</RouterLink>
							<RouterLink to="/about" class="mr-2 text-decoration-none text-white">
								<VBtn variant="primary">
									About
								</VBtn>
							</RouterLink>
							<RouterLink to="/sign-message" class="mr-2 text-decoration-none text-white">
								<VBtn variant="primary">
									Sign Message
								</VBtn>
							</RouterLink>
						</VCol>

						<VCol cols="6" class="text-right">
							<VBtn
								v-if="!$store.state.connected"
								@click="this.connectWallet()"
								variant="outlined"
								color="flat"
								class="rounded-pill"
							>
								Connected {{ this.$store.state.address }}
							</VBtn>
							<VBtn
								v-if="$store.state.connected"
								@click="this.disconnectWallet()"
								variant="outlined"
								color="flat"
								class="rounded-pill"
							>
								Disconnect Wallet
							</VBtn>
						</VCol>
					</VRow>
				</VContainer>
			</VSheet>

			<VContent>
				<RouterView />
			</VContent>
		</VApp>
	</VSheet>
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
