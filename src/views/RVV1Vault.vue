<template>
	<VRow>
		<VCol cols="3">
			<VContainer class="h-100">
				<h3 class="text-center mb-3 text-uppercase">{{ asAdmin ? 'Admin' : 'Member' }}</h3>

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
					@click="tab = 'wr'"
				>
					Withdrawal Request
				</VBtn>

				<VBtn
					v-if="!asAdmin"
					color="dark"
					variant="tonal"
					class="w-100 mb-3 no-box-shadow"
					@click="tab = 'vote-wr'"
				>
					Vote on Withdrawal Request
				</VBtn>

				<VBtn
					v-if="!asAdmin"
					color="dark"
					variant="tonal"
					class="w-100 mb-3 no-box-shadow"
					@click="tab = 'settings'"
				>
					Settings
				</VBtn>
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

				<CBalances v-if="tab == 'overview'" :address="vaultAddress" />
				<CMembers v-if="tab == 'admins-and-members'" :v1VaultAddress="vaultAddress" :asAdmin="asAdmin"  />
				<CAdmins v-if="tab == 'admins-and-members'" :v1VaultAddress="vaultAddress" :asAdmin="asAdmin" />

				<VCard v-if="tab == 'wr'">
					<VTabs
						v-model="wrtab"
						bg-color="primary"
						color="light-green-lighten-5"
						fixed-tabs
					>
						<VTab value="o">Open WithdrawalRequests</VTab>
						<VTab v-if="!asAdmin" value="c">Create WithdrawalRequest</VTab>
					</VTabs>

					<VCardText variant="light">
						<VWindow v-model="wrtab">
							<VWindowItem value="o">
								<CViewWithdrawalRequest :vaultAddress="vaultAddress" :asAdmin="asAdmin" />
							</VWindowItem>

							<VWindowItem value="c">
								<CCreateWithdrawalRequest :vaultAddress="vaultAddress" :asAdmin="asAdmin"  />
							</VWindowItem>
						</VWindow>
					</VCardText>
				</VCard>

				<CSettings v-if="tab == 'settings'" :vaultAddress="vaultAddress" :asAdmin="asAdmin" />
			</VContainer>
		</VCol>
	</VRow>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { AbiItem } from "web3-utils";

	import YieldSyncV1Vault from "../abi/YieldSyncV1Vault";
	import CBalances from "../components/CBalances.vue";
	import CAdmins from "../components/V1Vault/CAdmins.vue";
	import CMembers from "../components/V1Vault/CMembers.vue";
	import CViewWithdrawalRequest from "../components/V1Vault/CViewWithdrawalRequest.vue";
	import CCreateWithdrawalRequest from "../components/V1Vault/CCreateWithdrawalRequest.vue";
	import CSettings from "../components/V1Vault/CSettings.vue";

	export default defineComponent({
		name: "RVV1Vault",

		data()
		{
			return {
				wrtab: "o",
				asAdmin: false,
				tab: "overview",
				vaultAddress: this.$route.params.address as string,
				vault: {
					againstVoteCountRequired: 0,
					forVoteCountRequired: 0,
					withdrawalDelaySeconds: 0,
				}
			};
		},

		components: {
			CBalances,
			CAdmins,
			CMembers,
			CViewWithdrawalRequest,
			CCreateWithdrawalRequest,
			CSettings,
		},

		async created()
		{
			console.log(typeof this.$route.query.admin);

			if (this.$route.query.admin && this.$route.query.admin == "true")
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
