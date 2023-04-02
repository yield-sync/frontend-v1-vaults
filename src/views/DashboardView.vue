<template>
	<VContainer>
		<VRow>
			<VCol>
				<h4>Admin: {{ $store.state.isAdmin }}</h4>
				<h4>yieldSyncGovernance: {{ $store.state.contract.yieldSyncGovernance }}</h4>
				<h4>yieldSyncV1VaultRecord: {{ $store.state.contract.yieldSyncV1VaultRecord }}</h4>
			</VCol>
		</VRow>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		name: "DashboardView"
	});
</script>
