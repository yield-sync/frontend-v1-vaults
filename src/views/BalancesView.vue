<template>
	<VContainer>
		<VRow>
			<VCol cols="12">
				<VCard color="primary-light" class="mb-3 px-6 py-6">
					<VRow class="">
						<VCol cols="12">
							<h3>ERC 20 Tokens</h3>
						</VCol>
					</VRow>
					<VRow class="border border-primary">
						<VCol cols="6">
							<h4>Symbol</h4>
							<h5>Name</h5>
						</VCol>

						<VCol cols="6">
							<h4>Balance</h4>
						</VCol>
					</VRow>
					<VRow v-for="(erc20, i) in erc20Balances" :key="i" class="">
						<VCol cols="6">
							<h4>{{ erc20.symbol }}</h4>
							<h5>{{ erc20.name }}</h5>
						</VCol>

						<VCol sm="6">
							<h4>{{ erc20.balance }}</h4>
						</VCol>
					</VRow>
				</VCard>
			</VCol>

			<VCol cols="12">
				<VCard color="primary-light" class="mb-3 px-6 py-6">
					<VRow class="">
						<VCol cols="12">
							<h3>ERC 721 Tokens (NFTs)</h3>
						</VCol>
					</VRow>
					<VRow class="border border-primary">
						<VCol cols="6">
							<h4>Symbol</h4>
							<h5>Name</h5>
						</VCol>

						<VCol cols="6">
							<h4>Balance</h4>
						</VCol>
					</VRow>
					<VRow v-for="(erc721, i) in erc721Balances" :key="i" class="px-3 pb-3">
						<VCol cols="6">
							<h4>{{ erc721.name }}</h4>
							<h5>{{ erc721.symbol }}</h5>
						</VCol>

						<VCol cols="6">
							<h4>{{ erc721.balance }}</h4>
						</VCol>
					</VRow>
				</VCard>
			</VCol>
		</VRow>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { AbiItem } from "web3-utils";

	import abiER20 from "../abi/erc20";
	//import abiERC721 from "../abi/erc721";
	//import abiERC721Metadata from "../abi/erc721Metadata";
	import alchemyGetBalances from "../alchemy/getBalances";

	export default defineComponent({
		name: "BalancesView",

		data()
		{
			return {
				addressToCheckBalancesOf: this.$route.params.address as string,
				erc20Balances: [
				] as {
					name: string,
					symbol: string,
					balance: number | string
				}[],
				erc721Balances: [
				] as {
					name: string,
					symbol: string,
					balance: number | string
				}[],
			};
		},

		methods: {
			async getBalances()
			{
				if (this.$store.state.web3.utils.isAddress(this.addressToCheckBalancesOf))
				{
					this.erc20Balances = [
					];

					// eslint-disable-next-line
					const data: any = await alchemyGetBalances(
						this.$store.state.alchemyApiKey,
						await this.$store.state.web3.eth.net.getId(),
						this.addressToCheckBalancesOf
					);

					for (let i = 0; i < data.tokenBalances.length; i++)
					{
						const tB = data.tokenBalances[i];

						if (tB.tokenBalance != "0x0000000000000000000000000000000000000000000000000000000000000000")
						{

							const contract = new this.$store.state.web3.eth.Contract(
								abiER20 as AbiItem[],
								tB.contractAddress
							);

							this.erc20Balances.push(
								{
									name: await contract.methods.name().call(),
									symbol: await contract.methods.symbol().call(),
									balance: parseInt(tB.tokenBalance) * Math.pow(10, -18)
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
