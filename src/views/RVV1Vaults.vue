<template>
	<VContainer>
		<CMember class="mb-8" />

		<CAdmin class="mb-8" />

		<CDeploy class="mb-8" />
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import CDeploy from "@/components/V1Vaults/CDeploy.vue";
	import CAdmin from "@/components/V1Vaults/CAdmin.vue";
	import CMember from "@/components/V1Vaults/CMember.vue";

	export default defineComponent({
		name: "RVGovernance",

		data()
		{
			return {
				currentTab: "member",
			};
		},

		components: {
			CDeploy,
			CAdmin,
			CMember
		},
	});
</script>
