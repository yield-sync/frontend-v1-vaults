<template>
	<VCard class="mb-4 rounded-xl bg-light-frost elevation-0">
		<VCardText class="px-6 py-6">
			<VRow class="mt-3 mb-6">
				<VCol cols="12" md="4">
					<h3 class="text-center text-primary text-uppercase" style="word-wrap: break-word;">
						Vault Address
					</h3>
				</VCol>

				<VCol cols="12" md="4" class="d-none d-md-block">
					<h3 class="text-center text-primary text-uppercase" style="word-wrap: break-word;">
						For : Against
					</h3>
				</VCol>

				<VCol cols="12" md="4" class="d-none d-md-block">
					<h3 class="text-center text-primary text-uppercase" style="word-wrap: break-word;">
						TRP Type
					</h3>
				</VCol>
			</VRow>

			<div v-if="this.loading" class="text-center">
				<VProgressCircular
					class=""
					indeterminate
					color="primary"
				/>
			</div>

			<div v-if="!this.loading">
				<RouterLink
					v-for="(v, i) in this.$store.state.membershipYieldSyncV1VaultVaults"
					:key="i"
					:to="`/v1-vault/${v.address}`"
					class="text-decoration-none"
				>
					<div class="py-6 mb-6 rounded-xl vault">
						<VRow>
							<VCol cols="12" md="4">
								<h3 class="text-decoration-none text-center text-primary">
									{{
										v.address ?
											v.address.substring(0, 4) +
											"..." +
											v.address.substring(this.$store.state.wallet.accounts[0].length - 4)
											:
											""
									}}
								</h3>
							</VCol>

							<VCol cols="12" md="4" class="d-none d-md-block">
								<h3 class="text-center text-primary" style="word-wrap: break-word;">
									{{ v.voteForRequired }} : {{ v.voteAgainstRequired }}
								</h3>
							</VCol>

							<VCol cols="12" md="4">
								<h3 class="text-decoration-none text-center text-uppercase text-primary">
									{{ v.trpType }}
								</h3>
							</VCol>
						</VRow>
					</div>
				</RouterLink>
			</div>

			<div
				v-if="!this.loading && this.$store.state.membershipYieldSyncV1VaultVaults.length == 0"
				class="text-center"
			>
				<h5>No memberships found</h5>
			</div>
		</VCardText>
	</VCard>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		name: "RVGovernance",

		data()
		{
			return {
				loading: true as boolean,
				registry: this.$store.state.config.networkChain[
					this.$store.state.currentChain.name
				].yieldSyncV1VaultRegistry,

				etherscanDomainStart: this.$store.state.etherscanDomainStart,
			};
		},

		async created(): Promise<void>
		{
			this.loading = true;

			await this.$store.dispatch("generateVaultMemberships");

			this.loading = false;
		},
	});
</script>
