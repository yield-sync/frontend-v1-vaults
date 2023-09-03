<template>
	<!-- Preset -->
	<VCard class="mb-4 rounded-xl bg-light-frost elevation-0">
		<VCardText class="px-6 py-6">
			<VRow>
				<VCol cols="12">
					<h2 class="mb-3 text-center text-uppercase text-primary">🔧 Vault Properties (1/2)</h2>

					<h6 class="mb-6 text-center text-uppercase text-dark">
						Must be set first before deploying a vault
					</h6>
				</VCol>

				<!-- Against -->
				<VCol cols="12" md="4">
					<VTextField
						v-model="vaultProperties.voteAgainstRequired"
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
						v-model="vaultProperties.voteForRequired"
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
								vaultProperties.voteAgainstRequired == vaultDeploy.voteAgainstRequired &&
								vaultProperties.voteForRequired == vaultDeploy.voteForRequired &&
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

				<VCol
					v-if="
						vaultProperties.voteAgainstRequired != vaultDeploy.voteAgainstRequired ||
							vaultProperties.voteForRequired != vaultDeploy.voteForRequired ||
							vaultProperties.transferDelaySeconds != vaultDeploy.transferDelaySeconds
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

	<!-- TRPA Parameters -->
	<VCard
		v-if="vaultDeploy.voteAgainstRequired > 0 && vaultDeploy.voteForRequired > 0"
		class="mb-4 rounded-xl bg-light-frost elevation-0"
	>
		<VCardText class="px-6 py-6">
			<VRow>
				<VCol cols="12">
					<h2 class="mb-3 text-center text-uppercase text-primary"> 🚀 Deploy Vault (2/2)</h2>

					<h6 class="mb-6 text-center text-uppercase text-dark">
						Deployment Fee: Ξ {{ deploymentFee }}
					</h6>
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
							<a
								:href="`https://${$store.state.etherscanDomainStart}.etherscan.io/address/${m}`"
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
							<a
								:href="`https://${$store.state.etherscanDomainStart}.etherscan.io/address/${m}`"
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
				v-if="vaultDeploy.members.length < vaultDeploy.voteAgainstRequired"
				color="danger"
				class="mb-6 text-center text-light elevation-0 rounded-xl"
			>
				<VCardText>
					<h3 class="mb-3 text-uppercase">Invalid params!</h3>

					<h4>Against Votes cannot be less than member count.</h4>
				</VCardText>
			</VCard>

			<VCard
				v-if="vaultDeploy.members.length < vaultDeploy.voteForRequired"
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
							(
								vaultDeploy.members.length < vaultDeploy.voteForRequired ||
								vaultDeploy.members.length < vaultDeploy.voteAgainstRequired
							) &&
							vaultDeploy.admins.length == 0
						) || (
							vaultProperties.voteAgainstRequired != vaultDeploy.voteAgainstRequired ||
							vaultProperties.voteForRequired != vaultDeploy.voteForRequired ||
							vaultProperties.transferDelaySeconds != vaultDeploy.transferDelaySeconds
						)
				"
				@click="deployYieldSyncV1Vault()"
			>
				<VProgressCircular
					v-if="vaultDeploy.deploying"
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

	import YieldSyncV1ATransferRequestProtocol from "../../../abi/YieldSyncV1ATransferRequestProtocol";

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
				].yieldSyncV1ATransferRequestProtocol as string,

				d: this.$store.state.etherscanDomainStart as string,

				deploymentFee: 0 as number,

				vaultProperties: {
					voteAgainstRequired: 0 as number,
					voteForRequired: 0 as number,
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

					voteAgainstRequired: 0 as number,
					voteForRequired: 0 as number,
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

				transferRequestProtocol.methods.yieldSyncV1Vault_yieldSyncV1VaultPropertyUpdate(
					this.$store.state.wallet.accounts[0],
					[
						this.vaultProperties.voteAgainstRequired,
						this.vaultProperties.voteForRequired,
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

						this.vaultDeploy.voteAgainstRequired = this.vaultProperties.voteAgainstRequired;
						this.vaultDeploy.voteForRequired = this.vaultProperties.voteForRequired;
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

							this.$store.state.pages.RVDashboard.tab = "m";
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
				YieldSyncV1ATransferRequestProtocol as AbiItem[],
				this.transferRequestProtocol
			);

			const connectedWalletsVaultProperties = await transferRequestProtocol.methods
				.yieldSyncV1Vault_yieldSyncV1VaultProperty(
					this.$store.state.wallet.accounts[0]
				).call()
			;

			this.vaultProperties.voteAgainstRequired = connectedWalletsVaultProperties[0];
			this.vaultProperties.voteForRequired = connectedWalletsVaultProperties[1];
			this.vaultProperties.transferDelaySeconds = connectedWalletsVaultProperties[2];

			this.vaultDeploy.voteAgainstRequired = this.vaultProperties.voteAgainstRequired;
			this.vaultDeploy.voteForRequired = this.vaultProperties.voteForRequired;
			this.vaultDeploy.transferDelaySeconds = this.vaultProperties.transferDelaySeconds;
		},
	});
</script>

<style lang="scss" scoped>
	.member-or-admin {
		word-wrap: break-word;
	}
</style>
