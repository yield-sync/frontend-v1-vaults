<template>
	<VContainer>
		<VRow>
			<VCol cols="12">
				<h2 class="text-center">Governance</h2>
			</VCol>

			<VCol cols="12">
				<h6 class="text-center">Wallet is Admin: {{ isAdmin }}</h6>
				<h6 class="text-center">DEFAULT_ADMIN_ROLE: {{ adminRole }}</h6>
				<h6 class="text-center">DEFAULT_ADMIN_ROLE Admin: {{ roleAdmin }}</h6>
				<h6 class="text-center">Role Member Count: {{ roleMemberCount }}</h6>
			</VCol>

			<VCol cols="12">
				<h3>Members</h3>
				<ul>
					<li v-for="(m, i) in members" :key="i">
						<h4>{{ m }}</h4>
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
				adminRole: undefined,
				roleMemberCount: 0,
				roleAdmin: "",
				members: [] as string[],

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
					i,
				).call()

				this.members.push(member);

				console.log();
				if (member.toUpperCase() === this.$store.state.accounts[0].toUpperCase())
				{

					this.isAdmin = true
				}
			}
		}
	});
</script>
