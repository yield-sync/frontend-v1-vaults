<template>
	<VContainer>
		<VRow>
			<VCol class="text-center">
				<RouterLink to="/governance">
					<VBtn variant="plain">Governance</VBtn>
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
