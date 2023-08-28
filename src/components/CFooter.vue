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
						:href="`https://${etherscan}.etherscan.io/address/${factory}`"
						target="_blank"
						rel="noopener noreferrer"
					>
						<VBtn
							variant="plain"
							color="light"
							class="w-100 mb-4 rounded-xl elevation-0 text-primary font-weight-bold"
						>
							🔗 Vault Factory
						</VBtn>
					</a>

					<a
						:href="`https://${etherscan}.etherscan.io/address/${registry}`"
						target="_blank"
						rel="noopener noreferrer"
					>
						<VBtn
							variant="plain"
							color="light"
							class="w-100 mb-4 rounded-xl elevation-0 text-primary font-weight-bold"
						>
							🔗 Registry
						</VBtn>
					</a>

					<a
						:href="`https://${etherscan}.etherscan.io/address/${transferRequestProtocol}`"
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
				etherscan: this.$store.state.etherscanDomainStart,

				factory: this.$store.state.config.networkChain[
					this.$store.state.currentChain.name
				].yieldSyncV1VaultFactory,

				registry: this.$store.state.config.networkChain[
					this.$store.state.currentChain.name
				].yieldSyncV1VaultRegistry,

				transferRequestProtocol: this.$store.state.config.networkChain[
					this.$store.state.currentChain.name
				].yieldSyncV1ATransferRequestProtocol,
			};
		},
	});
</script>
