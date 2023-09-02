<template>
	<VCard class="mb-6 rounded-xl elevation-0 bg-light-frost">
		<VCardTitle class="bg-primary text-light">
			<VRow>
				<VCol cols="12" class="text-center">
					<h4 class="text-center text-uppercase">🏦 TRP Overview</h4>
				</VCol>
			</VRow>
		</VCardTitle>

		<VCardText class="mt-4">
			<VRow>
				<!-- For Vote -->
				<VCol cols="12" sm="4" class="text-center">
					<VCard class="px-3 py-3 rounded-xl elevation-0 bg-light-frost">
						<h3 class="mb-3 text-primary">✅ For Vote Count</h3>

						<VProgressCircular
							v-if="vault.voteForRequired == 0"
							indeterminate
							color="light"
							class=""
						/>

						<h2 v-else class="m-0">{{ vault.voteForRequired }}</h2>
					</VCard>
				</VCol>

				<VCol cols="12" sm="4" class="text-center">
					<VCard class="px-3 py-3 rounded-xl elevation-0 bg-light-frost">
						<h3 class="mb-3 text-primary">❌ Against Vote Count</h3>

						<VProgressCircular
							v-if="vault.voteForRequired == 0"
							indeterminate
							color="light"
							class=""
						/>

						<h2 v-else class="m-0">{{ vault.voteAgainstRequired }}</h2>
					</VCard>
				</VCol>

				<VCol cols="12" sm="4" class="text-center">
					<VCard class="px-3 py-3 rounded-xl elevation-0 bg-light-frost">
						<h3 class="mb-3 text-primary">⏳ Transfer Delay</h3>

						<VProgressCircular
							v-if="vault.voteForRequired == 0"
							indeterminate
							color="light"
							class=""
						/>

						<h2 v-else class="m-0">{{ vault.transferDelaySeconds }} Seconds</h2>
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

	import YieldSyncV1ATransferRequestProtocol from "../../../abi/YieldSyncV1ATransferRequestProtocol";

	export default defineComponent({
		name: "CTRPAOverview",

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
				vault: {
					voteAgainstRequired: 0 as number,
					voteForRequired: 0 as number,
					transferDelaySeconds: 0 as number,
				},
				error: "" as string,

				transferRequestProtocol: this.$store.state.config.networkChain[
					this.$store.state.currentChain.name
				].yieldSyncV1ATransferRequestProtocol,
			};
		},

		async created(): Promise<void>
		{
			const transferRequestProtocol: Contract = new this.$store.state.web3.eth.Contract(
				YieldSyncV1ATransferRequestProtocol as AbiItem[],
				this.transferRequestProtocol
			);

			this.vault.voteAgainstRequired = (
				await transferRequestProtocol.methods.yieldSyncV1Vault_yieldSyncV1VaultProperty(
					this.address
				).call()
			)[0];
			this.vault.voteForRequired = (
				await transferRequestProtocol.methods.yieldSyncV1Vault_yieldSyncV1VaultProperty(
					this.address
				).call()
			)[1];
			this.vault.transferDelaySeconds = (
				await transferRequestProtocol.methods.yieldSyncV1Vault_yieldSyncV1VaultProperty(
					this.address
				).call()
			)[2];
		},
	});
</script>
