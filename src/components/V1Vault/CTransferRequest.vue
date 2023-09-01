<template>
	<VCard
		:key="$store.state.pages.RVV1Vault.transferRequests.key"
		class="mb-6 rounded-xl elevation-0 bg-light-frost"
	>
		<VCardTitle class="bg-primary text-light">
			<h4 class="text-center text-uppercase">↗️ Transfer Requests</h4>
		</VCardTitle>

		<VTabs
			v-model="$store.state.pages.RVV1Vault.transferRequests.tab"
			bg-color="primary"
			color="light-green-lighten-5"
			fixed-tabs
		>
			<VTab value="o">Open Transfer Requests</VTab>
			<VTab v-if="$route.query.admin !== 'true'" value="c">Create Transfer Request</VTab>
		</VTabs>

		<VCardText variant="light">
			<VWindow v-model="$store.state.pages.RVV1Vault.transferRequests.tab">
				<VWindowItem value="o">
					<CTransferRequestAOpen
						v-if="
							trp == $store.state.config.networkChain[
								$store.state.currentChain.name
							].yieldSyncV1ATransferRequestProtocol
						"
						:vaultAddress="vaultAddress"
						:asAdmin="$route.query.admin == 'true'"
					/>

					<CTransferRequestBOpen
						v-else-if="
							trp == $store.state.config.networkChain[
								$store.state.currentChain.name
							].yieldSyncV1BTransferRequestProtocol
						"
						:vaultAddress="vaultAddress"
						:asAdmin="$route.query.admin == 'true'"
					/>

					<div v-else>
						<h5 class="text-center">Unsupported Transfer Request Protocol</h5>
					</div>
				</VWindowItem>

				<VWindowItem value="c">
					<CTransferRequestACreate
						v-if="
							trp == $store.state.config.networkChain[
								$store.state.currentChain.name
							].yieldSyncV1ATransferRequestProtocol
						"
						:vaultAddress="vaultAddress"
						:asAdmin="$route.query.admin == 'true'"
					/>

					<CTransferRequestBCreate
						v-else-if="
							trp == $store.state.config.networkChain[
								$store.state.currentChain.name
							].yieldSyncV1BTransferRequestProtocol
						"
						:vaultAddress="vaultAddress"
						:asAdmin="$route.query.admin == 'true'"
					/>

					<div v-else>
						<h5 class="text-center">Unsupported Transfer Request Protocol</h5>
					</div>
				</VWindowItem>
			</VWindow>
		</VCardText>
	</VCard>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { Contract } from "web3-eth-contract";
	import { AbiItem } from "web3-utils";

	import YieldSyncV1Vault from "../../abi/YieldSyncV1Vault";
	import CTransferRequestACreate from "./CTransferRequestProtocolA/CCreate.vue";
	import CTransferRequestAOpen from "./CTransferRequestProtocolA/COpen.vue";
	import CTransferRequestBCreate from "./CTransferRequestProtocolB/CCreate.vue";
	import CTransferRequestBOpen from "./CTransferRequestProtocolB/COpen.vue";

	export default defineComponent({
		name: "CTransferRequest",

		props: {
			vaultAddress: {
				required: true,
				type: String
			}
		},

		components: {
			CTransferRequestACreate,
			CTransferRequestAOpen,
			CTransferRequestBCreate,
			CTransferRequestBOpen,
		},

		data()
		{
			return {
				vault: undefined as Contract | undefined,
				trp: ""
			};
		},

		async created()
		{
			this.vault = new this.$store.state.web3.eth.Contract(
				YieldSyncV1Vault as AbiItem[],
				this.vaultAddress
			);

			if (!this.vault)
			{
				return;
			}

			this.trp = await this.vault.methods.transferRequestProtocol().call();
		},
	});
</script>
