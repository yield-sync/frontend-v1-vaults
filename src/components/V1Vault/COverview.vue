<template>
	<VCard class="mb-6 rounded-xl elevation-0 bg-light-frost">
		<VCardTitle class="bg-primary text-light">
			<h4 class="text-center text-uppercase">🏦 Overview</h4>
		</VCardTitle>

		<VCardText class="mt-4">
			<VRow>
				<!-- For Vote -->
				<VCol cols="12" sm="4" class="text-center">
					<VCard class="px-3 py-3 rounded-xl elevation-0 bg-light-frost">
						<h3 class="mb-3 text-primary">✅ For Vote Count</h3>

						<h2 class="m-0">{{ vault.forVoteCountRequired }}</h2>
					</VCard>
				</VCol>

				<VCol cols="12" sm="4" class="text-center">
					<VCard class="px-3 py-3 rounded-xl elevation-0 bg-light-frost">
						<h3 class="mb-3 text-primary">❌ Against Vote Count</h3>

						<h2 class="m-0">{{ vault.againstVoteCountRequired }}</h2>
					</VCard>
				</VCol>

				<VCol cols="12" sm="4" class="text-center">
					<VCard class="px-3 py-3 rounded-xl elevation-0 bg-light-frost">
						<h3 class="mb-3 text-primary">⏳ Transfer Delay</h3>

						<h2 class="m-0">{{ vault.transferDelaySeconds }} Seconds</h2>
					</VCard>
				</VCol>

				<VCol cols="12">
					<VCard class="rounded-xl elevation-0 bg-light-frost">
						<VCardText>
							<VRow>
								<VCol cols="12" class="text-center">
									<h2 class="mt-2 text-center text-uppercase text-primary">Ξ Ether Balance</h2>
								</VCol>

								<VCol cols="12">
									<h1 class="text-center">{{ ethBalance * 10 ** -18 }}</h1>
								</VCol>

								<VCol v-if="!asAdmin" cols="12">
									<RouterLink :to="`/v1-vault/${address}`">
										<VBtn
											class="w-100 rounded-xl"
											color="primary"
											variant="flat"
											@click="
												$store.state.pages.RVV1Vault.tab = 'tr';
												$store.state.pages.RVV1Vault.transferRequests.tab = 'c';
												$store.state.pages.RVV1Vault.transferRequest.for = 'Ether';
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
									<h2 class="mt-2 text-center text-uppercase text-primary">🪙 ERC 20 Tokens</h2>
								</VCol>

								<VCol cols="3">
									<h4 class="text-center text-primary">Name</h4>
								</VCol>

								<VCol :cols="asAdmin ? 9 : 6">
									<h4 class="text-center text-primary">Balance</h4>
								</VCol>

								<VCol v-if="!asAdmin" cols="3">
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

								<VCol :cols="asAdmin ? 9 : 6">
									<h4 class="text-center">{{ erc20.balance }}</h4>
								</VCol>

								<VCol v-if="!asAdmin" cols="3">
									<VBtn
										color="primary"
										variant="flat"
										class="w-100 rounded-xl"
										@click="forwardToERC20Create(address, erc20)"
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
									<h2 class="mt-2 text-center text-uppercase text-primary">
										🖼️ ERC 721 Tokens (NFTs)
									</h2>
								</VCol>

								<VCol cols="3">
									<h4 class="text-center text-primary">Name</h4>
								</VCol>

								<VCol :cols="asAdmin ? 9 : 6">
									<h4 class="text-center text-primary">Token Id</h4>
								</VCol>

								<VCol v-if="!asAdmin" cols="3">
									<h4 class="text-center text-primary">Transfer Request</h4>
								</VCol>
							</VRow>

							<VRow v-for="(erc721, i) in erc721Balances" :key="i" class="px-3 pb-3">
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

								<VCol :cols="asAdmin ? 9 : 6">
									<h4 class="text-center">{{ erc721.tokenId }}</h4>
								</VCol>

								<VCol v-if="!asAdmin" cols="3">
									<VBtn
										color="primary"
										variant="flat"
										class="w-100 rounded-xl"
										@click="forwardToERC721Create(address, erc721)"
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
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { Contract } from "web3-eth-contract";
	import { AbiItem } from "web3-utils";

	import abiER20 from "../../abi/erc20";
	import YieldSyncV1ATransferRequestProtocol from "../../abi/YieldSyncV1ATransferRequestProtocol";
	import alchemyGetBalances from "../../alchemy/getBalances";
	import alchemyGetGetNFTBalances from "../../alchemy/getNFTBalances";
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
				vault: {
					againstVoteCountRequired: 0 as number,
					forVoteCountRequired: 0 as number,
					transferDelaySeconds: 0 as number,
				},
				error: "" as string,

				transferRequestProtocol: this.$store.state.config.address[
					this.$store.state.chainName
				].yieldSyncV1ATransferRequestProtocol,
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
					const data: any = await alchemyGetBalances(this.$store.state.alchemyApiKey, this.address);

					for (let i = 0; i < data.tokenBalances.length; i++)
					{
						const tB = data.tokenBalances[i];

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
						this.$store.state.alchemyApiKey,
						this.address
					);

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

		async created()
		{
			await this.getBalances();

			const transferRequestProtocol: Contract = new this.$store.state.web3.eth.Contract(
				YieldSyncV1ATransferRequestProtocol as AbiItem[],
				this.transferRequestProtocol
			);

			this.vault.againstVoteCountRequired = (
				await transferRequestProtocol.methods.yieldSyncV1VaultAddress_yieldSyncV1VaultProperty(
					this.address
				).call()
			)[0];
			this.vault.forVoteCountRequired = (
				await transferRequestProtocol.methods.yieldSyncV1VaultAddress_yieldSyncV1VaultProperty(
					this.address
				).call()
			)[1];
			this.vault.transferDelaySeconds = (
				await transferRequestProtocol.methods.yieldSyncV1VaultAddress_yieldSyncV1VaultProperty(
					this.address
				).call()
			)[2];
		},
	});
</script>
