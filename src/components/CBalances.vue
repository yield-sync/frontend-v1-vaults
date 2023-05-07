<template>
	<VContainer>
		<VRow>
			<VCol cols="12">
				<VCard color="light" class="mb-3 px-6 py-6">
					<VRow class="">
						<VCol cols="12">
							<h3>ERC 20 Tokens</h3>
						</VCol>
					</VRow>
					<VRow class="">
						<VCol cols="5">
							<h4 class="text-primary">Symbol</h4>
							<h5 class="text-primary">Name</h5>
						</VCol>

						<VCol cols="6">
							<h4 class="text-primary">Balance</h4>
						</VCol>

						<VCol cols="1">
							<h4 class="text-primary">Etherscan</h4>
						</VCol>
					</VRow>
					<VRow v-for="(erc20, i) in erc20Balances" :key="i" class="">
						<VCol cols="5">
							<h4>{{ erc20.symbol }}</h4>
							<h5>{{ erc20.name }}</h5>
						</VCol>

						<VCol sm="6">
							<h4>{{ erc20.balance }}</h4>
						</VCol>

						<VCol sm="1">
							<a
								:href="`https://etherscan.io/address/${erc20.contract}`"
								target="_blank"
								rel="noopener noreferrer"
							>
								<VBtn variant="tonal" size="sm" class="w-100">
									🔗
								</VBtn>
							</a>
						</VCol>
					</VRow>
				</VCard>
			</VCol>

			<VCol cols="12">
				<VCard color="light" class="mb-3 px-6 py-6">
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
		name: "CBalances",

		props: {
			address: {
				type: String,
				required: true
			}
		},

		data()
		{
			return {
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
					this.erc20Balances = [
					];

					console.log("address:", this.address);
					console.log("net:", await this.$store.state.web3.eth.net.getId());

					// eslint-disable-next-line
					const data: any = await alchemyGetBalances(
						this.$store.state.alchemyApiKey,
						await this.$store.state.web3.eth.net.getId(),
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
