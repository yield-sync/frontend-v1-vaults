<template>
	<VContainer>
		<CBalances :address="addressToCheckBalancesOf" />
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	import CBalances from "../components/CBalances.vue";

	export default defineComponent({
		name: "BalancesView",

		components: {
			CBalances
		},

		data()
		{
			return {
				addressToCheckBalancesOf: this.$route.params.address as string,
			};
		},
	});
</script>
