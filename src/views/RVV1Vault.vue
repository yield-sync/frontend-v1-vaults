<template>
	<VRow>
		<VCol cols="3" class="bg-light">
			<VContainer>
				<VBtn
					color="dark"
					variant="tonal"
					class="w-100 mb-3 no-box-shadow"
					@click="tab = 'overview'"
				>
					V1 Vault Overview
				</VBtn>

				<VBtn
					color="dark"
					variant="tonal"
					class="w-100 mb-3 no-box-shadow"
					@click="tab = 'view-wr'"
				>
					View Withdrawal Request
				</VBtn>

				<VBtn
					color="dark"
					variant="tonal"
					class="w-100 mb-3 no-box-shadow"
					@click="tab = 'create-wr'"
				>
					Create Withdrawal Request
				</VBtn>

				<VBtn
					color="dark"
					variant="tonal"
					class="w-100 mb-3 no-box-shadow"
					@click="tab = 'vote-wr'"
				>
					Vote on Withdrawal Request
				</VBtn>
			</VContainer>
		</VCol>

		<VCol cols="9" class="bg-white">
			<VContainer>
				<VRow>
					<VCol cols="4" />

					<VCol cols="4">
						<h3 class="mb-3 text-center text-uppercase text-primary">V1 Vault</h3>
					</VCol>

					<VCol cols="4" class="text-right">
						<a
							:href="`https://${$store.state.etherscanDomainStart}.etherscan.io/address/${v1VaultAddress}`"
							target="_blank"
							rel="noopener noreferrer"
						>
							<VBtn variant="plain" size="sm"><h6>🔗 V1 Vault Contract</h6></VBtn>
						</a>
					</VCol>
				</VRow>

				<CBalances v-if="tab == 'overview'" :address="v1VaultAddress" />

				<CViewWithdrawalRequest v-if="tab == 'view-wr'" :v1VaultAddress="v1VaultAddress" />
			</VContainer>
		</VCol>
	</VRow>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	import CBalances from "../components/CBalances.vue";
	import CViewWithdrawalRequest from "../components/V1Vault/CViewWithdrawalRequest.vue";

	export default defineComponent({
		name: "RVV1Vault",

		data()
		{
			return {
				tab: "overview",
				v1VaultAddress: this.$route.params.address as string
			};
		},

		components: {
			CBalances,
			CViewWithdrawalRequest
		}
	});
</script>
