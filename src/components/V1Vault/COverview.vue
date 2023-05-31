<template>
	<VRow>
		<VCol cols="12">
			<VCard class="mb-6 px-6 py-6 rounded-xl elevation-0">
				<VRow>
					<VCol cols="12">
						<h4 class="mb-3 text-center text-primary">{{ address }}</h4>
					</VCol>

					<VCol cols="6">
						<h4 class="text-primary">Eth Balance: {{ ethBalance * 10 ** -18 }}</h4>
					</VCol>

					<VCol cols="6">
						<RouterLink :to="`/v1-vault/${address}?eth=true`">
							<VBtn
								class="w-100 rounded-xl"
								color="success"
								variant="tonal"
								@click="
									$store.state.pages.RVV1Vault.tab = 'wr';
									$store.state.pages.RVV1Vault.wrTab = 'c';
									$store.state.pages.RVV1Vault.withdrawalRequestKey++
								"
							>
								↗️ Transfer Out
							</VBtn>
						</RouterLink>
					</VCol>

					<VCol cols="12" sm="6">
						<VRow>
							<!-- [TITLE] -->
							<VCol cols="7">
								<h4 class="text-primary">Against Vote Count Required</h4>
							</VCol>

							<!-- [EDIT-BUTTON] -->
							<VCol cols="5" class="text-right">
								<VBtn
									variant="outlined"
									color="primary"
									size="sm"
									class="w-100"
									@click="edit.againstVoteCountRequired = !edit.againstVoteCountRequired"
								>{{ edit.againstVoteCountRequired ? 'Cancel' : 'Edit' }}</VBtn>
							</VCol>

							<VCol cols="12">
								<!-- [CURRENT] -->
								<h3 v-if="!edit.againstVoteCountRequired" class="m-0">
									{{ vault.againstVoteCountRequired }}
								</h3>

								<!-- [EDIT] -->
								<VRow v-if="edit.againstVoteCountRequired" class="input-group input-group-sm">
									<VCol cols="7">
										<VTextField
											v-model="update.againstVoteCountRequired"
											size="sm"
											type="number"
											label="For Vote Count"
											variant="outlined"
										/>
									</VCol>
									<VCol cols="5" class="input-group-append">
										<VBtn
											variant="flat"
											color="primary"
											class="w-100"
											@click="console.log()"
										>Update</VBtn>
									</VCol>
								</VRow>
							</VCol>
						</VRow>
					</VCol>

					<VCol cols="12" sm="6">
						<VRow>
							<!-- [TITLE] -->
							<VCol cols="7">
								<h4 class="text-primary">For Vote Count Required</h4>
							</VCol>

							<!-- [EDIT-BUTTON] -->
							<VCol cols="5" class="text-right">
								<VBtn
									variant="outlined"
									color="primary"
									size="sm"
									class="w-100"
									@click="edit.forVoteCountRequired = !edit.forVoteCountRequired"
								>{{ edit.forVoteCountRequired ? 'Cancel' : 'Edit' }}</VBtn>
							</VCol>

							<VCol cols="12">
								<!-- [CURRENT] -->
								<h3 v-if="!edit.forVoteCountRequired" class="m-0">{{ vault.forVoteCountRequired }}</h3>

								<!-- [EDIT] -->
								<VRow v-if="edit.forVoteCountRequired" class="input-group input-group-sm">
									<VCol cols="7">
										<VTextField
											v-model="update.forVoteCountRequired"
											size="sm"
											type="number"
											label="For Vote Count"
											variant="outlined"
										/>
									</VCol>
									<VCol cols="5" class="input-group-append">
										<VBtn
											variant="flat"
											color="primary"
											class="w-100"
											@click="console.log()"
										>Update</VBtn>
									</VCol>
								</VRow>
							</VCol>
						</VRow>
					</VCol>

					<VCol cols="12" sm="12">
						<h4 class="text-primary">Withdrawal Delay Seconds: {{ vault.withdrawalDelaySeconds }}</h4>
					</VCol>
				</VRow>
			</VCard>
		</VCol>

		<VCol cols="12">
			<VCard class="mb-6 px-6 py-6 rounded-xl elevation-0">
				<VRow>
					<VCol cols="12">
						<h4 class="text-center text-primary">ERC 20 Tokens</h4>
					</VCol>
				</VRow>
				<VRow>
					<VCol cols="4">
						<h4 class="text-primary">Symbol</h4>
						<h5 class="text-primary">Name</h5>
					</VCol>

					<VCol cols="4">
						<h4 class="text-primary">Balance</h4>
					</VCol>

					<VCol cols="2">
						<h4 class="text-primary">Withdrawal Reqest</h4>
					</VCol>

					<VCol cols="2">
						<h4 class="text-primary">Etherscan</h4>
					</VCol>
				</VRow>

				<VRow v-for="(erc20, i) in erc20Balances" :key="i">
					<VCol cols="4">
						<h4>{{ erc20.symbol }}</h4>
						<h5>{{ erc20.name }}</h5>
					</VCol>

					<VCol sm="4">
						<h4>{{ erc20.balance }}</h4>
					</VCol>

					<VCol cols="2">
						<RouterLink :to="`/v1-vault/${address}?erc20Address=${erc20.contract}`">
							<VBtn
								class="w-100 rounded-xl"
								color="success"
								variant="tonal"
								@click="
									$store.state.pages.RVV1Vault.tab = 'wr';
									$store.state.pages.RVV1Vault.wrTab = 'c';
									$store.state.pages.RVV1Vault.withdrawalRequestKey++
								"
							>
								↗️ Transfer Out
							</VBtn>
						</RouterLink>
					</VCol>

					<VCol sm="2">
						<a
							:href="`https://etherscan.io/address/${erc20.contract}`"
							target="_blank"
							rel="noopener noreferrer"
						>
							<VBtn variant="tonal" class="w-100 rounded-xl">🔗</VBtn>
						</a>
					</VCol>
				</VRow>
			</VCard>

			<VCard class="mb-6 px-6 py-6 rounded-xl elevation-0">
				<VRow>
					<VCol cols="12">
						<h4 class="text-center text-primary">ERC 721 Tokens (NFTs)</h4>
					</VCol>
				</VRow>
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

	export default defineComponent({
		name: "COverview",

		props: {
			address: {
				type: String,
				required: true
			}
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
					withdrawalDelaySeconds: 0,
				},
				edit: {
					againstVoteCountRequired: false,
					forVoteCountRequired: false,
					withdrawalDelaySeconds: false
				},
				update: {
					againstVoteCountRequired: 0,
					forVoteCountRequired: 0,
					withdrawalDelaySeconds: 0,
				},
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
			this.update.againstVoteCountRequired = this.vault.againstVoteCountRequired;
			this.vault.forVoteCountRequired = await yieldSyncV1Vault.methods.forVoteCountRequired().call();
			this.update.forVoteCountRequired = this.vault.forVoteCountRequired;
			this.vault.withdrawalDelaySeconds = await yieldSyncV1Vault.methods.withdrawalDelaySeconds().call();
			this.update.withdrawalDelaySeconds = this.vault.withdrawalDelaySeconds;
		},
	});
</script>
