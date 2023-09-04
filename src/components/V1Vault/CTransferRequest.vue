<template>
	<VCard
		:key="this.$store.state.pages.RVV1Vault.transferRequests.key"
		class="mb-6 rounded-xl elevation-0 bg-light-frost"
	>
		<VCardTitle class="text-primary">
			<h4 class="text-center text-uppercase">↗️ Transfer Requests ({{ this.trpType }})</h4>
		</VCardTitle>

		<VTabs
			v-model="this.$store.state.pages.RVV1Vault.transferRequests.tab"

			color="primary"
			fixed-tabs
		>
			<VTab value="o" class="font-weight-bold">Open Transfer Requests</VTab>

			<VTab v-if="!this.asAdmin" value="c" class="font-weight-bold">Create Transfer Request</VTab>
		</VTabs>

		<VCardText variant="light">
			<VWindow v-model="this.$store.state.pages.RVV1Vault.transferRequests.tab">
				<VWindowItem value="o">
					<CTransferRequestAOpen
						v-if="this.trpType == 'a'"
						:vaultAddress="this.vaultAddress"
						:asAdmin="this.asAdmin"
					/>

					<CTransferRequestBOpen
						v-else-if="this.trpType == 'b'"
						:vaultAddress="this.vaultAddress"
						:asAdmin="this.asAdmin"
					/>

					<div v-else>
						<h5 class="text-center">Unsupported Transfer Request Protocol</h5>
					</div>
				</VWindowItem>

				<VWindowItem value="c">
					<CTransferRequestACreate
						v-if="this.trpType == 'a'"
						:vaultAddress="this.vaultAddress"
					/>

					<CTransferRequestBCreate
						v-else-if="this.trpType == 'b'"
						:vaultAddress="this.vaultAddress"
					/>

					<div v-else>
						<h5 class="text-center">Unsupported Transfer Request Protocol</h5>
					</div>
				</VWindowItem>
			</VWindow>
		</VCardText>
	</VCard>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	import CTransferRequestACreate from "./CTransferRequestProtocolA/CCreate.vue";
	import CTransferRequestAOpen from "./CTransferRequestProtocolA/COpen.vue";
	import CTransferRequestBCreate from "./CTransferRequestProtocolB/CCreate.vue";
	import CTransferRequestBOpen from "./CTransferRequestProtocolB/COpen.vue";

	export default defineComponent({
		name: "CTransferRequest",

		props: {
			asAdmin: {
				type: Boolean,
				required: true,
			},

			vaultAddress: {
				type: String,
				required: true,
			},

			trpType: {
				type: String,
			},
		},

		components: {
			CTransferRequestACreate,
			CTransferRequestAOpen,
			CTransferRequestBCreate,
			CTransferRequestBOpen,
		},
	});
</script>
