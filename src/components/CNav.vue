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
						{{
							$store.state.accounts[0] ?
								$store.state.accounts[0].substring(0, 4) +
								"..." +
								$store.state.accounts[0].substring($store.state.accounts[0].length - 4)
								:
								""
						}}
					</h6>
					<VBtn
						v-if="!$store.state.connected"
						@click="connectWallet()"
						color="success"
						class="rounded-pill"
					>
						Connect
					</VBtn>
					<VBtn
						v-if="$store.state.connected"
						@click="disconnectWallet()"
						color="warning"
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
	import { defineComponent } from "vue";

	export default defineComponent({
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
							(accounts: Array<string>) =>
							{
								this.$store.state.connected = true;
								this.$store.state.accounts = accounts;

								console.log("Connected!");
							}
						)
						.catch(
							(e: string) =>
							{
								this.$store.state.error = e;
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

		created() {
			console.log("nav loaded");

		},
	});
</script>
