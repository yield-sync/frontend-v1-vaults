<template>
	<VContainer>
		<VRow>
			<VCol cols="12">
				<h2 class="text-center">Dashboard</h2>
			</VCol>
			<VCol>
				<RouterLink to="/governance">
					<VBtn>Governance</VBtn>
				</RouterLink>
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
