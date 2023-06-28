<template>
	<VCard class="mb-6 rounded-xl elevation-0 bg-light-frost">
		<VCardTitle class="bg-primary text-light">
			<h4 class="m-0 text-center text-uppercase">🔧 Properties</h4>
		</VCardTitle>

		<VCardText class="mt-4">
			<VRow>
				<!-- For Vote -->
				<VCol cols="12" sm="12">
					<VRow>
						<VCol cols="8">
							<h4 class="mb-3 text-primary">✅ For Vote Count Required</h4>

							<h3 v-if="!asAdmin || !edit.forVoteCountRequired" class="m-0">
								{{ vault.forVoteCountRequired }}
							</h3>

							<VTextField
								v-if="asAdmin && edit.forVoteCountRequired"
								v-model="update.forVoteCountRequired"
								size="sm"
								type="number"
								label="New For Vote Count"
								variant="outlined"
							/>
						</VCol>

						<VCol cols="4" class="text-right">
							<VBtn
								v-if="asAdmin"
								:disabled="updating.forVoteCountRequired"
								:variant="edit.forVoteCountRequired ? 'tonal' : 'flat'"
								:color="edit.forVoteCountRequired ? 'danger' : 'admin'"
								class="w-100 mb-3 rounded-xl"
								@click="edit.forVoteCountRequired = !edit.forVoteCountRequired"
							>
								{{ edit.forVoteCountRequired ? 'Cancel' : 'Edit' }}
							</VBtn>

							<VBtn
								v-if="asAdmin && edit.forVoteCountRequired"
								:disabled="updating.forVoteCountRequired"
								variant="tonal"
								color="success"
								class="w-100 mb-3 rounded-xl"
								@click="updateForVoteCountRequired()"
							>
								Update
							</VBtn>
						</VCol>
					</VRow>
				</VCol>

				<VCol cols="12" sm="12">
					<VRow>
						<VCol cols="8">
							<h4 class="mb-3 text-primary">❌ Against Vote Count Required</h4>

							<h3 v-if="!asAdmin || !edit.againstVoteCountRequired" class="m-0">
								{{ vault.againstVoteCountRequired }}
							</h3>

							<VTextField
								v-if="asAdmin && edit.againstVoteCountRequired"
								v-model="update.againstVoteCountRequired"
								size="sm"
								type="number"
								label="New Against Vote Count"
								variant="outlined"
								class="rounded-xl"
							/>
						</VCol>

						<VCol cols="4" class="text-right">
							<VBtn
								v-if="asAdmin"
								:disabled="updating.againstVoteCountRequired"
								:variant="edit.againstVoteCountRequired ? 'tonal' : 'flat'"
								:color="edit.againstVoteCountRequired ? 'danger' : 'admin'"
								class="w-100 mb-3 rounded-xl"
								@click="edit.againstVoteCountRequired = !edit.againstVoteCountRequired"
							>
								{{ edit.againstVoteCountRequired ? 'Cancel' : 'Edit' }}
							</VBtn>

							<VBtn
								v-if="asAdmin && edit.againstVoteCountRequired"
								:disabled="updating.againstVoteCountRequired"
								variant="tonal"
								color="success"
								class="mb-3 w-100 rounded-xl"
								@click="updateAgainstVoteCountRequired()"
							>
								Update
							</VBtn>
						</VCol>
					</VRow>
				</VCol>

				<VCol cols="12" sm="12">
					<VRow>
						<VCol cols="8">
							<h4 class="mb-3 text-primary">⏳ Transfer Delay Seconds</h4>

							<h3 v-if="!asAdmin || !edit.transferDelaySeconds" class="m-0">
								{{ vault.transferDelaySeconds }}
							</h3>

							<VTextField
								v-if="asAdmin && edit.transferDelaySeconds"
								v-model="update.transferDelaySeconds"
								size="sm"
								type="number"
								label="Transfer Delay Seconds"
								variant="outlined"
							/>
						</VCol>

						<VCol cols="4" class="text-right">
							<VBtn
								v-if="asAdmin"
								:disabled="updating.transferDelaySeconds"
								:variant="edit.transferDelaySeconds ? 'tonal' : 'flat'"
								:color="edit.transferDelaySeconds ? 'danger' : 'admin'"
								class="w-100 mb-3 rounded-xl"
								@click="edit.transferDelaySeconds = !edit.transferDelaySeconds"
							>
								{{ edit.transferDelaySeconds ? 'Cancel' : 'Edit' }}
							</VBtn>

							<VBtn
								v-if="asAdmin && edit.transferDelaySeconds"
								:disabled="updating.transferDelaySeconds"
								variant="tonal"
								color="success"
								class="w-100 mb-3 rounded-xl"
								@click="updateTransferDelaySecondsRequired()"
							>
								Update
							</VBtn>
						</VCol>
					</VRow>
				</VCol>
			</VRow>
		</VCardText>
	</VCard>

	<VCard v-if="!asAdmin" class="mb-6 rounded-xl elevation-0 bg-light-frost">
		<VCardTitle class="bg-primary text-light">
			<h4 class="m-0 text-center text-uppercase">⚙️ Membership Settings</h4>
		</VCardTitle>

		<VCardText class="mt-4">
			<VBtn
				:disabled="processing"
				color="danger"
				class="w-100 rounded-xl elevation-0"
				@click="renounceMembership()"
			>
				Renounce Membership
			</VBtn>

			<h6 v-if="error">{{ error }}</h6>
		</VCardText>
	</VCard>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { AbiItem } from "web3-utils";
	import { TransactionReceipt } from "web3-core";
	import { Contract } from "web3-eth-contract";

	import YieldSyncV1Vault from "../../abi/YieldSyncV1Vault";

	export default defineComponent({
		name: "CMembers",

		props: {
			vaultAddress: {
				type: String,
				required: true
			},

			asAdmin: {
				type: Boolean,
				default: false
			},
		},

		data()
		{
			return {
				processing: false,
				yieldSyncV1Vault: undefined as undefined | Contract,

				vault: {
					againstVoteCountRequired: 0,
					forVoteCountRequired: 0,
					transferDelaySeconds: 0,
				},
				edit: {
					againstVoteCountRequired: false,
					forVoteCountRequired: false,
					transferDelaySeconds: false
				},
				update: {
					againstVoteCountRequired: 0,
					forVoteCountRequired: 0,
					transferDelaySeconds: 0,
				},
				updating: {
					againstVoteCountRequired: false,
					forVoteCountRequired: false,
					transferDelaySeconds: false,
				},

				error: "" as string
			};
		},

		methods: {
			updateAgainstVoteCountRequired()
			{
				if (!this.$store.state.web3.utils.isAddress(this.vaultAddress))
				{
					return;
				}

				const v1Vault: Contract = new this.$store.state.web3.eth.Contract(
					YieldSyncV1Vault as AbiItem[],
					this.vaultAddress
				);

				v1Vault.methods.updateAgainstVoteCountRequired(this.update.againstVoteCountRequired).send({
					from: this.$store.state.wallet.accounts[0]
				}).on("sent", async () =>
				{
					this.updating.againstVoteCountRequired = true;
				}).on("confirmation", async (confirmationNumber: number, receipt: TransactionReceipt) =>
				{
					console.log(`Confirmation #${confirmationNumber}`, receipt);

					if (confirmationNumber == 0)
					{
						this.edit.againstVoteCountRequired = false;

						this.vault.againstVoteCountRequired = await v1Vault.methods.againstVoteCountRequired().call();
						this.update.againstVoteCountRequired = this.vault.againstVoteCountRequired;

						this.updating.againstVoteCountRequired = false;
					}
				}).on("error", async (error: Error) =>
				{
					this.error = String(error);

					this.updating.againstVoteCountRequired = false;
				});
			},

			updateForVoteCountRequired()
			{
				if (!this.$store.state.web3.utils.isAddress(this.vaultAddress))
				{
					return;
				}

				const v1Vault: Contract = new this.$store.state.web3.eth.Contract(
					YieldSyncV1Vault as AbiItem[],
					this.vaultAddress
				);

				v1Vault.methods.updateForVoteCountRequired(this.update.forVoteCountRequired).send({
					from: this.$store.state.wallet.accounts[0]
				}).on("sent", async () =>
				{
					this.updating.forVoteCountRequired = true;
				}).on("confirmation", async (confirmationNumber: number, receipt: TransactionReceipt) =>
				{
					console.log(`Confirmation #${confirmationNumber}`, receipt);

					if (confirmationNumber == 0)
					{
						this.edit.forVoteCountRequired = false;

						this.vault.forVoteCountRequired = await v1Vault.methods.forVoteCountRequired().call();
						this.update.forVoteCountRequired = this.vault.forVoteCountRequired;

						this.updating.forVoteCountRequired = false;
					}
				}).on("error", async (error: Error) =>
				{
					this.error = String(error);

					this.updating.forVoteCountRequired = false;
				});
			},

			updateTransferDelaySecondsRequired()
			{
				if (!this.$store.state.web3.utils.isAddress(this.vaultAddress))
				{
					return;
				}

				const v1Vault: Contract = new this.$store.state.web3.eth.Contract(
					YieldSyncV1Vault as AbiItem[],
					this.vaultAddress
				);

				v1Vault.methods.updateTransferDelaySeconds(this.update.transferDelaySeconds).send({
					from: this.$store.state.wallet.accounts[0]
				}).on("sent", async () =>
				{
					this.updating.transferDelaySeconds = true;
				}).on("confirmation", async (confirmationNumber: number, receipt: TransactionReceipt) =>
				{
					console.log(`Confirmation #${confirmationNumber}`, receipt);

					if (confirmationNumber == 0)
					{
						this.edit.transferDelaySeconds = false;

						this.vault.transferDelaySeconds = await v1Vault.methods.transferDelaySeconds().call();
						this.update.transferDelaySeconds = this.vault.transferDelaySeconds;

						this.updating.transferDelaySeconds = false;
					}
				}).on("error", async (error: Error) =>
				{
					this.error = String(error);

					this.updating.transferDelaySeconds = false;
				});
			},

			async renounceMembership()
			{
				if (this.yieldSyncV1Vault)
				{
					try
					{
						await this.yieldSyncV1Vault.methods.renounceMembership().send({
							from: this.$store.state.wallet.accounts[0]
						}).on("sent", async () =>
						{
							this.processing = true;
						}).on("confirmation", async (confirmationNumber: number, receipt: TransactionReceipt) =>
						{
							console.log(`Confirmation #${confirmationNumber}`, receipt);

							if (confirmationNumber == 0)
							{
								this.processing = false;
							}
						}).on("error", async (error: Error) =>
						{
							this.error = String(error);

							this.processing = false;
						});
					}
					catch (e)
					{
						this.error = String(e);
					}
				}
			}
		},

		async created()
		{
			this.yieldSyncV1Vault = new this.$store.state.web3.eth.Contract(
				YieldSyncV1Vault as AbiItem[],
				this.vaultAddress
			);

			if (this.yieldSyncV1Vault)
			{
				this.vault.againstVoteCountRequired = await this.yieldSyncV1Vault.methods.againstVoteCountRequired()
					.call();
				this.update.againstVoteCountRequired = this.vault.againstVoteCountRequired;
				this.vault.forVoteCountRequired = await this.yieldSyncV1Vault.methods.forVoteCountRequired().call();
				this.update.forVoteCountRequired = this.vault.forVoteCountRequired;
				this.vault.transferDelaySeconds = await this.yieldSyncV1Vault.methods.transferDelaySeconds().call();
				this.update.transferDelaySeconds = this.vault.transferDelaySeconds;
			}
		}
	});
</script>
