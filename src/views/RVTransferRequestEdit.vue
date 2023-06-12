<template>
	<VContainer class="py-16">
		<div class="w-100 mx-auto" style="max-width: 1000px;">
			<VCard class="mb-6 rounded-xl elevation-0 bg-light-frost">
				<VCardTitle class="bg-primary text-light">
					<h4 class="m-0 text-center text-uppercase">Edit Transfer Request</h4>
				</VCardTitle>

				<VCardText class="mt-4">
					<h6>{{ solTransferRequest }}</h6>

					<h3>{{ transferRequest }}</h3>
				</VCardText>
			</VCard>
		</div>
	</VContainer>
</template>

<script lang="ts">
	type TransferRequest = [
		// forERC20
		boolean,
		// forERC721
		boolean,
		// creator
		string,
		// token
		string,
		// tokenId
		string,
		// amount
		string,
		// to
		string,
		// forVoteCount
		string,
		// againstVoteCount
		string,
		// latestRelevantForVoteTime
		string,
		// votedMembers
		string[],
	];

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
				solTransferRequest: undefined as undefined | TransferRequest,
				transferRequest: {
					for: "Ether" as "Ether" | "ERC20" | "ERC721",
					creator: "" as string,
					to: "" as string,
					token: "" as string,
					amount: 0 as number,
					tokenId: 0 as number,
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
				this.solTransferRequest = await this.yieldSyncV1Vault.methods.transferRequestId_transferRequest(
					this.$route.params.transferrequestid
				).call();

				if (this.solTransferRequest)
				{
					if (this.solTransferRequest[0] && !this.solTransferRequest[1])
					{
						this.transferRequest.for = "ERC20";
					}

					if (!this.solTransferRequest[0] && this.solTransferRequest[1])
					{
						this.transferRequest.for = "ERC721";
					}

					this.transferRequest.creator = String(this.solTransferRequest[2]);

					this.transferRequest.to = String(this.solTransferRequest[3]);

					this.transferRequest.token =  String(this.solTransferRequest[4]);
				}
			}
		},
	});
</script>
