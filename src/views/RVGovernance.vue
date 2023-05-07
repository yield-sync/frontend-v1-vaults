<template>
	<VContainer>
		<VRow>
			<VCol cols="1" />

			<VCol cols="10">
				<h3 class="mb-3 text-center text-uppercase text-primary">Yield Sync Governance</h3>
			</VCol>

			<VCol cols="1">
				<a
					:href="`https://${$store.state.etherscanDomainStart}.etherscan.io/address/${governanceAddress}`"
					target="_blank"
					rel="noopener noreferrer"
				>
					<VBtn variant="plain" size="sm" class="w-100">🔗</VBtn>
				</a>
			</VCol>

			<VCol cols="12" xl="5">
				<h4 class="text-primary">DEFAULT_ADMIN_ROLE</h4>
				<h5>{{ adminRole }}</h5>
			</VCol>

			<VCol cols="12" xl="5">
				<h4 class="text-primary">DEFAULT_ADMIN_ROLE Admin</h4>
				<h5>{{ roleAdmin }}</h5>
			</VCol>

			<VCol cols="12" xl="2">
				<h4 class="text-primary">Role Member Count</h4>
				<h5>{{ roleMemberCount }}</h5>
			</VCol>

			<VCol cols="12">
				<h4 class="text-primary">Wallet is Admin</h4>
				<h5>{{ isAdmin }}</h5>
			</VCol>

			<VCol cols="12">
				<h4 class="text-primary">Members</h4>
				<ul>
					<li v-for="(m, i) in members" :key="i">
						<h5>{{ m }}</h5>
					</li>
				</ul>
			</VCol>
		</VRow>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		name: "RVGovernance",

		data()
		{
			return {
				governanceAddress: this.$store.state.config.address[this.$store.state.chainName].yieldSyncGovernance,
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
				if (member.toUpperCase() === this.$store.state.accounts[0].toUpperCase())
				{

					this.isAdmin = true;
				}
			}
		}
	});
</script>
