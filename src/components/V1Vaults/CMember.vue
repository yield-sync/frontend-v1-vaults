<template>
	<VContainer>
		<h3 class="mb-3 text-center text-uppercase">V1 Vault Memberships</h3>
		<h5 class="text-center">{{ v1Vaults }}</h5>
		<h6 class="text-center">Record Contract: {{ record }}</h6>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";


	export default defineComponent({
		name: "RVGovernance",

		data()
		{
			return {
				record: "",
				v1Vaults: [
				],
			};
		},

		async created()
		{
			this.record = await this.$store.state.contract.yieldSyncV1VaultFactory.methods.YieldSyncV1VaultRecord()
				.call();

			this.v1Vaults = await this.$store.state.contract.yieldSyncV1VaultRecord.methods.member_yieldSyncV1Vaults(
				this.$store.state.accounts[0]
			).call();
		},
	});
</script>
