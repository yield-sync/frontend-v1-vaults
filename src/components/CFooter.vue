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
						<VBtn
							variant="plain"
							color="light"
							class="w-100 mb-4 rounded-xl elevation-0 text-primary font-weight-bold"
						>
							👥 Governance
						</VBtn>
					</RouterLink>
				</VCol>

				<VCol
					cols="12"
					sm="6"
					class="text-center"
				>
					<a
						:href="`https://${etherscanDomainStart}.etherscan.io/address/${factory}`"
						target="_blank"
						rel="noopener noreferrer"
					>
						<VBtn
							variant="plain"
							color="light"
							class="w-100 mb-4 rounded-xl elevation-0 text-primary font-weight-bold"
						>
							🔗 Yield Sync V1 Vault Factory
						</VBtn>
					</a>

					<a
						:href="`https://${etherscanDomainStart}.etherscan.io/address/${accessControl}`"
						target="_blank"
						rel="noopener noreferrer"
					>
						<VBtn
							variant="plain"
							color="light"
							class="w-100 mb-4 rounded-xl elevation-0 text-primary font-weight-bold"
						>
							🔗 Access Control Contract
						</VBtn>
					</a>

					<a
						:href="`https://${$store.state.etherscanDomainStart}.etherscan.io/address/${transferRequestProtocol}`"
						target="_blank"
						rel="noopener noreferrer"
					>
						<VBtn
							variant="plain"
							color="light"
							class="w-100 mb-4 rounded-xl elevation-0 text-primary font-weight-bold"
						>
							🔗 Transfer Request Protocol
						</VBtn>
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

				factory: this.$store.state.config.address[
					this.$store.state.chainName
				].yieldSyncV1VaultFactory,

				accessControl: this.$store.state.config.address[
					this.$store.state.chainName
				].yieldSyncV1VaultAccessControl,

				transferRequestProtocol: this.$store.state.config.address[
					this.$store.state.chainName
				].yieldSyncV1ATransferRequestProtocol,
			};
		},
	});
</script>
