<template>
	<VRow>
		<VCol cols="12">
			<VCard class="mb-6 rounded-xl elevation-0 bg-light-frost">
				<VCardTitle class="bg-primary text-light">
					<h4 class="text-center text-uppercase">🏦 Overview</h4>
				</VCardTitle>

				<VCardText class="mt-4">
					<VRow class="text-center">
						<VCol cols="12" class="text-center">
							<a
								:href="
									`https://${$store.state.etherscanDomainStart}.etherscan.io/address/${address}`
								"
								target="_blank" rel="noopener noreferrer"
							>
								<VBtn variant="tonal" color="primary" class="rounded-xl" size="large">
									🔗 {{ address }}
								</VBtn>
							</a>
						</VCol>

						<!-- For Vote -->
						<VCol cols="12" sm="4">
							<VCard class="px-3 py-3 rounded-xl elevation-0 bg-light-frost">
								<h3 class="mb-3 text-primary">✅ For Vote Count</h3>

								<h2 class="m-0">{{ vault.forVoteCountRequired }}</h2>
							</VCard>
						</VCol>

						<VCol cols="12" sm="4">
							<VCard class="px-3 py-3 rounded-xl elevation-0 bg-light-frost">
								<h3 class="mb-3 text-primary">❌ Against Vote Count</h3>

								<h2 class="m-0">{{ vault.againstVoteCountRequired }}</h2>
							</VCard>
						</VCol>

						<VCol cols="12" sm="4">
							<VCard class="px-3 py-3 rounded-xl elevation-0 bg-light-frost">
								<h3 class="mb-3 text-primary">⏳ Transfer Delay</h3>

								<h2 class="m-0">{{ vault.transferDelaySeconds }} Seconds</h2>
							</VCard>
						</VCol>
					</VRow>
				</VCardText>
			</VCard>
		</VCol>

		<VCol cols="12">
			<VCard class="mb-6 rounded-xl elevation-0 bg-light-frost">
				<VCardTitle class="bg-primary text-light">
					<h4 class="text-center text-uppercase">Ξ Ether Balance</h4>
				</VCardTitle>

				<VCardText class="mt-4">
					<VRow>
						<VCol :cols="asAdmin ? 12 : 6" class="text-center">
							<VCard class="px-3 py-3 rounded-xl elevation-0 bg-light-frost">
								<h2 class="text-primary">Ξ {{ ethBalance * 10 ** -18 }}</h2>
							</VCard>
						</VCol>

						<VCol v-if="!asAdmin" :cols="asAdmin ? 12 : 6">
							<RouterLink :to="`/v1-vault/${address}?eth=true`">
								<VBtn
									class="w-100 rounded-xl"
									color="primary"
									variant="flat"
									@click="
										$store.state.pages.RVV1Vault.tab = 'wr';
										$store.state.pages.RVV1Vault.transferRequest.tab = 'c';
										$store.state.pages.RVV1Vault.transferRequest.key++
									"
								>
									↗️ Transfer Out
								</VBtn>
							</RouterLink>
						</VCol>
					</VRow>
				</VCardText>
			</VCard>

			<VCard class="mb-6 rounded-xl elevation-0 bg-light-frost">
				<VCardTitle class="bg-primary text-light">
					<h4 class="m-0 text-center text-uppercase">🪙 ERC 20 Tokens</h4>
				</VCardTitle>

				<VCardText class="mt-4">
					<VRow>
						<VCol cols="3">
							<h4 class="text-center text-primary">Name</h4>
						</VCol>

						<VCol cols="6">
							<h4 class="text-center text-primary">Balance</h4>
						</VCol>

						<VCol cols="3">
							<h4 class="text-center text-primary">Transfer Request</h4>
						</VCol>
					</VRow>

					<VRow v-for="(erc20, i) in erc20Balances" :key="i">
						<VCol cols="3">
							<a
								:href="`https://etherscan.io/address/${erc20.contract}`"
								target="_blank"
								rel="noopener noreferrer"
							>
								<VBtn variant="tonal" color="primary" class="w-100 rounded-xl">
									🔗 {{ erc20.name }}
								</VBtn>
							</a>
						</VCol>

						<VCol sm="6">
							<h4 class="text-center">{{ erc20.balance }}</h4>
						</VCol>

						<VCol cols="3">
							<VBtn
								color="primary"
								variant="flat"
								class="w-100 rounded-xl"
								@click="forwardToCreate(address, erc20)"
							>
								↗️ Transfer Out
							</VBtn>
						</VCol>
					</VRow>
				</VCardText>
			</VCard>

			<VCard class="mb-6 rounded-xl elevation-0 bg-light-frost">
				<VCardTitle class="bg-primary text-light">
					<h4 class="m-0 text-center text-uppercase">🖼️ ERC 721 Tokens (NFTs)</h4>
				</VCardTitle>

				<VCardText class="mt-4">
					<VRow>
						<VCol cols="4">
							<h4 class="text-primary">Symbol</h4>
							<h5 class="text-primary">Name</h5>
						</VCol>

						<VCol cols="4">
							<h4 class="text-primary">Balance</h4>
						</VCol>

						<VCol cols="2">
							<h4 class="text-primary">Copy</h4>
						</VCol>

						<VCol cols="2">
							<h4 class="text-primary">Etherscan</h4>
						</VCol>
					</VRow>

					<VRow v-for="(erc721, i) in erc721Balances" :key="i" class="px-3 pb-3">
						<VCol cols="4">
							<h4>{{ erc721.name }}</h4>
							<h5>{{ erc721.symbol }}</h5>
						</VCol>

						<VCol sm="4">
							<h4>{{ erc721.balance }}</h4>
						</VCol>

						<VCol cols="2">
							<VBtn class="w-100" variant="tonal">📋</VBtn>
						</VCol>

						<VCol sm="2">
							<a
								:href="`https://etherscan.io/address/${erc721.contract}`"
								target="_blank"
								rel="noopener noreferrer"
							>
								<VBtn variant="tonal" class="w-100">🔗</VBtn>
							</a>
						</VCol>
					</VRow>
				</VCardText>
			</VCard>
		</VCol>
	</VRow>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { AbiItem } from "web3-utils";

	import abiER20 from "../../abi/erc20";
	import YieldSyncV1Vault from "../../abi/YieldSyncV1Vault";
	import alchemyGetBalances from "../../alchemy/getBalances";
	import router from "../../router";

	export default defineComponent({
		name: "COverview",

		props: {
			address: {
				type: String,
				required: true
			},

			asAdmin: {
				type: Boolean,
				default: false
			},
		},

		data()
		{
			return {
				ethBalance: 0,
				erc20Balances: [
				] as {
					name: string,
					symbol: string,
					balance: number | string,
					contract: number | string,
				}[],
				erc721Balances: [
				] as {
					name: string,
					symbol: string,
					balance: number | string,
					contract: number | string
				}[],
				vault: {
					againstVoteCountRequired: 0,
					forVoteCountRequired: 0,
					transferDelaySeconds: 0,
				},
				error: "" as string,
			};
		},

		methods: {
			async getBalances()
			{
				if (this.$store.state.web3.utils.isAddress(this.address))
				{
					this.ethBalance = await this.$store.state.web3.eth.getBalance(this.address);

					this.erc20Balances = [
					];

					// eslint-disable-next-line
					const data: any = await alchemyGetBalances(
						this.$store.state.alchemyApiKey,
						this.address
					);

					console.log("Alchemy Response:", data);

					for (let i = 0; i < data.tokenBalances.length; i++)
					{
						const tB = data.tokenBalances[i];

						if (tB.tokenBalance != "0x0000000000000000000000000000000000000000000000000000000000000000")
						{

							const contract = new this.$store.state.web3.eth.Contract(
								abiER20 as AbiItem[],
								tB.contractAddress
							);

							let n = "N.A.";
							try
							{
								n = await contract.methods.name().call();
							}
							catch (e)
							{
								console.log(e);
							}

							let s = "N.A.";
							try
							{
								s = await contract.methods.symbol().call();
							}
							catch (e)
							{
								console.log(e);
							}

							this.erc20Balances.push(
								{
									name: n,
									symbol: s,
									balance: parseInt(tB.tokenBalance) * Math.pow(10, -18),
									contract: tB.contractAddress
								}
							);
						}
					}
				}
			},

			forwardToCreate(
				address: string,
				erc20: {
					name: string,
					symbol: string,
					balance: number | string,
					contract: number | string,
				}
			)
			{
				this.$store.state.pages.RVV1Vault.tab = "wr";
				this.$store.state.pages.RVV1Vault.transferRequest.tab = "c";

				router.push(`/v1-vault/${address}?erc20Address=${erc20.contract}`);
			}
		},

		async created()
		{
			await this.getBalances();

			// watch the params of the route to fetch the data again
			this.$watch(
				() =>
				{
					return this.$route.params;
				},
				async () =>
				{
					await this.getBalances();
				},
				// fetch the data when the view is created and the data is already being observed
				{
					immediate: true
				}
			);

			const yieldSyncV1Vault = new this.$store.state.web3.eth.Contract(
				YieldSyncV1Vault as AbiItem[],
				this.address
			);

			this.vault.againstVoteCountRequired = await yieldSyncV1Vault.methods.againstVoteCountRequired().call();
			this.vault.forVoteCountRequired = await yieldSyncV1Vault.methods.forVoteCountRequired().call();
			this.vault.transferDelaySeconds = await yieldSyncV1Vault.methods.transferDelaySeconds().call();
		},
	});
</script>
