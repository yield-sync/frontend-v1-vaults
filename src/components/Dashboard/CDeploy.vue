<template>
	<VCard class="mb-4 rounded-xl bg-light-frost elevation-0">
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
						><h6>🔗 Yield Sync V1 Vault Factory</h6></VBtn>
					</a>
				</VCol>

				<VCol cols="6">
					<h6 class="text-right text-uppercase text-success">Deployment Fee: {{ deploymentFee }}</h6>
				</VCol>
			</VRow>

			<VCard class="mb-4 rounded-xl bg-light-frost elevation-0">
				<VCardText class="px-6 py-6">
					<VRow>
						<VCol cols="12">
							<h2 class="mb-6 text-center text-uppercase text-primary">
								🔧 Properties
							</h2>
						</VCol>

							<!-- Against -->
						<VCol cols="12" md="4">
							<VTextField
								v-model="deployParams.againstVoteCountRequired"
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
								v-model="deployParams.forVoteCountRequired"
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
								v-model="deployParams.transferDelaySeconds"
								type="number"
								label="Transfer Delay (Seconds)"
								variant="outlined"
								hide-details
								class="mb-3"
							/>
						</VCol>
					</VRow>
				</VCardText>
			</VCard>

			<VCard class="mb-4 rounded-xl bg-light-frost elevation-0">
				<VCardText class="px-6 py-6">
					<h2 class="mb-6 text-center text-uppercase text-primary">👤 Members</h2>

					<VRow
						v-for="(m, i) in deployParams.members" :key="i"
						class="mb-3"
					>
						<VCol md="10">
							<h5 class="member-or-admin my-2">{{ m }}</h5>
						</VCol>
						<VCol md="2">
							<VBtn
								variant="tonal"
								color="danger"
								class="w-100 rounded-xl elevation-0 border"
								@click="removeMember(i)"
							>
								✕
							</VBtn>
						</VCol>
					</VRow>

					<VRow>
						<VCol md="10">
							<VTextField v-model="addMemberField" label="Address" variant="outlined" />
						</VCol>
						<VCol md="2">
							<VBtn
								variant="tonal"
								color="success"
								class="w-100 rounded-xl elevation-0 border"
								@click="addMember()"
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
						v-for="(m, i) in deployParams.admins" :key="i"
						class="mb-3"
					>
						<VCol md="10">
							<h5 class="member-or-admin my-2">{{ m }}</h5>
						</VCol>
						<VCol md="2">
							<VBtn
								variant="tonal"
								color="danger"
								class="w-100 rounded-xl elevation-0 border"
								@click="removeAdmin(i)"
							>
								✕
							</VBtn>
						</VCol>
					</VRow>

					<VRow>
						<VCol md="10">
							<VTextField v-model="addAdminField" label="Address" variant="outlined" />
						</VCol>
						<VCol md="2">
							<VBtn
								variant="tonal"
								color="success"
								class="w-100 rounded-xl elevation-0 border"
								@click="addAdmin()"
							>
								Add
							</VBtn>
						</VCol>
					</VRow>
				</VCardText>
			</VCard>

			<VTextField
				v-if="false"
				v-model="deployParams.signatureManager"
				type="text"
				label="Signature Manager"
				variant="outlined"
				hide-details
				class="mb-3"
				size="small"
			/>

			<VCard
				v-if="deployParams.members.length < deployParams.againstVoteCountRequired"
				color="danger"
				class="mb-6 text-center text-light elevation-0 rounded-xl"
			>
				<VCardText>
					<h3 class="mb-3 text-uppercase">Invalid params!</h3>
					<h4>Against Votes cannot be less than member count.</h4>
				</VCardText>
			</VCard>

			<VCard
				v-if="deployParams.members.length < deployParams.forVoteCountRequired"
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
					deploying ||
					(
						deployParams.members.length < deployParams.forVoteCountRequired ||
						deployParams.members.length < deployParams.againstVoteCountRequired
					) && deployParams.admins.length == 0
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


	export default defineComponent({
		name: "RVGovernance",

		data()
		{
			return {
				deploying: false,
				factory: this.$store.state.config.address[this.$store.state.chainName].yieldSyncV1VaultFactory,
				d: this.$store.state.etherscanDomainStart,

				addAdminField: "",
				addMemberField: "",

				deploymentFee: 0,

				deployParams: {
					admins: [
						this.$store.state.wallet.accounts[0],
					] as string[],
					members: [
						this.$store.state.wallet.accounts[0],
					] as string[],
					signatureManager: ethers.ZeroAddress as string,
					useDefaultSignatureManager: false as boolean,
					againstVoteCountRequired: 1 as number,
					forVoteCountRequired: 1 as number,
					transferDelaySeconds: 0 as number
				},

				error: ""
			};
		},

		methods: {
			async deployYieldSyncV1Vault()
			{
				try
				{
					await this.$store.state.contract.yieldSyncV1VaultFactory.methods.deployYieldSyncV1Vault(
						this.deployParams.admins,
						this.deployParams.members,
						this.deployParams.signatureManager,
						this.deployParams.useDefaultSignatureManager,
						this.deployParams.againstVoteCountRequired,
						this.deployParams.forVoteCountRequired,
						this.deployParams.transferDelaySeconds
					).send({
						from: this.$store.state.wallet.accounts[0]
					}).on("sent", async () =>
					{
						this.deploying = true;
					}).on("confirmation", async (confirmationNumber: number, receipt: TransactionReceipt) =>
					{
						console.log(`Confirmation #${confirmationNumber}`, receipt);

						if (confirmationNumber == 0)
						{
							this.deploying = false;

						}
					}).on("error", async (error: Error) =>
					{
						this.error = String(error);

						this.deploying = false;
					});
				}
				catch (e)
				{
					console.error(e);
				}
			},

			addAdmin()
			{
				if (!this.$store.state.web3.utils.isAddress(this.addAdminField))
				{
					return;
				}

				for (let i = 0; i < this.deployParams.admins.length; i++) {
					if (this.deployParams.admins[i] == this.addAdminField)
					{
						return;
					}
				}

				this.deployParams.admins.push(this.addAdminField);
				this.addAdminField = "";
			},

			removeAdmin(i: number)
			{
				if (i > -1)
				{
					this.deployParams.admins.splice(i, 1);
				}
			},

			addMember()
			{
				if (!this.$store.state.web3.utils.isAddress(this.addMemberField))
				{
					return;
				}

				for (let i = 0; i < this.deployParams.members.length; i++) {
					if (this.deployParams.members[i] == this.addMemberField)
					{
						return;
					}
				}

				this.deployParams.members.push(this.addMemberField);
				this.addMemberField = "";

			},

			removeMember(i: number)
			{
				if (i > -1)
				{
					this.deployParams.members.splice(i, 1);
				}
			}
		},

		async created()
		{
			this.deploymentFee = await this.$store.state.contract.yieldSyncV1VaultFactory.methods.fee().call();
		},
	});
</script>

<style lang="scss" scoped>
	.member-or-admin {
		word-wrap: break-word;
	}
</style>
