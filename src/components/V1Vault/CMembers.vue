<template>
	<VRow>
		<VCol cols="12">
			<VCard color="light" class="mb-6 px-6 py-6">
				<div v-for="(a, i) in members" :key="i" class="">
					<a
						:href="`https://${$store.state.etherscanDomainStart}.etherscan.io/address/${a}`"
						target="_blank"
						rel="noopener noreferrer"
					>
						<VBtn variant="plain" size="sm">🔗 {{ a }}</VBtn>
					</a>
				</div>
			</VCard>
		</VCol>
	</VRow>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		name: "CMembers",

		props: {
			address: {
				type: String,
				required: true
			}
		},

		data()
		{
			return {
				members: [
				]
			};
		},

		methods: {
			async getMembers()
			{
				if (!this.$store.state.web3.utils.isAddress(this.address))
				{
					return;
				}

				this.members = await this.$store.state.contract.yieldSyncV1VaultAccessControl.methods
					.yieldSyncV1Vault_members(this.address).call()
				;
			}
		},

		async created()
		{
			await this.getMembers();

			// watch the params of the route to fetch the data again
			this.$watch(
				() =>
				{
					return this.$route.params;
				},
				async () =>
				{
					await this.getMembers();
				},
				// fetch the data when the view is created and the data is already being observed
				{
					immediate: true
				}
			);
		},
	});
</script>
