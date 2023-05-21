<template>
	<VContainer>
		<CMemberships class="mb-8" />

		<CAdminships class="mb-8" />

		<CDeploy class="mb-8" />
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import CDeploy from "@/components/V1Vaults/CDeploy.vue";
	import CAdminships from "@/components/V1Vaults/CAdminships.vue";
	import CMemberships from "@/components/V1Vaults/CMemberships.vue";

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
			CAdminships,
			CMemberships
		},
	});
</script>
