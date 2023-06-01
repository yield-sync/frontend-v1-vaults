<template>
	<VContainer>
		<VCard class="mb-6 rounded-xl elevation-0 bg-light-frost">
			<VCardTitle class="bg-primary text-light">
				<h4 class="m-0 text-center text-uppercase">Members</h4>
			</VCardTitle>

			<VCardText class="mt-4">
				<VRow v-for="(a, i) in members" :key="i" class="">
					<VCol md="9" lg="9">
						<a
							:href="`https://${$store.state.etherscanDomainStart}.etherscan.io/address/${a}`"
							target="_blank"
							rel="noopener noreferrer"
						>
							<VBtn variant="plain" size="sm" class="word-wrap">🔗 {{ a }}</VBtn>
						</a>
					</VCol>

					<VCol md="1" lg="1">
						<VBtn class="w-100 rounded-xl" variant="tonal" @click="copy(a)">📋</VBtn>
					</VCol>

					<VCol v-if="asAdmin" md="2" lg="2">
						<VBtn
							:disabled="removing"
							variant="tonal"
							color="danger"
							class="w-100 rounded-xl elevation-0"
							@click="removeMember(a)"
						>
							Remove
						</VBtn>
					</VCol>
				</VRow>

				<VRow v-if="asAdmin">
					<VCol md="10" lg="10">
						<VTextField
							v-model="tobeAdded"
							label="Address to be added as a Member"
							variant="outlined"
							hide-details
						/>
					</VCol>
					<VCol md="2" lg="2">
						<VBtn
							:disabled="adding"
							variant="tonal"
							color="success"
							class="w-100 rounded-xl elevation-0"
							@click="addMember()"
						>
							Add
						</VBtn>
					</VCol>

					<VCol cols="12">
						<h6 class="text-danger">{{ error }}</h6>
					</VCol>
				</VRow>
			</VCardText>
		</VCard>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { TransactionReceipt } from "web3-core";
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
				adding: false as boolean,
				removing: false as boolean,
				members: [
				] as string[],
				tobeAdded: "" as string,
				error: "" as string
			};
		},

		methods: {
			copy(a: string)
			{
				navigator.clipboard.writeText(a);
			},

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
				}).on("sent", async () =>
				{
					this.adding = true;
				}).on("confirmation", async (confirmationNumber: number, receipt: TransactionReceipt) =>
				{
					console.log(`Confirmation #${confirmationNumber}`, receipt);

					if (confirmationNumber == 0)
					{
						await this.getMembers();

						this.tobeAdded = "";

						this.adding = false;
					}
				}).on("error", async (error: Error) =>
				{
					this.error = String(error);

					this.adding = false;
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
				}).on("sent", async () =>
				{
					this.removing = true;
				}).on("confirmation", async (confirmationNumber: number, receipt: TransactionReceipt) =>
				{
					console.log(`Confirmation #${confirmationNumber}`, receipt);

					if (confirmationNumber == 0)
					{
						await this.getMembers();
					}
					this.removing = false;
				}).on("error", async (error: Error) =>
				{
					this.error = String(error);

					this.removing = false;
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
