<template>
	<VRow>
		<VCol cols="12" class="text-right">
			<a
				:href="`https://${d}.etherscan.io/address/${factory}#readContract`"
				target="_blank"
				rel="noopener noreferrer"
			>
				<VBtn variant="plain" size="sm"><h6>🔗 Yield Sync V1 Vault Factory</h6></VBtn>
			</a>
		</VCol>

		<!-- Sig Manager -->
		<VCol cols="12">
			<VTextField
				v-model="deployParams.signatureManager"
				type="text"
				label="Signature Manager"
				variant="outlined"
				hide-details
				class="mb-3"
				size="small"
			/>
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

		<!-- Withdrawal Delay -->
		<VCol cols="12" md="4">
			<VTextField
				v-model="deployParams.withdrawalDelaySeconds"
				type="number"
				label="Withdrawal Delay (Seconds)"
				variant="outlined"
				hide-details
				class="mb-3"
			/>
		</VCol>

		<!-- Admins -->
		<VCol cols="12" md="6">
			<div class="mb-4 px-3 py-3 border">
				<h5>Admins</h5>

				<VRow
					v-for="(m, i) in deployParams.admins" :key="i"
					class="mb-3"
				>
					<VCol md="10">
						<h6 class="member-or-admin my-2">{{ m }}</h6>
					</VCol>
					<VCol md="2">
						<VBtn
							variant="tonal"
							color="warning"
							size="small"
							class="w-100"
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
							class="w-100 my-3"
							size="small"
							@click="addAdmin()"
						>
							+
						</VBtn>
					</VCol>
				</VRow>
			</div>
		</VCol>

		<!-- Members -->
		<VCol cols="12" md="6">
			<div class="mb-4 px-3 py-3 border">
				<h5>Members</h5>

				<VRow
					v-for="(m, i) in deployParams.members" :key="i"
					class="mb-3"
				>
					<VCol md="10">
						<h6 class="member-or-admin my-2">{{ m }}</h6>
					</VCol>
					<VCol md="2">
						<VBtn
							variant="tonal"
							color="warning"
							size="small"
							class="w-100"
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
							class="w-100 my-3"
							size="small"
							@click="addMember()"
						>
							+
						</VBtn>
					</VCol>
				</VRow>
			</div>
		</VCol>

		<VCol cols="12">
			<h6>Deployment Fee: {{ deploymentFee }}</h6>
			<VBtn color="primary" class="w-100 elevation-0" :disabled="deploying" @click="deployYieldSyncV1Vault()">
				Deploy
			</VBtn>
		</VCol>
	</VRow>
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
					againstVoteCountRequired: 1 as number | undefined,
					forVoteCountRequired: 1 as number | undefined,
					withdrawalDelaySeconds: 0 as number | undefined
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
						this.deployParams.withdrawalDelaySeconds
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
				if (this.$store.state.web3.utils.isAddress(this.addAdminField))
				{
					this.deployParams.admins.push(this.addAdminField);
					this.addAdminField = "";
				}
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
				if (this.$store.state.web3.utils.isAddress(this.addMemberField))
				{
					this.deployParams.members.push(this.addMemberField);
					this.addMemberField = "";
				}
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
