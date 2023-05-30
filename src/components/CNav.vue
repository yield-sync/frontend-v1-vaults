<template>
	<VSheet color="primary">
		<VContainer>
			<VRow>
				<VCol cols="12" md="8">
					<RouterLink to="/" style="letter-spacing: 4px; text-decoration: none !important">
						<h1
							class="text-light text-uppercase"
							style="letter-spacing: 4px;"
						>
							Yield Sync
						</h1>
					</RouterLink>
				</VCol>

				<VCol cols="12" md="4">
					<VTextField
						v-model="$store.state.alchemyApiKey"
						label="Insert Alchemy API Key Here"
						variant="outlined"
						hide-details
						@change="updateLocalStorage()"
					/>
				</VCol>

				<VCol cols="12" md="9" class="text-left">
					<RouterLink to="/" class="mr-2 text-decoration-none text-dark">
						<VBtn variant="plain" color="light">
							Dashboard
						</VBtn>
					</RouterLink>
				</VCol>

				<VCol cols="12" md="3" class="text-right">
					<VBtn
						v-if="!$store.state.wallet.connected"
						@click="connectWallet()"
						color="light"
						variant="tonal"
						class="w-100 rounded-pill"
					>
						Connect Wallet
					</VBtn>
					<VBtn
						v-if="$store.state.wallet.connected"
						@click="disconnectWallet()"
						color="light"
						variant="tonal"
						class="w-100 rounded-pill"
					>
					Disconnect | {{
						$store.state.wallet.accounts[0] ?
							$store.state.wallet.accounts[0].substring(0, 4) +
							"..." +
							$store.state.wallet.accounts[0].substring($store.state.wallet.accounts[0].length - 4)
							:
							""
					}} @ {{ $store.state.chainName }}
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
								this.$store.state.wallet.connected = true;
								this.$store.state.wallet.accounts = accounts;

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
				this.$store.state.wallet.connected = false;
				this.$store.state.wallet.accounts = [
				];
			},

			updateLocalStorage()
			{
				localStorage.alchemyApiKey = this.$store.state.alchemyApiKey;
			}
		},

		created()
		{
			console.log("nav loaded");

		},
	});
</script>
