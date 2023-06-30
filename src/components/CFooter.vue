<template>
	<VSheet class="py-6 bg-gradient-dark" style="height: 600px;">
		<VContainer>
			<VRow>
				<VCol
					cols="12"
					sm="6"
					class="text-center"
				>
					<RouterLink to="/governance" class="mr-2 text-decoration-none text-dark">
						<VBtn variant="plain" color="light" class="w-100 mb-3">
							Governance
						</VBtn>
					</RouterLink>
				</VCol>

				<VCol
					cols="12"
					sm="6"
					class="text-center"
				>
					<a
						:href="`https://${etherscanDomainStart}.etherscan.io/address/${accessControl}`"
						target="_blank"
						rel="noopener noreferrer"
					>
						<VBtn variant="plain" color="light" class="w-100 mb-3">🔗 Access Control Contract</VBtn>
					</a>
				</VCol>
			</VRow>
		</VContainer>

	</VSheet>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		name: "CFooter",
		data()
		{
			return {
				etherscanDomainStart: this.$store.state.etherscanDomainStart,
				accessControl: this.$store.state.config.address[
					this.$store.state.chainName
				].yieldSyncV1VaultAccessControl
			};
		},
	});
</script>
