<template>
	<VContainer class="py-16">
		<div class="w-100 mx-auto" style="max-width: 900px;">
			<VRow bg-color="primary" color="dark" fixed-tabs class="mb-3">
				<VCol cols="12" sm="3">
					<a
						:href="
							`https://${this.$store.state.etherscanDomainStart}.etherscan.io/address/${this.vaultAddress}`
						"
						target="_blank" rel="noopener noreferrer"
					>
						<VBtn class="w-100 rounded-xl font-weight-bold elevation-0 bg-light-frost text-primary">
							🔗 Etherscan
						</VBtn>
					</a>
				</VCol>

				<VCol cols="12" sm="6">
					<VRow style="margin: 0; padding: 0;">
						<VCol cols="6" style="margin: 0; padding: 0;">
							<RouterLink :to="`/v1-vault/${this.vaultAddress}`">
								<VBtn
									variant="flat"
									:color="this.$route.query.admin == 'true' ? 'light-frost' :'primary'"
									class="w-100 mb-3 rounded-s-xl elevation-0 border-primary font-weight-bold"
									:class="this.$route.query.admin == 'true' ? 'text-primary' : 'text-white'"
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
							<RouterLink :to="`/v1-vault/${this.vaultAddress}?admin=true`">
								<VBtn
									variant="flat"
									:color="this.$route.query.admin == 'true' ? 'primary' : 'light-frost'"
									class="w-100 mb-3 rounded-e-xl elevation-0 border-primary font-weight-bold"
									:class="this.$route.query.admin == 'true' ? 'text-white' : 'text-primary'"
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

				<VCol cols="12" sm="3" class="text-right">
					<VBtn
						class="w-100 rounded-xl font-weight-bold elevation-0 bg-light-frost text-primary"
						@click="this.copy(this.vaultAddress)"
					>
						📋 Address
					</VBtn>
				</VCol>

				<VCol cols="12" sm="6" md="3">
					<VBtn
						:class="
							this.$store.state.pages.RVV1Vault.tab == 'overview' ?
								'bg-primary text-white' : 'bg-light-frost text-primary'
						"
						class="w-100 rounded-xl elevation-0 font-weight-bold"
						@click="this.$store.state.pages.RVV1Vault.tab = 'overview'"
					>
						📊 Overview
					</VBtn>
				</VCol>

				<VCol cols="12" sm="6" md="3">
					<VBtn
						:class="
							this.$store.state.pages.RVV1Vault.tab == 'admins-and-members' ?
								'bg-primary text-white' : 'bg-light-frost text-primary'
						"
						class="w-100 rounded-xl elevation-0 font-weight-bold"
						@click="this.$store.state.pages.RVV1Vault.tab = 'admins-and-members'"
					>
						🏛️ Admins & Members
					</VBtn>
				</VCol>

				<VCol cols="12" sm="6" md="3">
					<VBtn
						:class="
							this.$store.state.pages.RVV1Vault.tab == 'tr' ?
								'bg-primary text-white' : 'bg-light-frost text-primary'
						"
						class="w-100 rounded-xl elevation-0 font-weight-bold"
						@click="this.$store.state.pages.RVV1Vault.tab = 'tr'"
					>
						↗️ Transfer Req.
					</VBtn>
				</VCol>

				<VCol cols="12" sm="6" md="3">
					<VBtn
						:class="
							this.$store.state.pages.RVV1Vault.tab == 'settings' ?
								'bg-primary text-white' : 'bg-light-frost text-primary'
						"
						class="w-100 rounded-xl elevation-0 font-weight-bold"
						@click="this.$store.state.pages.RVV1Vault.tab = 'settings'"
					>
						⚙️ Settings
					</VBtn>
				</VCol>

				<VCol v-if="this.$store.state.pages.RVV1Vault.tab == 'overview'" cols="12">
					<COverview
						:address="this.vaultAddress"
						:asAdmin="this.$route.query.admin == 'true'"
					/>
				</VCol>

				<VCol v-if="this.$store.state.pages.RVV1Vault.tab == 'admins-and-members'" cols="12">
					<CMembersAndAdmins
						:vaultAddress="this.vaultAddress"
						:asAdmin="this.$route.query.admin == 'true'"
					/>
				</VCol>

				<VCol v-if="this.$store.state.pages.RVV1Vault.tab == 'tr'" cols="12">
					<CTransferRequest
						:vaultAddress="this.vaultAddress"
						:asAdmin="this.$route.query.admin == 'true'"
						:trpType="this.trpType(this.trpAddress)"
					/>
				</VCol>

				<VCol v-if="this.$store.state.pages.RVV1Vault.tab == 'settings'" cols="12">
					<CSettings
						:vaultAddress="this.vaultAddress"
						:asAdmin="this.$route.query.admin == 'true'"
						:trpType="this.trpType(this.trpAddress)"
					/>
				</VCol>
			</VRow>
		</div>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { Contract } from "web3-eth-contract";
	import { AbiItem } from "web3-utils";

	import YieldSyncV1Vault from "../abi/YieldSyncV1Vault";
	import COverview from "../components/V1Vault/COverview.vue";
	import CMembersAndAdmins from "../components/V1Vault/CMembersAndAdmins.vue";
	import CTransferRequest from "../components/V1Vault/CTransferRequest.vue";
	import CSettings from "../components/V1Vault/CSettings.vue";

	export default defineComponent({
		name: "RVV1Vault",

		data()
		{
			return {
				vaultAddress: this.$route.params.address as string,

				vault: undefined as Contract | undefined,

				asAdmin: false as boolean,

				trpAddress: "" as string,
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

			trpType(trpAddress: string): "a" | "b" | "?"
			{
				let chainName = this.$store.state.currentChain.name;

				switch (trpAddress)
				{
					case this.$store.state.config.networkChain[chainName].yieldSyncV1ATransferRequestProtocol:
						return "a";

					case this.$store.state.config.networkChain[chainName].yieldSyncV1BTransferRequestProtocol:
						return "b";

					default:
						return "?";
				}
			}
		},

		async created(): Promise<void>
		{
			if (this.$route.query.admin == "true")
			{
				this.asAdmin = true;
			}

			await this.$store.commit("setPagesRVV1VaultVaultAddress", this.vaultAddress);
			await this.$store.dispatch("getTokens");
			await this.$store.dispatch("getERC721Tokens");

			this.vault = new this.$store.state.web3.eth.Contract(
				YieldSyncV1Vault as AbiItem[],
				this.vaultAddress
			);

			if (!this.vault)
			{
				return;
			}

			this.trpAddress = await this.vault.methods.transferRequestProtocol().call();
		}
	});
</script>
