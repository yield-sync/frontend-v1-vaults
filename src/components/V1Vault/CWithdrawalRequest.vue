<template>
	<VCard
		:key="$store.state.pages.RVV1Vault.withdrawalRequest.key"
		class="mb-6 rounded-xl elevation-0 bg-light-frost"
	>
		<VCardTitle class="bg-primary text-light">
			<h4 class="text-center text-uppercase">Transfer Requests</h4>
		</VCardTitle>

		<VTabs
			v-model="$store.state.pages.RVV1Vault.withdrawalRequest.tab"
			bg-color="primary"
			color="light-green-lighten-5"
			fixed-tabs
		>
			<VTab value="o">Open Transfer Requests</VTab>
			<VTab v-if="$route.query.admin !== 'true'" value="c">Create Transfer Request</VTab>
		</VTabs>

		<VCardText variant="light">
			<VWindow v-model="$store.state.pages.RVV1Vault.withdrawalRequest.tab">
				<VWindowItem value="o">
					<COpenWithdrawalRequest
						:vaultAddress="vaultAddress"
						:asAdmin="$route.query.admin == 'true'"
					/>
				</VWindowItem>

				<VWindowItem value="c">
					<CCreateWithdrawalRequest
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

	import CCreateWithdrawalRequest from "./CCreateWithdrawalRequest.vue";
	import COpenWithdrawalRequest from "./COpenWithdrawalRequest.vue";

	export default defineComponent({
		name: "CWithdrawalRequest",

		props: {
			vaultAddress: {
				required: true,
				type: String
			}
		},

		components: {
			CCreateWithdrawalRequest,
			COpenWithdrawalRequest
		},
	});
</script>
