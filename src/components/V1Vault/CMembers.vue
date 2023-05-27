<template>
	<VContainer>
		<VCard color="light" class="mb-6 px-6 py-6">
			<VCardTitle>
				<h4 class="text-primary">Members</h4>
			</VCardTitle>

			<VRow v-for="(a, i) in members" :key="i" class="">
				<VCol md="10" lg="10">
					<a
						:href="`https://${$store.state.etherscanDomainStart}.etherscan.io/address/${a}`"
						target="_blank"
						rel="noopener noreferrer"
					>
						<VBtn variant="plain" size="sm" class="word-wrap">🔗 {{ a }}</VBtn>
					</a>
				</VCol>

				<VCol v-if="asAdmin" md="2" lg="2">
					<VBtn color="danger" class="w-100" @click="removeMember(a)">Remove</VBtn>
				</VCol>
			</VRow>

			<VRow v-if="asAdmin">
				<VCol md="10" lg="10">
					<VTextField
						v-model="tobeAdded"
						label="Address to be added as a member"
						variant="outlined"
						hide-details
					/>
				</VCol>
				<VCol md="2" lg="2">
					<VBtn color="success" class="w-100" @click="addMember()">Add</VBtn>
				</VCol>

				<VCol cols="12">
					<h6 class="text-danger">{{ error }}</h6>
				</VCol>
			</VRow>
		</VCard>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { Contract } from "web3-eth-contract";
	import { AbiItem } from "web3-utils";

	import YieldSyncV1Vault from "../../abi/YieldSyncV1Vault";

	export default defineComponent({
		name: "CMembers",

		props: {
			asAdmin: {
				type: Boolean,
				default: false
			},

			v1VaultAddress: {
				type: String,
				required: true
			}
		},

		data()
		{
			return {
				members: [
				] as string[],
				tobeAdded: "" as string,
				error: "" as string
			};
		},

		methods: {
			async getMembers(): Promise<void>
			{
				if (!this.$store.state.web3.utils.isAddress(this.v1VaultAddress))
				{
					return;
				}

				this.members = await this.$store.state.contract.yieldSyncV1VaultAccessControl.methods
					.yieldSyncV1Vault_members(this.v1VaultAddress).call()
				;
			},

			async addMember(): Promise<void>
			{
				if (!this.$store.state.web3.utils.isAddress(this.v1VaultAddress))
				{
					return;
				}

				if (!this.$store.state.web3.utils.isAddress(this.tobeAdded))
				{
					this.error = "Invalid address";
					return;
				}
				const v1Vault: Contract = new this.$store.state.web3.eth.Contract(
					YieldSyncV1Vault as AbiItem[],
					this.v1VaultAddress
				);

				v1Vault.methods.addMember(this.tobeAdded).send({
					from: this.$store.state.wallet.accounts[0]
				});
			},

			async removeMember(member: string): Promise<void>
			{
				if (!this.$store.state.web3.utils.isAddress(this.v1VaultAddress))
				{
					return;
				}

				const v1Vault: Contract = new this.$store.state.web3.eth.Contract(
					YieldSyncV1Vault as AbiItem[],
					this.v1VaultAddress
				);

				v1Vault.methods.removeMember(member).send({
					from: this.$store.state.wallet.accounts[0]
				});
			},
		},

		async created()
		{
			await this.getMembers();

			// watch the params of the route to fetch the data again
			this.$watch(
				() =>
				{
					return this.$route.params;
				},
				async () =>
				{
					await this.getMembers();
				},
				// fetch the data when the view is created and the data is already being observed
				{
					immediate: true
				}
			);
		},
	});
</script>
