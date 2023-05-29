<template>
	<VRow>
		<VCol cols="3">
			<VContainer class="h-100">
				<h2 class="mb-3 text-uppercase">{{ $route.query.admin == "true" ? 'Admin' : 'Member' }}</h2>

				<VBtn
					color="dark"
					variant="tonal"
					class="w-100 mb-3 no-box-shadow"
					@click="$store.state.pages.RVV1Vault.tab = 'overview'"
				>
					V1 Vault Overview
				</VBtn>

				<VBtn
					color="dark"
					variant="tonal"
					class="w-100 mb-3 no-box-shadow"
					@click="$store.state.pages.RVV1Vault.tab = 'admins-and-members'"
				>
					Admins & Members
				</VBtn>

				<VBtn
					color="dark"
					variant="tonal"
					class="w-100 mb-3 no-box-shadow"
					@click="$store.state.pages.RVV1Vault.tab = 'wr'"
				>
					Withdrawal Request
				</VBtn>

				<VBtn
					v-if="$route.query.admin !== 'true'"
					color="dark"
					variant="tonal"
					class="w-100 mb-3 no-box-shadow"
					@click="$store.state.pages.RVV1Vault.tab = 'settings'"
				>
					Settings
				</VBtn>

				<RouterLink v-if="$route.query.admin !== 'true'" :to="`/v1-vault/${vaultAddress}?admin=true`">
					<VBtn

						color="primary"
						variant="outlined"
						class="w-100 mb-3 no-box-shadow"
					>
						Switch as Admin
					</VBtn>
				</RouterLink>

				<RouterLink v-else :to="`/v1-vault/${vaultAddress}`">
					<VBtn
						color="primary"
						variant="outlined"
						class="w-100 mb-3 no-box-shadow"
					>
						Switch as Member
					</VBtn>
				</RouterLink>
			</VContainer>
		</VCol>

		<VCol cols="9">
			<VContainer>
				<VRow>
					<VCol cols="4">
						<h6>Against Vote Count Required: {{ vault.againstVoteCountRequired }}</h6>
						<h6>For Vote Count Required: {{ vault.forVoteCountRequired }}</h6>
						<h6>Withdrawal Delay Seconds: {{ vault.withdrawalDelaySeconds }}</h6>
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
							<h6 class="word-wrap">{{ vaultAddress }}</h6>
						</a>
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

				<COverview v-if="$store.state.pages.RVV1Vault.tab == 'overview'" :address="vaultAddress" />
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

				<VCard v-if="$store.state.pages.RVV1Vault.tab == 'wr'">
					<VTabs
						v-model="$store.state.pages.RVV1Vault.wrTab"
						bg-color="primary"
						color="light-green-lighten-5"
						fixed-tabs
					>
						<VTab value="o">Open WithdrawalRequests</VTab>
						<VTab v-if="$route.query.admin !== 'true'" value="c">Create WithdrawalRequest</VTab>
					</VTabs>

					<VCardText variant="light">
						<VWindow v-model="$store.state.pages.RVV1Vault.wrTab">
							<VWindowItem value="o">
								<CWithdrawalRequest
									:key="$store.state.pages.RVV1Vault.withdrawalRequestKey"
									:vaultAddress="vaultAddress"
									:asAdmin="$route.query.admin == 'true'"
								/>
							</VWindowItem>

							<VWindowItem value="c">
								<CCreateWithdrawalRequest
									:vaultAddress="vaultAddress"
									:asAdmin="$route.query.admin == 'true'"
								/>
							</VWindowItem>
						</VWindow>
					</VCardText>
				</VCard>

				<CSettings
					v-if="$store.state.pages.RVV1Vault.tab == 'settings'"
					:vaultAddress="vaultAddress"
					:asAdmin="$route.query.admin == 'true'"
				/>
			</VContainer>
		</VCol>
	</VRow>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { AbiItem } from "web3-utils";

	import YieldSyncV1Vault from "../abi/YieldSyncV1Vault";
	import COverview from "../components/V1Vault/COverview.vue";
	import CAdmins from "../components/V1Vault/CAdmins.vue";
	import CMembers from "../components/V1Vault/CMembers.vue";
	import CWithdrawalRequest from "../components/V1Vault/CWithdrawalRequest.vue";
	import CCreateWithdrawalRequest from "../components/V1Vault/CCreateWithdrawalRequest.vue";
	import CSettings from "../components/V1Vault/CSettings.vue";

	export default defineComponent({
		name: "RVV1Vault",

		data()
		{
			return {
				asAdmin: false,
				vaultAddress: this.$route.params.address as string,
				vault: {
					againstVoteCountRequired: 0,
					forVoteCountRequired: 0,
					withdrawalDelaySeconds: 0,
				}
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

		async created()
		{
			if (this.$route.query.admin == "true")
			{
				this.asAdmin = true;
			}

			const yieldSyncV1Vault = new this.$store.state.web3.eth.Contract(
				YieldSyncV1Vault as AbiItem[],
				this.vaultAddress
			);

			this.vault.againstVoteCountRequired = await yieldSyncV1Vault.methods.againstVoteCountRequired().call();
			this.vault.forVoteCountRequired = await yieldSyncV1Vault.methods.forVoteCountRequired().call();
			this.vault.withdrawalDelaySeconds = await yieldSyncV1Vault.methods.withdrawalDelaySeconds().call();
		},
	});
</script>
