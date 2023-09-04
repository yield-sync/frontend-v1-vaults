<template>
	<VCard class="mb-6 rounded-xl elevation-0 bg-light-frost">
		<VCardTitle class="text-primary">
			<VRow>
				<VCol cols="12" class="text-center">
					<h4 class="text-center text-uppercase">🏦 TRP B Overview</h4>
				</VCol>
			</VRow>
		</VCardTitle>

		<VCardText class="mt-4">
			<VRow>
				<!-- For Vote -->
				<VCol cols="12" sm="3" class="text-center">
					<VCard class="px-3 py-3 rounded-xl elevation-0 bg-light-frost">
						<h4 class="mb-3 text-primary">✅ For Vote Req.</h4>

						<VProgressCircular
							v-if="this.vault.voteForRequired == 0"
							indeterminate
							color="light"
							class=""
						/>

						<h2 v-else class="m-0">{{ this.vault.voteForRequired }}</h2>
					</VCard>
				</VCol>

				<VCol cols="12" sm="3" class="text-center">
					<VCard class="px-3 py-3 rounded-xl elevation-0 bg-light-frost">
						<h4 class="mb-3 text-primary">❌ Against Req.</h4>

						<VProgressCircular
							v-if="this.vault.voteForRequired == 0"
							indeterminate
							color="light"
							class=""
						/>

						<h2 v-else class="m-0">{{ this.vault.voteAgainstRequired }}</h2>
					</VCard>
				</VCol>

				<!-- For Vote -->
				<VCol cols="12" sm="3" class="text-center">
					<VCard class="px-3 py-3 rounded-xl elevation-0 bg-light-frost">
						<h4 class="mb-3 text-primary">⏳ Min Vote Period</h4>

						<VProgressCircular
							v-if="this.vault.minVotePeriodSeconds == -1"
							indeterminate
							color="light"
							class=""
						/>

						<h2 v-else class="m-0">{{ this.vault.minVotePeriodSeconds }} Sec.</h2>
					</VCard>
				</VCol>

				<VCol cols="12" sm="3" class="text-center">
					<VCard class="px-3 py-3 rounded-xl elevation-0 bg-light-frost">
						<h4 class="mb-3 text-primary">⌛ Max Vote Period</h4>

						<VProgressCircular
							v-if="this.vault.maxVotePeriodSeconds == -1"
							indeterminate
							color="light"
							class=""
						/>

						<h2 v-else class="m-0">{{ this.vault.maxVotePeriodSeconds }} Sec.</h2>
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

	import YieldSyncV1BTransferRequestProtocol from "../../../abi/YieldSyncV1BTransferRequestProtocol";

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
					minVotePeriodSeconds: -1 as number,
					maxVotePeriodSeconds: -1 as number,
				},
				error: "" as string,

				transferRequestProtocol: this.$store.state.config.networkChain[
					this.$store.state.currentChain.name
				].yieldSyncV1BTransferRequestProtocol,
			};
		},

		async created(): Promise<void>
		{
			const transferRequestProtocol: Contract = new this.$store.state.web3.eth.Contract(
				YieldSyncV1BTransferRequestProtocol as AbiItem[],
				this.transferRequestProtocol
			);

			this.vault.voteAgainstRequired = (
				await transferRequestProtocol.methods.yieldSyncV1Vault_yieldSyncV1VaultProperty(
					this.address
				).call()
			).voteAgainstRequired;

			this.vault.voteForRequired = (
				await transferRequestProtocol.methods.yieldSyncV1Vault_yieldSyncV1VaultProperty(
					this.address
				).call()
			).voteForRequired;

			this.vault.maxVotePeriodSeconds = (
				await transferRequestProtocol.methods.yieldSyncV1Vault_yieldSyncV1VaultProperty(
					this.address
				).call()
			).maxVotePeriodSeconds;

			this.vault.minVotePeriodSeconds = (
				await transferRequestProtocol.methods.yieldSyncV1Vault_yieldSyncV1VaultProperty(
					this.address
				).call()
			).minVotePeriodSeconds;
		},
	});
</script>
