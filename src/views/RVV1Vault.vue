<template>
	<VContainer class="py-16">
		<div class="w-100 mx-auto" style="max-width: 900px;">
			<VRow bg-color="primary" color="dark" fixed-tabs class="mb-3">
				<VCol cols="12" sm="4">
					<a
						:href="`https://${$store.state.etherscanDomainStart}.etherscan.io/address/${vaultAddress}`"
						target="_blank" rel="noopener noreferrer"
					>
						<VBtn class="rounded-xl bg-light-frost elevation-0 text-primary font-weight-bold">
							🔗 Etherscan
						</VBtn>
					</a>
				</VCol>

				<VCol cols="12" sm="4">
					<VRow style="margin: 0; padding: 0;">
						<VCol cols="6" style="margin: 0; padding: 0;">
							<RouterLink :to="`/v1-vault/${vaultAddress}`">
								<VBtn
									:variant="$route.query.admin == 'true' ? 'outlined' : 'flat'"
									color="primary"
									class="w-100 mb-3 rounded-s-xl elevation-0 border-primary"
									style="
										border-top-right-radius: 0px !important;
										border-bottom-right-radius: 0px !important;
									"
								>
									👤 Member
								</VBtn>
							</RouterLink>
						</VCol>

						<VCol cols="6" style="margin: 0; padding: 0;">
							<RouterLink :to="`/v1-vault/${vaultAddress}?admin=true`">
								<VBtn
									:variant="$route.query.admin !== 'true' ? 'outlined' : 'flat'"
									color="primary"
									class="w-100 mb-3 rounded-e-xl rounded-e-none elevation-0 border-primary"
									style="
										border-top-left-radius: 0px !important;
										border-bottom-left-radius: 0px !important;
									"
								>
									🔑 Admin
								</VBtn>
							</RouterLink>
						</VCol>
					</VRow>
				</VCol>

				<VCol cols="12" sm="4" class="text-right">
					<VBtn
						class="rounded-xl bg-light-frost elevation-0 text-primary font-weight-bold"
						@click="copy(vaultAddress)"
					>
						📋 Copy Address
					</VBtn>
				</VCol>

				<VCol cols="12" sm="6" md="3">
					<VBtn
						:class="
							$store.state.pages.RVV1Vault.tab == 'overview' ?
								'bg-primary text-white' : 'bg-light-frost text-primary'
						"
						class="w-100 rounded-xl elevation-0 font-weight-bold"
						@click="$store.state.pages.RVV1Vault.tab = 'overview'"
					>
						📊 Overview
					</VBtn>
				</VCol>

				<VCol cols="12" sm="6" md="3">
					<VBtn
						:class="
							$store.state.pages.RVV1Vault.tab == 'admins-and-members' ?
								'bg-primary text-white' : 'bg-light-frost text-primary'
						"
						class="w-100 rounded-xl elevation-0 font-weight-bold"
						@click="$store.state.pages.RVV1Vault.tab = 'admins-and-members'"
					>
						👥 Admins & Members
					</VBtn>
				</VCol>

				<VCol cols="12" sm="6" md="3">
					<VBtn
						:class="
							$store.state.pages.RVV1Vault.tab == 'tr' ?
								'bg-primary text-white' : 'bg-light-frost text-primary'
						"
						class="w-100 rounded-xl elevation-0 font-weight-bold"
						@click="$store.state.pages.RVV1Vault.tab = 'tr'"
					>
						↗️ Transfer Req.
					</VBtn>
				</VCol>

				<VCol cols="12" sm="6" md="3">
					<VBtn
						:class="
							$store.state.pages.RVV1Vault.tab == 'settings' ?
								'bg-primary text-white' : 'bg-light-frost text-primary'
						"
						class="w-100 rounded-xl elevation-0 font-weight-bold"
						@click="$store.state.pages.RVV1Vault.tab = 'settings'"
					>
						⚙️ Settings
					</VBtn>
				</VCol>

				<VCol v-if="$store.state.pages.RVV1Vault.tab == 'overview'" cols="12">
					<COverview
						:address="vaultAddress"
						:asAdmin="$route.query.admin == 'true'"
					/>
				</VCol>

				<VCol v-if="$store.state.pages.RVV1Vault.tab == 'admins-and-members'" cols="12">
					<CMembersAndAdmins
						:vaultAddress="vaultAddress"
						:asAdmin="$route.query.admin == 'true'"
					/>
				</VCol>

				<VCol v-if="$store.state.pages.RVV1Vault.tab == 'tr'" cols="12">
					<CTransferRequest
						:vaultAddress="vaultAddress"
						:asAdmin="$route.query.admin == 'true'"
					/>
				</VCol>

				<VCol v-if="$store.state.pages.RVV1Vault.tab == 'settings'" cols="12">
					<CSettings
						:vaultAddress="vaultAddress"
						:asAdmin="$route.query.admin == 'true'"
					/>
				</VCol>
			</VRow>
		</div>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	import COverview from "../components/V1Vault/COverview.vue";
	import CMembersAndAdmins from "../components/V1Vault/CMembersAndAdmins.vue";
	import CTransferRequest from "../components/V1Vault/CTransferRequest.vue";
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
			CMembersAndAdmins,
			CTransferRequest,
			CSettings,
		},

		methods: {
			copy(a: string)
			{
				navigator.clipboard.writeText(a);
			},
		},

		async created()
		{
			if (this.$route.query.admin == "true")
			{
				this.asAdmin = true;
			}

			await this.$store.commit("setPagesRVV1VaultVaultAddress", this.vaultAddress);
			await this.$store.dispatch("getTokens");
			await this.$store.dispatch("getERC721Tokens");
		}
	});
</script>
