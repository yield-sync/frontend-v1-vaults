<template>
	<VContainer>
		<VRow>
			<VCol cols="12" md="6">
				<VCard class="mb-3 px-6 py-6">
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
					<VRow v-for="(erc20, i) in erc20Balances" :key="i" class="px-3 pb-3">
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

			<VCol cols="12" md="6">
				<VCard class="mb-3 px-6 py-6">
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
	import Web3 from "web3";
	import { AbiItem } from "web3-utils";

	import abiER20 from "../abi/erc20";
	import abiERC721 from "../abi/erc721";
	import abiERC721Metadata from "../abi/erc721Metadata";
	import ethContracts from "../eth-contracts";

	export default defineComponent({
		name: "DashboardView",

		data()
		{
			return {
				erc20Balances: [
				] as {
					name: string,
					symbol: string,
					balance: number
				}[],
				erc721Balances: [
				] as {
					name: string,
					symbol: string,
					balance: number
				}[],
			};
		},

		async created()
		{
			if (typeof window.ethereum !== "undefined" && this.$store.state.accounts.length > 0)
			{
				const web3 = new Web3(window.ethereum);

				// [erc20]
				for (let i = 0; i < ethContracts.erc20.length; i++)
				{
					const erc20ContractAddress = ethContracts.erc20[i];

					const contract = new web3.eth.Contract(abiER20 as AbiItem[], erc20ContractAddress);

					console.log("Connected Address:", this.$store.state.accounts[0]);

					this.erc20Balances.push(
						{
							name: await contract.methods.name().call(),
							symbol: await contract.methods.symbol().call(),
							balance: await contract.methods.balanceOf(this.$store.state.accounts[0]).call(),
						}
					);
				}

				// [erc721]
				for (let i = 0; i < ethContracts.erc721.length; i++)
				{
					const erc721ContractAddress = ethContracts.erc721[i];

					const contract = new web3.eth.Contract(abiERC721 as AbiItem[], erc721ContractAddress);
					const contractMetadata = new web3.eth.Contract(
						abiERC721Metadata as AbiItem[],
						erc721ContractAddress
					);

					abiERC721Metadata;

					console.log("Connected Address:", this.$store.state.accounts[0]);

					this.erc721Balances.push(
						{
							name: await contractMetadata.methods.name().call(),
							symbol: await contractMetadata.methods.symbol().call(),
							balance: await contract.methods.balanceOf(this.$store.state.accounts[0]).call(),
						}
					);
				}
			}
			else
			{
				console.log("No ethereum account connected..");
			}
		},
	});
</script>
