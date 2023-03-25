<template>
	<VContainer>
		<VRow>
			<VCol cols="12" style="min-height: 300px;">
				<p>{{ erc721Balances }}</p>
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
				] as { name: string, balance: number }[],
				erc721Balances: [
				] as { name: string, balance: number }[],
			};
		},

		async created()
		{
			if (typeof window.ethereum !== "undefined" && this.$store.state.accounts.length > 0)
			{
				const web3 = new Web3(window.ethereum);

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
