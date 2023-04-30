<template>
	<VSheet color="primary">
		<VContainer>
			<VRow>
				<VCol cols="12" md="8">
					<h1
						class="text-light text-uppercase"
						style="letter-spacing: 4px;"
					>
						Yield Sync
					</h1>
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

				<VCol cols="12" md="8" class="text-left">
					<RouterLink to="/" class="mr-2 text-decoration-none text-dark">
						<VBtn variant="tonal" color="light">
							Dashboard
						</VBtn>
					</RouterLink>

					<RouterLink to="/governance" class="mr-2 text-decoration-none text-dark">
						<VBtn variant="tonal" color="light">
							Governance
						</VBtn>
					</RouterLink>

					<RouterLink to="/v1-vaults" class="mr-2 text-decoration-none text-dark">
						<VBtn variant="tonal" color="light">
							V1 Vaults
						</VBtn>
					</RouterLink>
				</VCol>

				<VCol cols="12" md="4" class="text-right">
					<VBtn
						v-if="!$store.state.connected"
						@click="connectWallet()"
						color="light"
						variant="tonal"
						class="rounded-pill"
					>
						Connect
					</VBtn>
					<VBtn
						v-if="$store.state.connected"
						@click="disconnectWallet()"
						color="light"
						variant="tonal"
						class="rounded-pill"
					>
						Disconnect
					</VBtn>

					<h5 class="my-3">
						<span class="text-primary">.</span>
						{{
							$store.state.accounts[0] ?
								$store.state.accounts[0].substring(0, 4) +
								"..." +
								$store.state.accounts[0].substring($store.state.accounts[0].length - 4)
								:
								""
						}} : {{ network() }}
					</h5>
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
				network: () =>
				{
					switch (this.$store.state.network)
					{
						case 1:
							return "mainnet";

						case 5:
							return "goerli";

						default:
							return 0;
					}
				}
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
