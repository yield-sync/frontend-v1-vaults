<template>
	<VContainer class="py-16">
		<div class="w-100 mx-auto" style="max-width: 1000px;">
			<VRow bg-color="primary" color="dark" fixed-tabs class="mb-3">
				<VCol cols="2" style="margin: 0; padding: 0;">
					<RouterLink :to="`/v1-vault/${vaultAddress}?admin=true`">
						<VBtn
							:variant="$route.query.admin !== 'true' ? 'outlined' : 'flat'"
							:color="'primary'"
							size="sm"
							class="w-100 mb-3 rounded-s-xl elevation-0 border-primary"
						>
							Admin
						</VBtn>
					</RouterLink>
				</VCol>

				<VCol cols="2" style="margin: 0; padding: 0;">
					<RouterLink :to="`/v1-vault/${vaultAddress}`">
						<VBtn
							:variant="$route.query.admin == 'true' ? 'outlined' : 'flat'"
							color="primary"
							size="sm"
							class="w-100 mb-3 rounded-e-xl elevation-0 border-primary"
						>
							Member
						</VBtn>
					</RouterLink>
				</VCol>

				<VCol cols="4">
					<h3 class="mb-3 text-center text-uppercase text-primary">V1 Vault</h3>
				</VCol>

				<VCol cols="4" class="text-right">
					<a :href="`https://${$store.state.etherscanDomainStart}.etherscan.io/address/${vaultAddress}`"
						target="_blank" rel="noopener noreferrer">
						<VBtn variant="tonal">
							<h6>🔗 Etherscan</h6>
						</VBtn>
					</a>
				</VCol>

				<VCol :cols="$route.query.admin == 'true' ? 4 : 3">
					<VBtn
						:color="$store.state.pages.RVV1Vault.tab == 'overview' ? 'primary text-white' : 'white text-primary'"
						class="w-100 mb-3 rounded-xl elevation-0" @click="$store.state.pages.RVV1Vault.tab = 'overview'">
						Overview
					</VBtn>
				</VCol>

				<VCol :cols="$route.query.admin == 'true' ? 4 : 3">
					<VBtn :color="$store.state.pages.RVV1Vault.tab == 'admins-and-members' ?
							'primary text-white' : 'white text-primary'
						" class="w-100 mb-3 rounded-xl elevation-0" @click="$store.state.pages.RVV1Vault.tab = 'admins-and-members'">
						Admins & Members
					</VBtn>
				</VCol>

				<VCol :cols="$route.query.admin == 'true' ? 4 : 3">
					<VBtn :color="$store.state.pages.RVV1Vault.tab == 'wr' ? 'primary text-white' : 'white text-primary'"
						class="w-100 mb-3 rounded-xl elevation-0" @click="$store.state.pages.RVV1Vault.tab = 'wr'">
						Withdrawal Req.
					</VBtn>
				</VCol>

				<VCol v-if="$route.query.admin !== 'true'" cols="3">
					<VBtn
						:color="$store.state.pages.RVV1Vault.tab == 'settings' ? 'primary text-white' : 'white text-primary'"
						class="w-100 mb-3 rounded-xl elevation-0" @click="$store.state.pages.RVV1Vault.tab = 'settings'">
						Settings
					</VBtn>
				</VCol>
			</VRow>

			<COverview v-if="$store.state.pages.RVV1Vault.tab == 'overview'" :address="vaultAddress" />
			<CMembers v-if="$store.state.pages.RVV1Vault.tab == 'admins-and-members'" :v1VaultAddress="vaultAddress"
				:asAdmin="$route.query.admin == 'true'" />
			<CAdmins v-if="$store.state.pages.RVV1Vault.tab == 'admins-and-members'" :v1VaultAddress="vaultAddress"
				:asAdmin="$route.query.admin == 'true'" />

			<VCard v-if="$store.state.pages.RVV1Vault.tab == 'wr'">
				<VTabs v-model="$store.state.pages.RVV1Vault.wrTab" bg-color="primary" color="light-green-lighten-5"
					fixed-tabs>
					<VTab value="o">Open WithdrawalRequests</VTab>
					<VTab v-if="$route.query.admin !== 'true'" value="c">Create WithdrawalRequest</VTab>
				</VTabs>

				<VCardText variant="light">
					<VWindow v-model="$store.state.pages.RVV1Vault.wrTab">
						<VWindowItem value="o">
							<CWithdrawalRequest :key="$store.state.pages.RVV1Vault.withdrawalRequestKey"
								:vaultAddress="vaultAddress" :asAdmin="$route.query.admin == 'true'" />
						</VWindowItem>

						<VWindowItem value="c">
							<CCreateWithdrawalRequest :vaultAddress="vaultAddress"
								:asAdmin="$route.query.admin == 'true'" />
						</VWindowItem>
					</VWindow>
				</VCardText>
			</VCard>

			<CSettings v-if="$store.state.pages.RVV1Vault.tab == 'settings'" :vaultAddress="vaultAddress"
				:asAdmin="$route.query.admin == 'true'" />
		</div>
	</VContainer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import COverview from "../components/V1Vault/COverview.vue";
import CAdmins from "../components/V1Vault/CAdmins.vue";
import CMembers from "../components/V1Vault/CMembers.vue";
import CWithdrawalRequest from "../components/V1Vault/CWithdrawalRequest.vue";
import CCreateWithdrawalRequest from "../components/V1Vault/CCreateWithdrawalRequest.vue";
import CSettings from "../components/V1Vault/CSettings.vue";

export default defineComponent({
	name: "RVV1Vault",

	data() {
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
		CCreateWithdrawalRequest,
		CSettings,
	},

	async created() {
		if (this.$route.query.admin == "true") {
			this.asAdmin = true;
		}
	},
});
</script>
