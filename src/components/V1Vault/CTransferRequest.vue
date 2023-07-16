<template>
	<VCard
		:key="$store.state.pages.RVV1Vault.transferRequests.key"
		class="mb-6 rounded-xl elevation-0 bg-light-frost"
	>
		<VCardTitle class="bg-primary text-light">
			<h4 class="text-center text-uppercase">↗️ Transfer Requests</h4>
		</VCardTitle>

		<VTabs
			v-model="$store.state.pages.RVV1Vault.transferRequests.tab"
			bg-color="primary"
			color="light-green-lighten-5"
			fixed-tabs
		>
			<VTab value="o">Open Transfer Requests</VTab>
			<VTab v-if="$route.query.admin !== 'true'" value="c">Create Transfer Request</VTab>
		</VTabs>

		<VCardText variant="light">
			<a
				:href="`https://${$store.state.etherscanDomainStart}.etherscan.io/address/${transferRequestProtocol}`"
				target="_blank"
				rel="noopener noreferrer"
			>
				<VBtn class="mb-4 rounded-xl bg-light-frost elevation-0 text-primary font-weight-bold">
					🔗 Transfer Request Protocol
				</VBtn>
			</a>

			<VWindow v-model="$store.state.pages.RVV1Vault.transferRequests.tab">
				<VWindowItem value="o">
					<CTransferRequestOpen
						:vaultAddress="vaultAddress"
						:asAdmin="$route.query.admin == 'true'"
					/>
				</VWindowItem>

				<VWindowItem value="c">
					<CTransferRequestCreate
						:vaultAddress="vaultAddress"
						:asAdmin="$route.query.admin == 'true'"
					/>
				</VWindowItem>
			</VWindow>
		</VCardText>
	</VCard>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	import CTransferRequestCreate from "./CTransferRequestCreate.vue";
	import CTransferRequestOpen from "./CTransferRequestOpen.vue";

	export default defineComponent({
		name: "CTransferRequest",

		props: {
			vaultAddress: {
				required: true,
				type: String
			}
		},

		data() {
			return {
				transferRequestProtocol: this.$store.state.config.address[
					this.$store.state.chainName
				].yieldSyncV1ATransferRequestProtocol,
			}
		},

		components: {
			CTransferRequestCreate,
			CTransferRequestOpen
		},
	});
</script>
