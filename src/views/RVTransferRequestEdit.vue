<template>
	<VContainer class="py-16">
		<div class="w-100 mx-auto" style="max-width: 1000px;">
			<VCard class="mb-6 rounded-xl elevation-0 bg-light-frost">
				<VCardTitle class="bg-primary text-light">
					<h4 class="m-0 text-center text-uppercase">Edit Transfer Request</h4>
				</VCardTitle>

				<VCardText class="mt-4">
					{{ transferrequest }}
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

		data() {
			return {
				yieldSyncV1Vault: undefined as undefined | Contract,
				transferrequest: undefined
			}
		},

		async created() {
			this.yieldSyncV1Vault = new this.$store.state.web3.eth.Contract(
				yieldSyncV1VaultABI as AbiItem[],
				this.$route.params.vaultaddress
			);

			if (this.yieldSyncV1Vault)
			{
				this.transferrequest = await this.yieldSyncV1Vault.methods.withdrawalRequestId_withdralRequest(
					this.$route.params.transferrequestid
				).call();
			}
		},
	});
</script>
