<template>
	<VContainer class="py-16">
		<div class="w-100 mx-auto" style="max-width: 1000px;">
			<VCard class="mb-6 rounded-xl elevation-0 bg-light-frost">
				<VCardTitle class="bg-primary text-light">
					<h4 class="m-0 text-center text-uppercase">Edit Transfer Request</h4>
				</VCardTitle>

				<VCardText class="mt-4">
					<h6>{{ transferRequest }}</h6>

					<h3>{{ transferRequest }}</h3>
				</VCardText>
			</VCard>
		</div>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { Contract } from "web3-eth-contract";
	import { AbiItem } from "web3-utils";

	import yieldSyncV1VaultABI from "../abi/YieldSyncV1Vault";

	export default defineComponent({
		name: "RVV1Vault",

		data()
		{
			return {
				yieldSyncV1Vault: undefined as undefined | Contract,
				transferRequest: {
					for: "Ether" as "Ether" | "ERC20" | "ERC721",
					creator: "" as string,
					token: "" as string,
					tokenId: 0 as number,
					to: "" as string,
					amount: 0 as number,
				}
			};
		},

		async created()
		{
			this.yieldSyncV1Vault = new this.$store.state.web3.eth.Contract(
				yieldSyncV1VaultABI as AbiItem[],
				this.$route.params.vaultaddress
			);

			if (this.yieldSyncV1Vault)
			{
				const transferRequest = await this.yieldSyncV1Vault.methods.transferRequestId_transferRequest(
					this.$route.params.transferrequestid
				).call();

				if (this.transferRequest)
				{
					if (transferRequest.forERC20 && !transferRequest.forERC721)
					{
						this.transferRequest.for = "ERC20";
					}

					if (!transferRequest.forERC20 && transferRequest.forERC721)
					{
						this.transferRequest.for = "ERC721";
					}

					this.transferRequest.creator = String(transferRequest.creator);
					this.transferRequest.token =  String(transferRequest.token);
					this.transferRequest.tokenId =  parseInt(transferRequest.tokenId);
					this.transferRequest.to = String(transferRequest.to);
					this.transferRequest.amount = parseInt(transferRequest.amount);
				}
			}
		},
	});
</script>
