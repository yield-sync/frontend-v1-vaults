<template>
	<VCard class="mb-6 rounded-xl elevation-0 bg-light-frost">
		<VCardTitle class="bg-primary text-light">
			<h4 class="m-0 text-center text-uppercase">👥 Members & Admins</h4>
		</VCardTitle>

		<VCardText class="mt-4">
			<a
				:href="`https://${$store.state.etherscanDomainStart}.etherscan.io/address/${accessControl}`"
				target="_blank" rel="noopener noreferrer"
			>
				<VBtn class="mb-4 rounded-xl bg-light-frost elevation-0 text-primary font-weight-bold">
					🔗 Access Control
				</VBtn>
			</a>

			<CMembers
				:v1VaultAddress="vaultAddress"
				:asAdmin="asAdmin"
				class="mb-6"
			/>

			<CAdmins
				:v1VaultAddress="vaultAddress"
				:asAdmin="asAdmin"
			/>
		</VCardText>
	</VCard>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	import CAdmins from "./CAdmins.vue";
	import CMembers from "./CMembers.vue";

	export default defineComponent({
		name: "CMembersAndAdmins",

		props: {
			vaultAddress: {
				type: String,
				required: true
			},

			asAdmin: {
				type: Boolean,
				default: false
			},
		},

		data() {
			return {
				accessControl: this.$store.state.config.address[
					this.$store.state.chainName
				].yieldSyncV1VaultAccessControl || ""
			}
		},

		components: {
			CAdmins,
			CMembers,
		},
	});
</script>
