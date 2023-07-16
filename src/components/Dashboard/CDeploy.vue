<template>
	<VCard class="mb-4 rounded-xl bg-light-frost elevation-0">
		<VCardText class="px-6 py-6">
			<VRow>
				<VCol cols="12">
					<h2 class="mb-3 text-center text-uppercase text-primary">🔧 Vault Properties</h2>
					<h6 class="mb-6 text-center text-uppercase text-dark">
						Must be set first before deploying a vault
					</h6>
				</VCol>

				<!-- Against -->
				<VCol cols="12" md="4">
					<VTextField
						v-model="vaultProperties.againstVoteCountRequired"
						type="number"
						label="Against Vote Count"
						variant="outlined"
						hide-details
						class="mb-3"
					/>
				</VCol>

				<!-- For -->
				<VCol cols="12" md="4">
					<VTextField
						v-model="vaultProperties.forVoteCountRequired"
						type="number"
						label="For Vote Count"
						variant="outlined"
						hide-details
						class="mb-3"
					/>
				</VCol>

				<!-- Transfer Delay -->
				<VCol cols="12" md="4">
					<VTextField
						v-model="vaultProperties.transferDelaySeconds"
						type="number"
						label="Transfer Delay (Seconds)"
						variant="outlined"
						hide-details
						class="mb-3"
					/>
				</VCol>
				<VCol cols="12">
					<VBtn
						variant="flat"
						color="primary"
						class="w-100 rounded-xl elevation-0"
						@click="updateWalletProperties()"
						:disabled="
							vaultProperties.updating || (
								vaultProperties.againstVoteCountRequired == vaultDeploy.againstVoteCountRequired &&
								vaultProperties.forVoteCountRequired == vaultDeploy.forVoteCountRequired &&
								vaultProperties.transferDelaySeconds == vaultDeploy.transferDelaySeconds
							)
						"
					>
						<VProgressCircular
							v-if="vaultProperties.updating"
							indeterminate
							color="light"
							class=""
						/>
						<h2 v-else>Update</h2>
					</VBtn>
				</VCol>
			</VRow>
		</VCardText>
	</VCard>

	<VCard
		v-if="vaultDeploy.againstVoteCountRequired > 0 && vaultDeploy.forVoteCountRequired > 0"
		class="mb-4 rounded-xl bg-light-frost elevation-0"
	>
		<VCardText class="px-6 py-6">
			<VRow class="mb-4">
				<VCol cols="6">
					<a
						:href="`https://${d}.etherscan.io/address/${factory}`"
						target="_blank"
						rel="noopener noreferrer"
					>
						<VBtn
							variant="tonal"
							color="primary"
							class="rounded-xl"
						>
							<h6>🔗 Yield Sync V1 Vault Factory</h6>
						</VBtn>
					</a>
				</VCol>

				<VCol cols="6">
					<h5 class="text-right text-uppercase text-dark">Deployment Fee: {{ deploymentFee }}</h5>
				</VCol>
			</VRow>

			<VCard class="mb-4 rounded-xl bg-light-frost elevation-0">
				<VCardText class="px-6 py-6">
					<h2 class="mb-6 text-center text-uppercase text-primary">👤 Members</h2>

					<VRow
						v-for="(m, i) in vaultDeploy.members" :key="i"
						class="mb-3"
					>
						<VCol md="10">
							<h5 class="member-or-admin my-2">{{ m }}</h5>
						</VCol>
						<VCol md="2">
							<VBtn
								variant="flat"
								color="danger"
								class="w-100 rounded-xl elevation-0"
								@click="memberRemove(i)"
							>
								✕
							</VBtn>
						</VCol>
					</VRow>

					<VRow>
						<VCol md="10">
							<VTextField v-model="memberAddField" label="Address" variant="outlined" />
						</VCol>
						<VCol md="2">
							<VBtn
								variant="tonal"
								color="success"
								class="mt-3 w-100 rounded-xl elevation-0"
								@click="memberAdd()"
							>
								Add
							</VBtn>
						</VCol>
					</VRow>
				</VCardText>
			</VCard>

			<VCard class="mb-4 rounded-xl bg-light-frost elevation-0">
				<VCardText class="px-6 py-6">
					<h2 class="mb-6 text-center text-uppercase text-primary">🔑 Admins</h2>

					<VRow
						v-for="(m, i) in vaultDeploy.admins" :key="i"
						class="mb-3"
					>
						<VCol md="10">
							<h5 class="member-or-admin my-2">{{ m }}</h5>
						</VCol>
						<VCol md="2">
							<VBtn
								variant="flat"
								color="danger"
								class="w-100 rounded-xl elevation-0"
								@click="adminRemove(i)"
							>
								✕
							</VBtn>
						</VCol>
					</VRow>

					<VRow>
						<VCol md="10">
							<VTextField v-model="adminAddField" label="Address" variant="outlined" />
						</VCol>
						<VCol md="2">
							<VBtn
								variant="tonal"
								color="success"
								class="w-100 mt-3 rounded-xl elevation-0"
								@click="adminAdd()"
							>
								Add
							</VBtn>
						</VCol>
					</VRow>
				</VCardText>
			</VCard>

			<VTextField
				v-if="false"
				v-model="vaultDeploy.signatureManager"
				type="text"
				label="Signature Manager"
				variant="outlined"
				hide-details
				class="mb-3"
				size="small"
			/>

			<VCard
				v-if="vaultDeploy.members.length < vaultDeploy.againstVoteCountRequired"
				color="danger"
				class="mb-6 text-center text-light elevation-0 rounded-xl"
			>
				<VCardText>
					<h3 class="mb-3 text-uppercase">Invalid params!</h3>
					<h4>Against Votes cannot be less than member count.</h4>
				</VCardText>
			</VCard>

			<VCard
				v-if="vaultDeploy.members.length < vaultDeploy.forVoteCountRequired"
				color="danger"
				class="mb-6 text-center text-light elevation-0 rounded-xl"
			>
				<VCardText>
					<h3 class="mb-3 text-uppercase">Invalid params!</h3>
					<h4>For Votes cannot be less than member count.</h4>
				</VCardText>
			</VCard>

			<VBtn
				color="primary"
				class="w-100 rounded-xl elevation-0"
				:disabled="
					vaultProperties.updating ||
						vaultDeploy.deploying || (
							vaultDeploy.members.length < vaultDeploy.forVoteCountRequired ||
							vaultDeploy.members.length < vaultDeploy.againstVoteCountRequired
						) && vaultDeploy.admins.length == 0
				"
				@click="deployYieldSyncV1Vault()"
			>
				<h2>Deploy</h2>
			</VBtn>
		</VCardText>
	</VCard>


</template>

<script lang="ts">
	import { ethers } from "ethers";
	import { defineComponent } from "vue";
	import { TransactionReceipt } from "web3-core";
	import { Contract } from "web3-eth-contract";
	import { AbiItem } from "web3-utils";

	import YieldSyncV1ATransferRequestProtocol from "../../abi/YieldSyncV1ATransferRequestProtocol";

	export default defineComponent({
		name: "RVGovernance",

		data()
		{
			return {
				factory: this.$store.state.config.address[
					this.$store.state.chainName
				].yieldSyncV1VaultFactory as string,

				transferRequestProtocol: this.$store.state.config.address[
					this.$store.state.chainName
				].yieldSyncV1ATransferRequestProtocol as string,

				d: this.$store.state.etherscanDomainStart as string,

				deploymentFee: 0 as number,

				vaultProperties: {
					againstVoteCountRequired: 0 as number,
					forVoteCountRequired: 0 as number,
					transferDelaySeconds: 0 as number,
					updating: false,
				},

				adminAddField: "" as string,
				memberAddField: "" as string,

				vaultDeploy: {
					admins: [
						this.$store.state.wallet.accounts[0],
					] as string[],
					members: [
						this.$store.state.wallet.accounts[0],
					] as string[],
					signatureManager: ethers.ZeroAddress as string,
					useDefaultSignatureManager: false as boolean,

					againstVoteCountRequired: 0 as number,
					forVoteCountRequired: 0 as number,
					transferDelaySeconds: 0 as number,
					deploying: false as boolean,
				},

				error: "" as string
			};
		},

		methods: {
			adminAdd()
			{
				if (!this.$store.state.web3.utils.isAddress(this.adminAddField))
				{
					return;
				}

				for (let i = 0; i < this.vaultDeploy.admins.length; i++)
				{
					if (this.vaultDeploy.admins[i] == this.adminAddField)
					{
						return;
					}
				}

				this.vaultDeploy.admins.push(this.adminAddField);
				this.adminAddField = "";
			},

			adminRemove(i: number)
			{
				if (i > -1)
				{
					this.vaultDeploy.admins.splice(i, 1);
				}
			},

			memberAdd()
			{
				if (!this.$store.state.web3.utils.isAddress(this.memberAddField))
				{
					return;
				}

				for (let i = 0; i < this.vaultDeploy.members.length; i++)
				{
					if (this.vaultDeploy.members[i] == this.memberAddField)
					{
						return;
					}
				}

				this.vaultDeploy.members.push(this.memberAddField);
				this.memberAddField = "";

			},

			memberRemove(i: number)
			{
				if (i > -1)
				{
					this.vaultDeploy.members.splice(i, 1);
				}
			},

			async updateWalletProperties()
			{
				const transferRequestProtocol: Contract = new this.$store.state.web3.eth.Contract(
					YieldSyncV1ATransferRequestProtocol as AbiItem[],
					this.transferRequestProtocol
				);

				await transferRequestProtocol.methods.yieldSyncV1VaultAddress_yieldSyncV1VaultPropertyUpdate(
					this.$store.state.wallet.accounts[0],
					[
						this.vaultProperties.againstVoteCountRequired,
						this.vaultProperties.forVoteCountRequired,
						this.vaultProperties.transferDelaySeconds,
					]
				).send({
					from: this.$store.state.wallet.accounts[0]
				}).on(
					"sent",
					async () =>
					{
						this.vaultProperties.updating = true;
					}
				).on(
					"confirmation",
					async (confirmationNumber: number, receipt: TransactionReceipt) =>
					{
						console.log(`Confirmation #${confirmationNumber}`, receipt);

						if (confirmationNumber != 0)
						{
							return;
						}

						this.vaultDeploy.againstVoteCountRequired = this.vaultProperties.againstVoteCountRequired;
						this.vaultDeploy.forVoteCountRequired = this.vaultProperties.forVoteCountRequired;
						this.vaultDeploy.transferDelaySeconds = this.vaultProperties.transferDelaySeconds;

						this.vaultProperties.updating = false;
					}
				).on(
					"error",
					async (error: Error) =>
					{
						this.error = String(error);

						this.vaultProperties.updating = false;
					}
				);
			},

			async deployYieldSyncV1Vault()
			{
				try
				{
					await this.$store.state.contract.yieldSyncV1VaultFactory.methods.deployYieldSyncV1Vault(
						this.vaultDeploy.signatureManager,
						this.transferRequestProtocol,
						this.vaultDeploy.admins,
						this.vaultDeploy.members
					).send({
						from: this.$store.state.wallet.accounts[0]
					}).on(
						"sent",
						async () =>
						{
							this.vaultDeploy.deploying = true;
						}
					).on(
						"confirmation",
						async (confirmationNumber: number, receipt: TransactionReceipt) =>
						{
							console.log(`Confirmation #${confirmationNumber}`, receipt);

							if (confirmationNumber == 0)
							{
								this.vaultDeploy.deploying = false;
							}
						}
					).on(
						"error",
						async (error: Error) =>
						{
							this.error = String(error);

							this.vaultDeploy.deploying = false;
						}
					);
				}
				catch (e)
				{
					console.error(e);
				}
			},
		},

		async created()
		{
			this.deploymentFee = await this.$store.state.contract.yieldSyncV1VaultFactory.methods.fee().call();

			const transferRequestProtocol: Contract = new this.$store.state.web3.eth.Contract(
				YieldSyncV1ATransferRequestProtocol as AbiItem[],
				this.transferRequestProtocol
			);

			this.vaultProperties.againstVoteCountRequired = (
				await transferRequestProtocol.methods.yieldSyncV1VaultAddress_yieldSyncV1VaultProperty(
					this.$store.state.wallet.accounts[0]
				).call()
			)[0];

			this.vaultProperties.forVoteCountRequired = (
				await transferRequestProtocol.methods.yieldSyncV1VaultAddress_yieldSyncV1VaultProperty(
					this.$store.state.wallet.accounts[0]
				).call()
			)[1];

			this.vaultProperties.transferDelaySeconds = (
				await transferRequestProtocol.methods.yieldSyncV1VaultAddress_yieldSyncV1VaultProperty(
					this.$store.state.wallet.accounts[0]
				).call()
			)[2];

			this.vaultDeploy.againstVoteCountRequired = this.vaultProperties.againstVoteCountRequired;
			this.vaultDeploy.forVoteCountRequired = this.vaultProperties.forVoteCountRequired;
			this.vaultDeploy.transferDelaySeconds = this.vaultProperties.transferDelaySeconds;
		},
	});
</script>

<style lang="scss" scoped>
	.member-or-admin {
		word-wrap: break-word;
	}
</style>
