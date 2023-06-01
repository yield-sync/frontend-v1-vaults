<template>
	<VContainer>
		<VCard class="mb-6 rounded-xl elevation-0">
			<VCardTitle class="bg-primary text-light">
				<h4 class="m-0 text-center text-uppercase">Settings</h4>
			</VCardTitle>

			<VCardText class="mt-4">
				<VBtn
					:disabled="processing"
					color="primary"
					class="w-100 rounded-xl"
					@click="renounceMembership()"
				>
					Renounce Membership
				</VBtn>

				<h6 v-if="error">{{ error }}</h6>
			</VCardText>
		</VCard>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { AbiItem } from "web3-utils";
	import { TransactionReceipt } from "web3-core";
	import { Contract } from "web3-eth-contract";

	import YieldSyncV1Vault from "../../abi/YieldSyncV1Vault";

	export default defineComponent({
		name: "CMembers",

		props: {
			vaultAddress: {
				type: String,
				required: true
			}
		},

		data()
		{
			return {
				processing: false,
				yieldSyncV1Vault: undefined as undefined | Contract,
				error: "" as string
			};
		},

		methods: {
			async renounceMembership()
			{
				if (this.yieldSyncV1Vault)
				{
					try
					{
						await this.yieldSyncV1Vault.methods.renounceMembership().send({
							from: this.$store.state.wallet.accounts[0]
						}).on("sent", async () =>
						{
							this.processing = true;
						}).on("confirmation", async (confirmationNumber: number, receipt: TransactionReceipt) =>
						{
							console.log(`Confirmation #${confirmationNumber}`, receipt);

							if (confirmationNumber == 0)
							{
								this.processing = false;
							}
						}).on("error", async (error: Error) =>
						{
							this.error = String(error);

							this.processing = false;
						});
					}
					catch (e)
					{
						this.error = String(e);
					}
				}
			}
		},

		async created()
		{
			this.yieldSyncV1Vault = new this.$store.state.web3.eth.Contract(
				YieldSyncV1Vault as AbiItem[],
				this.vaultAddress
			);
		}
	});
</script>
