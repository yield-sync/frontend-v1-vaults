<template>
	<VSheet color="dark" class="py-6" style="height: 600px;">
		<VContainer class="">
			<VRow>
				<VCol
					cols="12"
					sm="6"
					md="4"
					class="text-center"
				>
					<RouterLink :to="`/balances/${$store.state.accounts[0]}`" class="mr-2 text-decoration-none text-dark">
						<VBtn color="dark" class="w-100 mb-3">
							My Balances
						</VBtn>
					</RouterLink>
				</VCol>

				<VCol
					cols="12"
					sm="6"
					md="4"
					class="text-center"
				>
					<RouterLink to="/sign-message" class="mr-2 text-decoration-none text-dark">
						<VBtn color="dark" class="w-100 mb-3">
							Sign Message
						</VBtn>
					</RouterLink>
				</VCol>

				<VCol
					cols="12"
					sm="6"
					md="4"
					class="text-center"
				/>
			</VRow>
		</VContainer>
	</VSheet>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		name: "CFooter",
	});
</script>
