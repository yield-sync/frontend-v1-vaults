<template>
	<VSheet color="primary">
		<VContainer>
			<VRow>
				<VCol
					cols="4"
					class="text-left"
				>
					<RouterLink to="/" class="mr-2 text-decoration-none text-dark">
						<VBtn >
							Dashboard
						</VBtn>
					</RouterLink>

					<RouterLink to="/sign-message" class="mr-2 text-decoration-none text-dark">
						<VBtn>
							Sign Message
						</VBtn>
					</RouterLink>
				</VCol>

				<VCol cols="4">
					<h1
						class="text-center text-dark text-uppercase"
						style="letter-spacing: 4px;"
					>
						Yield Sync
					</h1>
				</VCol>

				<VCol cols="4" class="text-right">
					<h6 class="my-3">
						<span class="text-primary">.</span>
						{{ this.$store.state.accounts[0] }}
					</h6>
					<VBtn
						v-if="!$store.state.connected"
						@click="this.connectWallet()"
						variant="outlined"
						color="dark"
						class="rounded-pill"
					>
						Connect
					</VBtn>
					<VBtn
						v-if="$store.state.connected"
						@click="this.disconnectWallet()"
						variant="outlined"
						color="dark"
						class="rounded-pill"
					>
						Disconnect
					</VBtn>
				</VCol>
			</VRow>
		</VContainer>
	</VSheet>
</template>

<script lang="ts">
	export default {
		name: "CNav",

		data() 
		{
			return {
			};
		},

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
							(accounts: any) =>
							{
								this.$store.state.connected = true;
								this.$store.state.accounts = accounts;

								console.log("Connected!");
							}
						)
						.catch(
							(e: any) =>
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
				this.$store.state.accounts = [
				];
			}
		},
	};
</script>
