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
							:src="this.$store.state.config.networkChain[this.$store.state.currentChain.name].icon"
							alt="Description of Image"
							class="mr-2"
							style="max-width: 20px;"
						/>

						<h5 class="mx-auto text-center text-light">
							{{ this.$store.state.config.networkChain[this.$store.state.currentChain.name].chainName }}
						</h5>

						<VMenu activator="parent">
							<VList class="mt-3 px-0 py-0 rounded-xl bg-light-frost elevation-0">
								<VListItem v-for="(n, i) in this.$store.state.config.networkChain" :key="i">
									<VListItemTitle
										@click="this.switchNetwork(i)"
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
						v-if="!this.$store.state.wallet.connected"
						@click="this.connectWallet()"
						color="dark"
						variant="tonal"
						class="w-100 rounded-pill"
					>
						Connect Wallet
					</VBtn>

					<VBtn
						v-if="this.$store.state.wallet.connected"
						@click="this.disconnectWallet()"
						color="white"
						variant="tonal"
						class="w-100 rounded-pill"
					>
						Disconnect ⦁ {{
							this.$store.state.wallet.accounts[0] ?
								this.$store.state.wallet.accounts[0].substring(0, 4) +
								"..." +
								this.$store.state.wallet.accounts[0].substring(
									this.$store.state.wallet.accounts[0].length - 4
								)
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
							@click="this.$store.state.pages.RVDashboard.tab = 'm'"
						>
							<h3>Dashboard</h3>
						</VBtn>
					</RouterLink>


					<RouterLink to="/" class="mr-2 text-decoration-none text-dark">
						<VBtn
							variant="plain"
							color="primary"
							class="rounded-xl"
							@click="this.$store.state.pages.RVDashboard.tab = 'd'"
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
							this.$store.state.currentChain.id == 1 ||
								this.$store.state.currentChain.id == 5 ||
								this.$store.state.currentChain.id == 11155111
						"
						v-model="this.$store.state.alchemyApiKey"
						label="Insert Alchemy API Key Here"
						variant="outlined"
						hide-details
						@change="this.updateLocalStorage()"
					/>

					<VTextField
						v-if="this.$store.state.currentChain.id == 420"
						v-model="this.$store.state.alchemyOpApiKey"
						label="Insert Alchemy Op API Key Here"
						variant="outlined"
						hide-details
						@change="this.updateLocalStorage()"
					/>
				</VCol>
			</VRow>
		</VContainer>
	</VSheet>
</template>

<script lang="ts">
	import router from "@/router";

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
			async connectWallet(): Promise<void>
			{
				console.log("Connecting wallet..");

				if (typeof window.ethereum !== "undefined")
				{
					window.ethereum.request({
						method: "eth_requestAccounts"
					}).then(
						(accounts: Array<string>) =>
						{
							this.$store.state.wallet.connected = true;
							this.$store.state.wallet.accounts = accounts;

							console.log("Connected!");
						}
					).catch(
						(e: string) =>
						{
							this.$store.state.error = e;
						}
					);
				}
				else
				{
					this.$store.state.error = "No window.ethereum detected!";
				}
			},

			disconnectWallet(): void
			{
				this.$store.state.wallet.connected = false;
				this.$store.state.wallet.accounts = [
				];
			},

			updateLocalStorage(): void
			{
				localStorage.alchemyApiKey = this.$store.state.alchemyApiKey;
				localStorage.alchemyOpApiKey = this.$store.state.alchemyOpApiKey;
			},

			async switchNetwork(i: number): Promise<void>
			{
				try
				{
					await window.ethereum.request({
						method: "wallet_switchEthereumChain",
						params: [
							{
								chainId: this.$store.state.config.networkChain[i].chainId
							},
						],
					});

					router.push("/");
				}
				// eslint-disable-next-line
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

		created(): void
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
