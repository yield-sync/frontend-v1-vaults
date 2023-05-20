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
					@click="tab = 'admins-and-members'"
				>
					Admins & Members
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
					<VCol cols="4">
						<a
							:href="`https://${$store.state.etherscanDomainStart}.etherscan.io/address/${vaultAddress}`"
							target="_blank"
							rel="noopener noreferrer"
						>
							<h6 class="word-wrap">{{ vaultAddress }}</h6>
						</a>
					</VCol>

					<VCol cols="4">
						<h3 class="mb-3 text-center text-uppercase text-primary">V1 Vault</h3>
					</VCol>

					<VCol cols="4" class="text-right">
						<a
							:href="`https://${$store.state.etherscanDomainStart}.etherscan.io/address/${vaultAddress}`"
							target="_blank"
							rel="noopener noreferrer"
						>
							<VBtn variant="plain" size="sm"><h6>🔗 V1 Vault Contract</h6></VBtn>
						</a>
					</VCol>

					<VCol cols="4" class="text-right"/>
				</VRow>

				<CBalances v-if="tab == 'overview'" :address="vaultAddress" />
				<CAdmins v-if="tab == 'admins-and-members'" :address="vaultAddress" />
				<CMembers v-if="tab == 'admins-and-members'" :address="vaultAddress" />
				<CViewWithdrawalRequest v-if="tab == 'view-wr'" :vaultAddress="vaultAddress" />
				<CCreateWithdrawalRequest v-if="tab == 'create-wr'" :vaultAddress="vaultAddress" />
			</VContainer>
		</VCol>
	</VRow>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	import CBalances from "../components/CBalances.vue";
	import CAdmins from "../components/V1Vault/CAdmins.vue";
	import CMembers from "../components/V1Vault/CMembers.vue";
	import CViewWithdrawalRequest from "../components/V1Vault/CViewWithdrawalRequest.vue";
	import CCreateWithdrawalRequest from "../components/V1Vault/CCreateWithdrawalRequest.vue";

	export default defineComponent({
		name: "RVV1Vault",

		data()
		{
			return {
				tab: "overview",
				vaultAddress: this.$route.params.address as string
			};
		},

		components: {
			CBalances,
			CAdmins,
			CMembers,
			CViewWithdrawalRequest,
			CCreateWithdrawalRequest
		}
	});
</script>
