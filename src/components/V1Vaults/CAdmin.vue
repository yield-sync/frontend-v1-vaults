<template>
	<VContainer>
		<VCard color="light" class="mb-3 px-6 py-6">
			<VRow>
				<VCol cols="4" />

				<VCol cols="4">
					<h3 class="mb-3 text-center text-uppercase text-primary">Admin of V1 Vault</h3>
				</VCol>

				<VCol cols="4" class="text-right">
					<a
						:href="`https://${etherscanDomainStart}.etherscan.io/address/${accessControl}#readContract`"
						target="_blank"
						rel="noopener noreferrer"
					>
						<VBtn variant="plain" size="sm"><h6>🔗 Access Control Contract</h6></VBtn>
					</a>
				</VCol>
			</VRow>

			<CVaultBreakdown :v1Vaults="$store.state.adminshipYieldSyncV1VaultVaults" />
		</VCard>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	import CVaultBreakdown from "./CVaultBreakdown.vue";

	export default defineComponent({
		name: "RVGovernance",

		data()
		{
			return {
				accessControl: "",
				etherscanDomainStart: this.$store.state.etherscanDomainStart
			};
		},

		components: {
			CVaultBreakdown
		},

		async created()
		{
			await this.$store.dispatch("generateAdminshipVaults");
		},
	});
</script>
