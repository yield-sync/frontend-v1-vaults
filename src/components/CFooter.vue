<template>
	<VSheet color="dark" class="py-6" style="height: 600px;">
		<VContainer>
			<VRow>
				<VCol
					cols="12"
					sm="6"
					md="4"
					class="text-center"
				>
					<RouterLink to="/governance" class="mr-2 text-decoration-none text-dark">
						<VBtn variant="plain" color="light" class="w-100">
							Governance
						</VBtn>
					</RouterLink>
				</VCol>

				<VCol
					cols="12"
					sm="6"
					md="4"
					class="text-center"
				>
					<RouterLink
						:to="`/balances/${$store.state.wallet.accounts[0]}`"
						class="mr-2 text-decoration-none"
					>
						<VBtn variant="plain" color="light" class="w-100">
							Balances
						</VBtn>
					</RouterLink>

					<RouterLink
						to="/sign-message"
						class="mr-2 text-decoration-none"
					>
						<VBtn variant="plain" color="light" class="w-100">
							Sign Message
						</VBtn>
					</RouterLink>
				</VCol>

				<VCol
					cols="12"
					sm="6"
					md="4"
					class="text-center"
				>
					<a
						:href="`https://${etherscanDomainStart}.etherscan.io/address/${accessControl}`"
						target="_blank"
						rel="noopener noreferrer"
					>
						<VBtn variant="plain" color="light" class="w-100">🔗 Access Control Contract</VBtn>
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
				].yieldSyncV1VaultAccessControl,
			};
		},
	});
</script>
