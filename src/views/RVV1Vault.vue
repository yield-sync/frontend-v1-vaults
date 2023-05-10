<template>
	<VRow>
		<VCol cols="3" class="bg-light">
			<VContainer class="">
				<VBtn
					color="dark"
					variant="tonal"
					class="w-100 mb-3 no-box-shadow"
					@click="tab = 'overview'"
				>
					V1 Vault Overview
				</VBtn>

				<VBtn
					color="dark"
					variant="tonal"
					class="w-100 mb-3 no-box-shadow"
					@click="tab = 'create-wr'"
				>
					Create Withdrawal Request
				</VBtn>

				<VBtn
					color="dark"
					variant="tonal"
					class="w-100 mb-3 no-box-shadow"
					@click="tab = 'vote-wr'"
				>
					Vote on Withdrawal Requests
				</VBtn>
			</VContainer>
		</VCol>

		<VCol cols="9" class="bg-white">
			<VContainer class="">
				<VRow>
					<VCol cols="4" />

					<VCol cols="4">
						<h3 class="mb-3 text-center text-uppercase text-primary">V1 Vault</h3>
					</VCol>

					<VCol cols="4" class="text-right">
						<a
							:href="`https://${$store.state.etherscanDomainStart}.etherscan.io/address/${v}`"
							target="_blank"
							rel="noopener noreferrer"
						>
							<VBtn variant="plain" size="sm"><h6>🔗 V1 Vault Contract</h6></VBtn>
						</a>
					</VCol>
				</VRow>

				<CBalances v-if="tab == 'overview'" :address="v" />
			</VContainer>
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
				tab: "overview",
				v: this.$route.params.address as string
			};
		},
		components: {
			CBalances
		}
	});
</script>
