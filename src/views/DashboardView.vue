<template>
	<VContainer>
		<VRow>
			<VCol cols="12" style="min-height: 300px;">
				<VSheets>
					<VBtn>Go to vaults</VBtn>
				</VSheets>
			</VCol>
		</VRow>
	</VContainer>
</template>

<script lang="ts">
	import { ethers } from "ethers";
	import { defineComponent } from "vue";

	export default defineComponent({
		name: "DashboardView",

		components: {
		},

		async created()
		{

		},
	});
</script>
