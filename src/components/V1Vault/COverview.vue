<template>
	<VCard class="mb-6 rounded-xl elevation-0 bg-light-frost">
		<VCardTitle class="text-primary">
			<VRow>
				<VCol cols="2" class="text-center"/>

				<VCol cols="8" class="text-center">
					<h4 class="text-center text-uppercase">🏦 Vault Overview</h4>
				</VCol>

				<VCol cols="2" class="text-right"/>
			</VRow>
		</VCardTitle>

		<VCardText class="mt-4">
			<VRow>
				<VCol cols="12">
					<h3 class="text-center font-weight-bold">{{ this.vaultAddress }}</h3>
				</VCol>

				<VCol cols="12" sm="6" class="text-right">
					<a
						:href="
							`https://${this.$store.state.etherscanDomainStart}.etherscan.io/address/${this.vaultAddress}`
						"
						target="_blank" rel="noopener noreferrer"
					>
						<VBtn color="primary" class="w-100 rounded-xl elevation-0">
							🔗 Etherscan
						</VBtn>
					</a>
				</VCol>

				<VCol cols="12" sm="6" class="text-right">
					<VBtn
						color="primary"
						class="w-100 rounded-xl elevation-0"
						@click="this.copy(this.vaultAddress)"
					>
						📋 Copy Address
					</VBtn>
				</VCol>
			</VRow>
		</VCardText>
	</VCard>

	<VCard class="mb-6 rounded-xl elevation-0 bg-light-frost">
		<VCardTitle class="text-primary">
			<VRow>
				<VCol cols="2" class="text-center"/>

				<VCol cols="8" class="text-center">
					<h4 class="text-center text-uppercase">🏦 Vault Balances Overview</h4>
				</VCol>

				<VCol cols="2" class="text-right">
					<VBtn
						variant="plain"
						color="warning"
						class="m-0 elevation-0 rounded-xl font-weight-bold"
						size="sm"
						@click="this.dialog = true"
					>
						ⓘ
					</VBtn>
				</VCol>
			</VRow>
		</VCardTitle>

		<VCardText class="mt-4">
			<VRow>
				<VCol cols="12">
					<VCard class="rounded-xl elevation-0 bg-light-frost">
						<VCardText>
							<VRow>
								<VCol cols="12" class="text-center">
									<h2 class="text-center text-uppercase text-primary">Ξ Ether Balance</h2>
								</VCol>

								<VCol cols="12">
									<h1 class="text-center">Ξ {{ this.ethBalance * 10 ** -18 }}</h1>
								</VCol>

								<VCol v-if="!this.asAdmin" cols="12">
									<RouterLink :to="`/v1-vault/${this.vaultAddress}`">
										<VBtn
											class="w-100 rounded-xl"
											color="primary"
											variant="flat"
											@click="
												this.$store.state.pages.RVV1Vault.tab = 'tr';
												this.$store.state.pages.RVV1Vault.transferRequests.tab = 'c';
												this.$store.state.pages.RVV1Vault.transferRequest.for = 'Ether';
											"
										>
											↗️ Transfer Out
										</VBtn>
									</RouterLink>
								</VCol>
							</VRow>
						</VCardText>
					</VCard>
				</VCol>

				<VCol cols="12">
					<VCard class="rounded-xl elevation-0 bg-light-frost">
						<VCardText>
							<VRow>
								<VCol cols="12" class="text-center">
									<h2 class="text-center text-uppercase text-primary">🪙 ERC 20 Tokens</h2>
								</VCol>

								<VCol cols="3">
									<h4 class="text-center text-primary">Name</h4>
								</VCol>

								<VCol :cols="this.asAdmin ? 9 : 6">
									<h4 class="text-center text-primary">Balance</h4>
								</VCol>

								<VCol v-if="!this.asAdmin" cols="3">
									<h4 class="text-center text-primary">Transfer Request</h4>
								</VCol>
							</VRow>

							<VRow v-for="(erc20, i) in this.erc20Balances" :key="i">
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

								<VCol :cols="this.asAdmin ? 9 : 6">
									<h4 class="text-center">{{ erc20.balance }}</h4>
								</VCol>

								<VCol v-if="!this.asAdmin" cols="3">
									<VBtn
										color="primary"
										variant="flat"
										class="w-100 rounded-xl"
										@click="this.forwardToERC20Create(this.vaultAddress, erc20)"
									>
										↗️ Transfer Out
									</VBtn>
								</VCol>
							</VRow>
						</VCardText>
					</VCard>
				</VCol>

				<VCol cols="12">
					<VCard class="rounded-xl elevation-0 bg-light-frost">
						<VCardText>
							<VRow>
								<VCol cols="12" class="text-center">
									<h2 class="text-center text-uppercase text-primary">
										🖼️ ERC 721 Tokens (NFTs)
									</h2>
								</VCol>

								<VCol cols="3">
									<h4 class="text-center text-primary">Name</h4>
								</VCol>

								<VCol :cols="this.asAdmin ? 9 : 6">
									<h4 class="text-center text-primary">Token Id</h4>
								</VCol>

								<VCol v-if="!this.asAdmin" cols="3">
									<h4 class="text-center text-primary">Transfer Request</h4>
								</VCol>
							</VRow>

							<VRow v-for="(erc721, i) in this.erc721Balances" :key="i" class="px-3 pb-3">
								<VCol cols="3">
									<a
										:href="`https://etherscan.io/address/${erc721.contract}`"
										target="_blank"
										rel="noopener noreferrer"
									>
										<VBtn variant="tonal" color="primary" class="w-100 rounded-xl">
											🔗 {{ erc721.name }}
										</VBtn>
									</a>
								</VCol>

								<VCol :cols="this.asAdmin ? 9 : 6">
									<h4 class="text-center">{{ erc721.tokenId }}</h4>
								</VCol>

								<VCol v-if="!this.asAdmin" cols="3">
									<VBtn
										color="primary"
										variant="flat"
										class="w-100 rounded-xl"
										@click="this.forwardToERC721Create(this.vaultAddress, erc721)"
									>
										↗️ Transfer Out
									</VBtn>
								</VCol>
							</VRow>
						</VCardText>
					</VCard>
				</VCol>
			</VRow>
		</VCardText>
	</VCard>

	<CTRPAOverview
		v-if="this.trp == this.yieldSyncV1ATransferRequestProtocol"
		:address="this.vaultAddress"
		:asAdmin="this.asAdmin"
	/>

	<CTRPBOverview
		v-if="this.trp == this.yieldSyncV1BTransferRequestProtocol"
		:address="this.vaultAddress"
		:asAdmin="this.asAdmin"
	/>

	<VDialog v-model="this.dialog" max-width="500px">
		<VCard>
			<VCardTitle>
				<span class="text-h5">Disclaimer</span>
			</VCardTitle>

			<VCardText>
				Please only send tokens to the network in which this vault has been deployed on.
			</VCardText>

			<VCardActions>
				<VSpacer/>

				<VBtn color="green darken-1" @click="this.dialog = false">Close</VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { Contract } from "web3-eth-contract";
	import { AbiItem } from "web3-utils";

	import abiER20 from "../../abi/erc20";
	import YieldSyncV1Vault from "../../abi/YieldSyncV1Vault";
	import alchemyGetBalances from "../../alchemy/getBalances";
	import alchemyGetGetNFTBalances from "../../alchemy/getNFTBalances";
	import CTRPAOverview from "../../components/V1Vault/CTransferRequestProtocolA/COverview.vue";
	import CTRPBOverview from "../../components/V1Vault/CTransferRequestProtocolB/COverview.vue";
	import router from "../../router";

	export default defineComponent({
		name: "COverview",

		components: {
			CTRPAOverview,
			CTRPBOverview,
		},

		props: {
			vaultAddress: {
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
				vault: undefined as Contract | undefined,
				trp: "",
				ZeroAddress: "0x0000000000000000000000000000000000000000",
				ethBalance: 0,
				erc20Balances: [
				] as {
					name: string,
					symbol: string,
					balance: number | string,
					contract: string,
				}[],
				erc721Balances: [
				] as {
					name: string,
					symbol: string,
					balance: number | string,
					contract: number | string,
					tokenId: number | string
				}[],

				error: "" as string,

				yieldSyncV1ATransferRequestProtocol: this.$store.state.config.networkChain[
					this.$store.state.currentChain.name
				].yieldSyncV1ATransferRequestProtocol,

				yieldSyncV1BTransferRequestProtocol: this.$store.state.config.networkChain[
					this.$store.state.currentChain.name
				].yieldSyncV1BTransferRequestProtocol,

				dialog: false,
			};
		},

		methods: {
			copy(a: string)
			{
				navigator.clipboard.writeText(a);
			},

			async getBalances()
			{
				if (this.$store.state.web3.utils.isAddress(this.vaultAddress))
				{
					this.ethBalance = await this.$store.state.web3.eth.getBalance(this.vaultAddress);

					this.erc20Balances = [
					];

					const apiKey = (
						this.$store.state.currentChain.id == 1 ||
						this.$store.state.currentChain.id == 5 ||
						this.$store.state.currentChain.id == 11155111
					) ? this.$store.state.alchemyApiKey : this.$store.state.alchemyOpApiKey;

					// eslint-disable-next-line
					const alchemyERCData: any = await alchemyGetBalances(
						apiKey,
						this.vaultAddress
					);

					console.log(apiKey, alchemyERCData);

					if (!alchemyERCData)
					{
						return;
					}

					for (let i = 0; i < alchemyERCData.tokenBalances.length; i++)
					{
						const tB = alchemyERCData.tokenBalances[i];

						if (tB.tokenBalance != this.ZeroAddress)
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

					// eslint-disable-next-line
					const alchemyNFTData: any = await alchemyGetGetNFTBalances(
						apiKey,
						this.vaultAddress
					);

					if (!alchemyNFTData)
					{
						return;
					}

					for (let i = 0; i < alchemyNFTData.ownedNfts.length; i++)
					{
						console.log(alchemyNFTData.ownedNfts[i]);
						let name = "Unknown";

						try
						{
							name = alchemyNFTData.ownedNfts[i].contract.name;
						}
						catch (e)
						{
							console.log(e);
						}

						let symbol = "NA";

						try
						{
							symbol = alchemyNFTData.ownedNfts[i].contract.symbol;
						}
						catch (e)
						{
							console.log(e);
						}

						this.erc721Balances.push(
							{
								name,
								symbol,
								balance: parseInt(alchemyNFTData.ownedNfts[i].balance) * Math.pow(10, -18),
								contract: alchemyNFTData.ownedNfts[i].contract.address,
								tokenId: alchemyNFTData.ownedNfts[i].tokenId,
							}
						);
					}
				}
			},

			forwardToERC20Create(
				address: string,
				erc20: {
					name: string,
					symbol: string,
					balance: number | string,
					contract: string,
				}
			)
			{
				this.$store.state.pages.RVV1Vault.tab = "tr";
				this.$store.state.pages.RVV1Vault.transferRequests.tab = "c";

				this.$store.state.pages.RVV1Vault.transferRequest.for = "ERC 20";
				this.$store.state.pages.RVV1Vault.transferRequest.token = erc20.contract;

				router.push(`/v1-vault/${address}`);
			},

			forwardToERC721Create(
				address: string,
				erc721: {
					name: string,
					symbol: string,
					balance: number | string,
					contract: number | string,
					tokenId: number | string
				}
			)
			{
				this.$store.state.pages.RVV1Vault.tab = "tr";
				this.$store.state.pages.RVV1Vault.transferRequests.tab = "c";

				this.$store.state.pages.RVV1Vault.transferRequest.for = "ERC 721";
				this.$store.state.pages.RVV1Vault.transferRequest.token = erc721.contract;
				this.$store.state.pages.RVV1Vault.transferRequest.tokenId = erc721.tokenId;

				router.push(`/v1-vault/${address}`);
			},
		},

		async created(): Promise<void>
		{
			this.vault = new this.$store.state.web3.eth.Contract(
				YieldSyncV1Vault as AbiItem[],
				this.vaultAddress
			);

			if (!this.vault)
			{
				return;
			}

			this.trp = await this.vault.methods.transferRequestProtocol().call();

			await this.getBalances();
		},
	});
</script>
