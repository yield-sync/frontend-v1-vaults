<template>
	<div>
		<CMember />

		<CAdmin />

		<CDeploy />
	</div>
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
