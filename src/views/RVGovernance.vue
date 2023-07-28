<template>
	<VContainer style="padding: 160px 0;">
		<div class="w-100 mx-auto" style="max-width: 800px;">
			<VCard class="mb-4 rounded-xl bg-light-frost elevation-0">
				<VCardText class="px-6 py-6">
					<VRow>

						<VCol cols="12">
							<h3 class="mb-3 text-center text-uppercase text-primary">Yield Sync Governance</h3>
						</VCol>

						<VCol cols="12" class="text-center">
							<a
								:href="`https://${$store.state.etherscanDomainStart}.etherscan.io/address/${govA}`"
								target="_blank"
								rel="noopener noreferrer"
							>
								<VBtn variant="tonal" color="primary"><h6>🔗 Governance Contract</h6></VBtn>
							</a>
						</VCol>

						<VCol cols="12">
							<h4 class="mb-3 text-center text-primary">DEFAULT_ADMIN_ROLE</h4>
							<h5 class="mb-3 text-center">{{ adminRole }}</h5>

							<h4 class="mb-3 text-center text-primary">DEFAULT_ADMIN_ROLE Admin</h4>
							<h5 class="mb-3 text-center">{{ roleAdmin }}</h5>

							<h4 class="mb-3 text-center text-primary">Role Member Count</h4>
							<h5 class="mb-3 text-center">{{ roleMemberCount }}</h5>

							<h4 class="mb-3 text-center text-primary">Wallet is Admin</h4>
							<h5 class="mb-3 text-center">{{ isAdmin }}</h5>

							<h4 class="mb-3 text-center text-primary">Members</h4>
							<h5 v-for="(m, i) in members" :key="i" class="text-decoration-none">
								<h5 class="mb-3 text-center">{{ m }}</h5>
							</h5>
						</VCol>
					</VRow>
				</VCardText>
			</VCard>
		</div>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		name: "RVGovernance",

		data()
		{
			return {
				govA: this.$store.state.config.networkChain[this.$store.state.currentChain.name].yieldSyncGovernance,
				adminRole: undefined,
				roleMemberCount: 0,
				roleAdmin: "",
				members: [
				] as string[],

				isAdmin: false,
			};
		},

		methods: {
		},

		async created()
		{
			this.adminRole = await this.$store.state.contract.yieldSyncGovernance.methods.DEFAULT_ADMIN_ROLE().call();

			this.roleAdmin = await this.$store.state.contract.yieldSyncGovernance.methods.getRoleAdmin(
				this.adminRole
			).call();

			this.roleMemberCount = await this.$store.state.contract.yieldSyncGovernance.methods.getRoleMemberCount(
				this.adminRole
			).call();

			for (let i = 0; i < this.roleMemberCount; i++)
			{
				const member = await this.$store.state.contract.yieldSyncGovernance.methods.getRoleMember(
					this.adminRole,
					i
				).call();

				this.members.push(member);

				console.log();
				if (member.toUpperCase() === this.$store.state.wallet.accounts[0].toUpperCase())
				{

					this.isAdmin = true;
				}
			}
		}
	});
</script>
