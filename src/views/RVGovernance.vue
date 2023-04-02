<template>
	<VContainer>
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
				isAdmin: false,
				adminRole: undefined
			};
		},

		async created()
		{
			this.adminRole = await this.$store.state.contract.yieldSyncGovernance.methods.DEFAULT_ADMIN_ROLE().call();
		}
	});
</script>
