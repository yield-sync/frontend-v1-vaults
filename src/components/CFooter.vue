<template>
	<VSheet color="dark" class="py-6" style="height: 600px;">
		<VContainer class="">
			<VRow>
				<VCol
					cols="12"
					sm="6"
					md="4"
					class="text-center"
				/>

				<VCol
					cols="12"
					sm="6"
					md="4"
					class="text-center"
				>
					<RouterLink
						:to="`/balances/${$store.state.accounts[0]}`"
						class="mr-2 text-decoration-none"
					>
						<h4>Balances</h4>
					</RouterLink>

					<RouterLink
						to="/sign-message"
						class="mr-2 text-decoration-none"
					>
						<h4>Sign Message</h4>
					</RouterLink>
				</VCol>

				<VCol
					cols="12"
					sm="6"
					md="4"
					class="text-center"
				>
					<RouterLink
						to="/governance"
						class="mr-2 text-decoration-none"
					>
						<h4>Governance</h4>
					</RouterLink>
				</VCol>
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
