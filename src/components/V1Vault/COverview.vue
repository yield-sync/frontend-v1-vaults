<template>
	<VCard class="mx-auto mb-6 px-6 py-6" style="max-width: 600px;">
		<h4 class="text-center text-primary">Eth Balance</h4>
		<h5 class="text-center">{{ ethBalance * 10 ** -18 }}</h5>
	</VCard>

	<VCard class="mb-6 px-6 py-6">
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
						class="w-100"
						color="success"
						variant="tonal"
						@click="
							$store.state.pages.RVV1Vault.tab = 'wr';
							$store.state.pages.RVV1Vault.wrTab = 'c';
							$store.state.pages.RVV1Vault.withdrawalRequestKey++
						"
					>↗️</VBtn>
				</RouterLink>
			</VCol>

			<VCol sm="2">
				<a
					:href="`https://etherscan.io/address/${erc20.contract}`"
					target="_blank"
					rel="noopener noreferrer"
				>
					<VBtn variant="tonal" class="w-100">🔗</VBtn>
				</a>
			</VCol>
		</VRow>
	</VCard>

	<VCard class="mb-3 px-6 py-6">
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
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { AbiItem } from "web3-utils";

	import abiER20 from "../../abi/erc20";
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
		},
	});
</script>
