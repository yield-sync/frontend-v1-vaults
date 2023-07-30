<template>
	<VCard class="rounded-xl elevation-0 bg-light-frost">
		<VCardText>
			<VRow>
				<VCol>
					<h2 class="mt-2 text-center text-uppercase text-primary">🔑 Admins</h2>
				</VCol>
			</VRow>

			<VRow v-for="(a, i) in admins" :key="i">
				<VCol md="1" lg="1">
					<VBtn class="w-100 rounded-xl" variant="tonal" @click="copy(a)">📋</VBtn>
				</VCol>

				<VCol md="9" lg="9">
					<a
						:href="`https://${$store.state.etherscanDomainStart}.etherscan.io/address/${a}`"
						target="_blank"
						rel="noopener noreferrer"
					>
						<VBtn variant="tonal" color="dark" class="word-wrap rounded-xl">{{ a }}</VBtn>
					</a>
				</VCol>

				<VCol v-if="asAdmin" md="2" lg="2">
					<VBtn
						:disabled="removing"
						variant="tonal"
						color="danger"
						class="w-100 rounded-xl elevation-0"
						@click="adminRemove(a)"
					>
						Remove
					</VBtn>
				</VCol>
			</VRow>

			<VRow v-if="asAdmin">
				<VCol md="10" lg="10">
					<VTextField
						v-model="tobeAdded"
						label="Address to be added as an Admin"
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
						@click="adminAdd()"
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
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { TransactionReceipt } from "web3-core";
	import { Contract } from "web3-eth-contract";
	import { AbiItem } from "web3-utils";

	import YieldSyncV1Vault from "../../abi/YieldSyncV1Vault";

	export default defineComponent({
		name: "CAdmins",

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
				admins: [
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

			async getAdmins()
			{

				if (!this.$store.state.web3.utils.isAddress(this.v1VaultAddress))
				{
					return;
				}

				this.admins = await this.$store.state.contract.yieldSyncV1VaultAccessControl.methods
					.yieldSyncV1Vault_admins(this.v1VaultAddress).call()
				;
			},

			async adminAdd(): Promise<void>
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

				v1Vault.methods.adminAdd(this.tobeAdded).send({
					from: this.$store.state.wallet.accounts[0]
				}).on("sent", async () =>
				{
					this.adding = true;
				}).on("confirmation", async (confirmationNumber: number, receipt: TransactionReceipt) =>
				{
					console.log(`Confirmation #${confirmationNumber}`, receipt);

					if (confirmationNumber == 0)
					{
						await this.getAdmins();

						this.tobeAdded = "";

						this.adding = false;
					}
				}).on("error", async (error: Error) =>
				{
					this.error = String(error);

					this.adding = false;
				});
			},

			async adminRemove(admin: string): Promise<void>
			{
				if (!this.$store.state.web3.utils.isAddress(this.v1VaultAddress))
				{
					return;
				}

				const v1Vault: Contract = new this.$store.state.web3.eth.Contract(
					YieldSyncV1Vault as AbiItem[],
					this.v1VaultAddress
				);

				v1Vault.methods.adminRemove(admin).send({
					from: this.$store.state.wallet.accounts[0]
				}).on("sent", async () =>
				{
					this.removing = true;
				}).on("confirmation", async (confirmationNumber: number, receipt: TransactionReceipt) =>
				{
					console.log(`Confirmation #${confirmationNumber}`, receipt);

					if (confirmationNumber == 0)
					{
						await this.getAdmins();

						this.removing = false;
					}
				})
					.on("error", async (error: Error) =>
					{
						this.error = String(error);

						this.removing = false;
					});
			},
		},

		async created()
		{
			await this.getAdmins();

			// watch the params of the route to fetch the data again
			this.$watch(
				() =>
				{
					return this.$route.params;
				},
				async () =>
				{
					await this.getAdmins();
				},
				// fetch the data when the view is created and the data is already being observed
				{
					immediate: true
				}
			);
		},
	});
</script>
