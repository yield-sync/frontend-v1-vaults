<template>
	<VSheet color="primary">
		<VContainer>
			<VRow>
				<VCol
					cols="4"
					class="text-left"
				>
					<RouterLink to="/" class="mr-2 text-decoration-none text-white">
						<VBtn variant="primary">
							Dashboard
						</VBtn>
					</RouterLink>

					<RouterLink to="/sign-message" class="mr-2 text-decoration-none text-white">
						<VBtn variant="primary">
							Sign Message
						</VBtn>
					</RouterLink>
				</VCol>

				<VCol cols="4">
					<h1 class="text-center text-white">Yield Sync</h1>
				</VCol>

				<VCol cols="4" class="text-right">
					<VBtn
						v-if="!$store.state.connected"
						@click="this.connectWallet()"
						variant="outlined"
						color="white"
						class="rounded-pill"
					>
						Connected {{ this.$store.state.accounts[0] }}
					</VBtn>
					<VBtn
						v-if="$store.state.connected"
						@click="this.disconnectWallet()"
						variant="outlined"
						color="white"
						class="rounded-pill"
					>
						Disconnect
					</VBtn>
				</VCol>
			</VRow>
		</VContainer>
	</VSheet>
</template>

<script>
	export default {
		name: "CNav",

		methods: {
			async connectWallet()
			{
				console.log("Connecting wallet..");

				if (typeof window.ethereum !== "undefined")
				{
					window.ethereum.request({
						method: "eth_requestAccounts"
					})
						.then(
							(accounts) =>
							{
								this.$store.state.connected = true;
								this.$store.state.accounts = accounts;

								console.log("Connected!");
							}
						)
						.catch(
							(e) =>
							{
								this.$store.error = e;
							}
						)
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
	};
</script>
