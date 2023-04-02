<template>
	<VContainer>
		<h5>Total Admin Count: {{ roleCount }}</h5>
		<h5>Wallet is Admin: {{ isAdmin }}</h5>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		name: "RVGovernance",

		data()
		{
			return {
				adminRole: undefined,
				roleCount: 0,

				isAdmin: false,
			};
		},

		async created()
		{
			this.adminRole = await this.$store.state.contract.yieldSyncGovernance.methods.DEFAULT_ADMIN_ROLE().call();

			this.roleCount = await this.$store.state.contract.yieldSyncGovernance.methods.getRoleMemberCount(
				this.adminRole
			).call();

			this.isAdmin = await this.$store.state.contract.yieldSyncGovernance.methods.hasRole(
				this.adminRole,
				this.$store.state.accounts[0]
			).call();
		}
	});
</script>
