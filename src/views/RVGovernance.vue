<template>
	<VContainer>
		<VRow>
			<VCol cols="12">
				<h2 class="text-center">Governance</h2>
			</VCol>
			<VCol cols="12">
				<h5>Total Admin Count: {{ roleCount }}</h5>
				<h5>Wallet is Admin: {{ isAdmin }}</h5>
			</VCol>
			<VCol cols="12">
				<VTextField
					v-model="getRoleAdmin.role"
					label="Get Role Admin of role.."
					variant="outlined"
					hide-details
				/>
				<VBtn color="primary" class="my-3 w-100">Get Role Admin</VBtn>
			</VCol>
		</VRow>
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

				getRoleAdmin: {
					role: ""
				},
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
