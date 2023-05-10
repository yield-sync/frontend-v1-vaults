<template>
	<VRow>
		<VCol cols="3" class="bg-light">
			<VContainer class="">
				<VBtn
					color="dark"
					variant="tonal"
					class="w-100 mb-3 no-box-shadow"
				>
					Create Withdrawal Request
				</VBtn>

				<VBtn
					color="dark"
					variant="tonal"
					class="w-100 mb-3 no-box-shadow"
				>
					Vote on Withdrawal Requests
				</VBtn>
			</VContainer>
		</VCol>

		<VCol cols="9" class="bg-white">
			<CBalances :address="v" />
		</VCol>
	</VRow>
</template>

<script lang="ts">
	import CBalances from "../components/CBalances.vue";
	import { defineComponent } from "vue";

	export default defineComponent({
		name: "RVV1Vault",

		data()
		{
			return {
				v: this.$route.params.address as string
			};
		},
		components: {
			CBalances
		}
	});
</script>
