<template>
	<VSheet color="transparent">
		<VContainer>
			<VRow>
				<VCol
					cols="12"
					lg="4"
				>
					<RouterLink to="/" style="letter-spacing: 4px; text-decoration: none !important">
						<h1
							class="text-primary text-uppercase"
							style="letter-spacing: 4px;"
						>
							Yield Sync
						</h1>
					</RouterLink>
				</VCol>

				<VCol
					cols="12"
					lg="4"
				>
					<VBtn
						variant="tonal"
						color="white"
						class="w-100 rounded-xl container1 elevation-0"
					>
						<img
							:src="$store.state.config.chains[$store.state.currentChain.name].icon"
							alt="Description of Image"
							class="mr-2"
							style="max-width: 20px;"
						/>
						<h5 class="mx-auto text-center text-light">
							{{ $store.state.config.chains[$store.state.currentChain.name].chainName }}
						</h5>

						<VMenu activator="parent">
							<VList class="mt-3 px-0 py-0 rounded-xl bg-light-frost elevation-0">
								<VListItem v-for="(n, i) in $store.state.config.chains" :key="i">
									<VListItemTitle
										@click="switchNetwork(i)"
									>
										{{ n.chainName }}
									</VListItemTitle>
								</VListItem>
							</VList>
						</VMenu>
					</VBtn>
				</VCol>

				<VCol
					cols="12"
					lg="4"
				>
					<VBtn
						v-if="!$store.state.wallet.connected"
						@click="connectWallet()"
						color="dark"
						variant="tonal"
						class="w-100 rounded-pill"
					>
						Connect Wallet
					</VBtn>
					<VBtn
						v-if="$store.state.wallet.connected"
						@click="disconnectWallet()"
						color="white"
						variant="tonal"
						class="w-100 rounded-pill"
					>
						Disconnect ⦁ {{
							$store.state.wallet.accounts[0] ?
								$store.state.wallet.accounts[0].substring(0, 4) +
								"..." +
								$store.state.wallet.accounts[0].substring($store.state.wallet.accounts[0].length - 4)
								:
								""
						}}
					</VBtn>
				</VCol>

				<VCol
					cols="12"
					md="7"
					lg="8"
					xl="9"
					class="text-left"
				>
					<RouterLink to="/" class="mr-2 text-decoration-none text-dark">
						<VBtn
							variant="plain"
							color="primary"
							class="rounded-xl"
							@click="$store.state.pages.RVDashboard.tab = 'm'"
						>
							<h3>Dashboard</h3>
						</VBtn>
					</RouterLink>


					<RouterLink to="/" class="mr-2 text-decoration-none text-dark">
						<VBtn
							variant="plain"
							color="primary"
							class="rounded-xl"
							@click="$store.state.pages.RVDashboard.tab = 'd'"
						>
							<h3>Deploy V1-Vault</h3>
						</VBtn>
					</RouterLink>
				</VCol>

				<VCol
					cols="12"
					md="5"
					lg="4"
					xl="3"
					class="text-right"
				>
					<VTextField
						v-if="
							$store.state.currentChain.id == 1 ||
							$store.state.currentChain.id == 5 ||
							$store.state.currentChain.id == 11155111
						"
						v-model="$store.state.alchemyApiKey"
						label="Insert Alchemy API Key Here"
						variant="outlined"
						hide-details
						@change="updateLocalStorage()"
					/>

					<VTextField
						v-if="$store.state.currentChain.id == 420"
						v-model="$store.state.alchemyOpApiKey"
						label="Insert Alchemy Op API Key Here"
						variant="outlined"
						hide-details
						@change="updateLocalStorage()"
					/>
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
				opSVG: require("../assets/eth.svg")
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
					this.$store.state.error = "No window.ethereum detected!";
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
				localStorage.alchemyOpApiKey = this.$store.state.alchemyOpApiKey;
			},

			async switchNetwork(i: number)
			{
				try
				{
					await window.ethereum.request({
						method: "wallet_switchEthereumChain",
						params: [
							{
								chainId: this.$store.state.config.chains[i].chainId
							},
						],
					});
				}
				catch (switchError: any)
				{
					if (switchError.code === 4902)
					{
						console.error("4902 Error:", String(switchError));
					}
					else
					{
						console.error(String(switchError));
					}
				}
			}
		},

		created()
		{
			console.log("nav loaded");

		},
	});
</script>

<style lang="scss" scoped>
.container1 {
	display: flex;
}
</style>
