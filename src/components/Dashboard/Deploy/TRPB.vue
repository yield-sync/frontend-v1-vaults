<template>
	<VCard class="mb-4 rounded-xl bg-light-frost elevation-0">
		<VCardText class="px-6 py-6">
			<VRow>
				<VCol cols="12">
					<h2 class="mb-3 text-center text-uppercase text-primary">🔧 Vault Properties (1/2)</h2>

					<h6 class="mb-6 text-center text-uppercase text-dark">
						Must be set first before deploying a vault<br/>
						(Max = 0 => No Max)
					</h6>
				</VCol>

				<!-- Against -->
				<VCol cols="12" md="3">
					<VTextField
						v-model="this.vaultProperties.voteAgainstRequired"
						type="number"
						label="Against Vote Count"
						variant="outlined"
						hide-details
						class="mb-3"
					/>
				</VCol>

				<!-- For -->
				<VCol cols="12" md="3">
					<VTextField
						v-model="this.vaultProperties.voteForRequired"
						type="number"
						label="For Vote Count"
						variant="outlined"
						hide-details
						class="mb-3"
					/>
				</VCol>

				<!-- Min -->
				<VCol cols="12" md="3">
					<VTextField
						v-model="this.vaultProperties.minVotePeriodSeconds"
						type="number"
						label="Min Vote Period Seconds"
						variant="outlined"
						hide-details
						class="mb-3"
					/>
				</VCol>

				<!-- Max -->
				<VCol cols="12" md="3">
					<VTextField
						v-model="this.vaultProperties.maxVotePeriodSeconds"
						type="number"
						label="Max Vote Period Seconds"
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
						@click="this.updateWalletProperties()"
						:disabled="
							this.vaultProperties.updating || (
								this.vaultProperties.voteAgainstRequired == this.vaultDeploy.voteAgainstRequired &&
								this.vaultProperties.voteForRequired == this.vaultDeploy.voteForRequired &&
								this.vaultProperties.maxVotePeriodSeconds == this.vaultDeploy.maxVotePeriodSeconds &&
								this.vaultProperties.minVotePeriodSeconds == this.vaultDeploy.minVotePeriodSeconds
							)
						"
					>
						<VProgressCircular
							v-if="this.vaultProperties.updating"
							indeterminate
							color="light"
							class=""
						/>

						<h2 v-else>Update</h2>
					</VBtn>
				</VCol>

				<VCol
					v-if="
						this.vaultProperties.voteAgainstRequired != this.vaultDeploy.voteAgainstRequired ||
							this.vaultProperties.voteForRequired != this.vaultDeploy.voteForRequired
					"
					cols="12"
				>
					<VCard color="warning" class="text-center text-dark elevation-0 rounded-xl">
						<VCardText>
							<h4 class="mb-3 text-uppercase font-weight-bold">Warning!</h4>

							<h6 class="m-0 text-uppercase">
								Please update before deploying, otherwise changes will not apply.
							</h6>
						</VCardText>
					</VCard>
				</VCol>
			</VRow>
		</VCardText>
	</VCard>

	<VCard
		v-if="this.vaultDeploy.voteAgainstRequired > 0 && this.vaultDeploy.voteForRequired > 0"
		class="mb-4 rounded-xl bg-light-frost elevation-0"
	>
		<VCardText class="px-6 py-6">
			<VRow>
				<VCol cols="12">
					<h2 class="mb-3 text-center text-uppercase text-primary"> 🚀 Deploy Vault (2/2)</h2>

					<h6 class="mb-6 text-center text-uppercase text-dark">
						Deployment Fee: Ξ {{ this.deploymentFee }}
					</h6>
				</VCol>
			</VRow>

			<VCard class="mb-4 rounded-xl bg-light-frost elevation-0">
				<VCardText class="px-6 py-6">
					<h2 class="mb-6 text-center text-uppercase text-primary">👤 Members</h2>

					<VRow
						v-for="(m, i) in this.vaultDeploy.members" :key="i"
						class="mb-3"
					>
						<VCol md="10">
							<a
								:href="`https://${this.$store.state.etherscanDomainStart}.etherscan.io/address/${m}`"
								target="_blank"
								rel="noopener noreferrer"
							>
								<VBtn variant="tonal" color="dark" class="word-wrap rounded-xl">
									{{ m }}
								</VBtn>
							</a>
						</VCol>

						<VCol md="2">
							<VBtn
								variant="flat"
								color="danger"
								class="w-100 rounded-xl elevation-0"
								@click="this.memberRemove(i)"
							>
								✕
							</VBtn>
						</VCol>
					</VRow>

					<VRow>
						<VCol md="10">
							<VTextField v-model="this.memberAddField" label="Address" variant="outlined"/>
						</VCol>

						<VCol md="2">
							<VBtn
								variant="tonal"
								color="success"
								class="mt-3 w-100 rounded-xl elevation-0"
								@click="this.memberAdd()"
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
						v-for="(m, i) in this.vaultDeploy.admins" :key="i"
						class="mb-3"
					>
						<VCol md="10">
							<a
								:href="`https://${this.$store.state.etherscanDomainStart}.etherscan.io/address/${m}`"
								target="_blank"
								rel="noopener noreferrer"
							>
								<VBtn variant="tonal" color="dark" class="word-wrap rounded-xl">
									{{ m }}
								</VBtn>
							</a>
						</VCol>

						<VCol md="2">
							<VBtn
								variant="flat"
								color="danger"
								class="w-100 rounded-xl elevation-0"
								@click="this.adminRemove(i)"
							>
								✕
							</VBtn>
						</VCol>
					</VRow>

					<VRow>
						<VCol md="10">
							<VTextField v-model="this.adminAddField" label="Address" variant="outlined"/>
						</VCol>

						<VCol md="2">
							<VBtn
								variant="tonal"
								color="success"
								class="w-100 mt-3 rounded-xl elevation-0"
								@click="this.adminAdd()"
							>
								Add
							</VBtn>
						</VCol>
					</VRow>
				</VCardText>
			</VCard>

			<VTextField
				v-if="false"
				v-model="this.vaultDeploy.signatureManager"
				type="text"
				label="Signature Manager"
				variant="outlined"
				hide-details
				class="mb-3"
				size="small"
			/>

			<VCard
				v-if="this.vaultDeploy.members.length < this.vaultDeploy.voteAgainstRequired"
				color="danger"
				class="mb-6 text-center text-light elevation-0 rounded-xl"
			>
				<VCardText>
					<h3 class="mb-3 text-uppercase">Invalid params!</h3>

					<h4>Against Votes cannot be less than member count.</h4>
				</VCardText>
			</VCard>

			<VCard
				v-if="this.vaultDeploy.members.length < this.vaultDeploy.voteForRequired"
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
					this.vaultProperties.updating ||
						this.vaultDeploy.deploying || (
							(
								this.vaultDeploy.members.length < this.vaultDeploy.voteForRequired ||
								this.vaultDeploy.members.length < this.vaultDeploy.voteAgainstRequired
							) &&
							this.vaultDeploy.admins.length == 0
						) || (
							this.vaultProperties.voteAgainstRequired != this.vaultDeploy.voteAgainstRequired ||
							this.vaultProperties.voteForRequired != this.vaultDeploy.voteForRequired
						)
				"
				@click="this.deployYieldSyncV1Vault()"
			>
				<VProgressCircular
					v-if="this.vaultDeploy.deploying"
					indeterminate
					color="light"
				/>

				<h2 v-else>Deploy</h2>
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

	import YieldSyncV1BTransferRequestProtocol from "../../../abi/YieldSyncV1BTransferRequestProtocol";

	export default defineComponent({
		name: "TRPA",

		data()
		{
			return {
				factory: this.$store.state.config.networkChain[
					this.$store.state.currentChain.name
				].yieldSyncV1VaultFactory as string,

				transferRequestProtocol: this.$store.state.config.networkChain[
					this.$store.state.currentChain.name
				].yieldSyncV1BTransferRequestProtocol as string,

				d: this.$store.state.etherscanDomainStart as string,

				deploymentFee: 0 as number,

				vaultProperties: {
					voteAgainstRequired: 0 as number,
					voteForRequired: 0 as number,
					maxVotePeriodSeconds: 0 as number,
					minVotePeriodSeconds: 0 as number,
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

					voteAgainstRequired: 0 as number,
					voteForRequired: 0 as number,
					maxVotePeriodSeconds: 0 as number,
					minVotePeriodSeconds: 0 as number,

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
					YieldSyncV1BTransferRequestProtocol as AbiItem[],
					this.transferRequestProtocol
				);

				transferRequestProtocol.methods.yieldSyncV1Vault_yieldSyncV1VaultPropertyUpdate(
					this.$store.state.wallet.accounts[0],
					[
						this.vaultProperties.voteAgainstRequired,
						this.vaultProperties.voteForRequired,
						this.vaultProperties.maxVotePeriodSeconds,
						this.vaultProperties.minVotePeriodSeconds,
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

						this.vaultDeploy.voteAgainstRequired = this.vaultProperties.voteAgainstRequired;
						this.vaultDeploy.voteForRequired = this.vaultProperties.voteForRequired;
						this.vaultDeploy.maxVotePeriodSeconds = this.vaultProperties.maxVotePeriodSeconds;
						this.vaultDeploy.minVotePeriodSeconds = this.vaultProperties.minVotePeriodSeconds;

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
				this.$store.state.contract.yieldSyncV1VaultFactory.methods.deployYieldSyncV1Vault(
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

							this.$store.state.view.dashboard.tab = "m";
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
			},
		},

		async created(): Promise<void>
		{
			this.deploymentFee = await this.$store.state.contract.yieldSyncV1VaultFactory.methods.fee().call();

			const transferRequestProtocol: Contract = new this.$store.state.web3.eth.Contract(
				YieldSyncV1BTransferRequestProtocol as AbiItem[],
				this.transferRequestProtocol
			);

			const connectedWalletsVaultProperties = await transferRequestProtocol.methods
				.yieldSyncV1Vault_yieldSyncV1VaultProperty(
					this.$store.state.wallet.accounts[0]
				).call()
			;

			this.vaultProperties.voteAgainstRequired = connectedWalletsVaultProperties.voteAgainstRequired;
			this.vaultProperties.voteForRequired = connectedWalletsVaultProperties.voteForRequired;
			this.vaultProperties.maxVotePeriodSeconds = connectedWalletsVaultProperties.maxVotePeriodSeconds;
			this.vaultProperties.minVotePeriodSeconds = connectedWalletsVaultProperties.minVotePeriodSeconds;

			this.vaultDeploy.voteAgainstRequired = this.vaultProperties.voteAgainstRequired;
			this.vaultDeploy.voteForRequired = this.vaultProperties.voteForRequired;
			this.vaultDeploy.maxVotePeriodSeconds = this.vaultProperties.maxVotePeriodSeconds;
			this.vaultDeploy.minVotePeriodSeconds = this.vaultProperties.minVotePeriodSeconds;
		},
	});
</script>

<style lang="scss" scoped>
	.member-or-admin {
		word-wrap: break-word;
	}
</style>
