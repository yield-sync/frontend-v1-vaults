<template>
	<VContainer class="py-16">
		<div class="w-100 mx-auto" style="max-width: 1000px;">
			<VRow bg-color="primary" color="dark" fixed-tabs class="mb-3">
				<VCol cols="2" style="margin: 0; padding: 0;">
					<RouterLink :to="`/v1-vault/${vaultAddress}`">
						<VBtn
							:variant="$route.query.admin == 'true' ? 'outlined' : 'flat'"
							color="primary"
							class="w-100 mb-3 rounded-s-xl elevation-0 border-primary"
							style="border-top-right-radius: 0px !important; border-bottom-right-radius: 0px !important;"
						>
							👤 Member
						</VBtn>
					</RouterLink>
				</VCol>

				<VCol cols="2" style="margin: 0; padding: 0;">
					<RouterLink :to="`/v1-vault/${vaultAddress}?admin=true`">
						<VBtn
							:variant="$route.query.admin !== 'true' ? 'outlined' : 'flat'"
							color="primary"
							class="w-100 mb-3 rounded-e-xl rounded-e-none elevation-0 border-primary"
							style="border-top-left-radius: 0px !important; border-bottom-left-radius: 0px !important;"
						>
							🔑 Admin
						</VBtn>
					</RouterLink>
				</VCol>

				<VCol cols="4">
					<h3 class="mb-3 text-center text-uppercase text-primary">V1 Vault</h3>
				</VCol>

				<VCol cols="4" class="text-right">
					<a
						:href="`https://${$store.state.etherscanDomainStart}.etherscan.io/address/${vaultAddress}`"
						target="_blank" rel="noopener noreferrer"
					>
						<VBtn color="light" variant="tonal" class="rounded-xl">
							🔗 Etherscan
						</VBtn>
					</a>
				</VCol>

				<VCol cols="3">
					<VBtn
						:class="
							$store.state.pages.RVV1Vault.tab == 'overview' ?
								'bg-primary text-white' : 'bg-light-frost text-primary'
						"
						class="w-100 mb-3 rounded-xl elevation-0 font-weight-bold"
						@click="$store.state.pages.RVV1Vault.tab = 'overview'"
					>
						📊 Overview
					</VBtn>
				</VCol>

				<VCol cols="3">
					<VBtn
						:class="
							$store.state.pages.RVV1Vault.tab == 'admins-and-members' ?
								'bg-primary text-white' : 'bg-light-frost text-primary'
						"
						class="w-100 mb-3 rounded-xl elevation-0 font-weight-bold"
						@click="$store.state.pages.RVV1Vault.tab = 'admins-and-members'"
					>
						👥 Members & Admins
					</VBtn>
				</VCol>

				<VCol cols="3">
					<VBtn
						:class="
							$store.state.pages.RVV1Vault.tab == 'wr' ?
								'bg-primary text-white' : 'bg-light-frost text-primary'
						"
						class="w-100 mb-3 rounded-xl elevation-0 font-weight-bold"
						@click="$store.state.pages.RVV1Vault.tab = 'wr'"
					>
						💸 Withdrawal Req.
					</VBtn>
				</VCol>

				<VCol cols="3">
					<VBtn
						:class="
							$store.state.pages.RVV1Vault.tab == 'settings' ?
								'bg-primary text-white' : 'bg-light-frost text-primary'
						"
						class="w-100 mb-3 rounded-xl elevation-0 font-weight-bold"
						@click="$store.state.pages.RVV1Vault.tab = 'settings'"
					>
						⚙️ Settings
					</VBtn>
				</VCol>
			</VRow>

			<COverview
				v-if="$store.state.pages.RVV1Vault.tab == 'overview'"
				:address="vaultAddress"
				:asAdmin="$route.query.admin == 'true'"
			/>
			<CMembers
				v-if="$store.state.pages.RVV1Vault.tab == 'admins-and-members'"
				:v1VaultAddress="vaultAddress"
				:asAdmin="$route.query.admin == 'true'"
			/>

			<CAdmins
				v-if="$store.state.pages.RVV1Vault.tab == 'admins-and-members'"
				:v1VaultAddress="vaultAddress"
				:asAdmin="$route.query.admin == 'true'"
			/>

			<CWithdrawalRequest
				v-if="$store.state.pages.RVV1Vault.tab == 'wr'"
				:vaultAddress="vaultAddress"
				:asAdmin="$route.query.admin == 'true'"
			/>

			<CSettings
				v-if="$store.state.pages.RVV1Vault.tab == 'settings'"
				:vaultAddress="vaultAddress"
				:asAdmin="$route.query.admin == 'true'"
			/>
		</div>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	import COverview from "../components/V1Vault/COverview.vue";
	import CAdmins from "../components/V1Vault/CAdmins.vue";
	import CMembers from "../components/V1Vault/CMembers.vue";
	import CWithdrawalRequest from "../components/V1Vault/CWithdrawalRequest.vue";
	import CSettings from "../components/V1Vault/CSettings.vue";

	export default defineComponent({
		name: "RVV1Vault",

		data()
		{
			return {
				asAdmin: false as boolean,
				vaultAddress: this.$route.params.address as string,
			};
		},

		components: {
			COverview,
			CAdmins,
			CMembers,
			CWithdrawalRequest,
			CSettings,
		},

		async created()
		{
			if (this.$route.query.admin == "true")
			{
				this.asAdmin = true;
			}
		},
	});
</script>
