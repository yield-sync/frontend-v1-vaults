<template>
	<VRow>
		<VCol cols="6" class="">
			<a
				:href="`https://${d}.etherscan.io/address/${factory}#readContract`"
				target="_blank"
				rel="noopener noreferrer"
			>
				<VBtn variant="plain" size="sm"><h6>🔗 Yield Sync V1 Vault Factory</h6></VBtn>
			</a>
		</VCol>

		<VCol cols="6" class="text-right">
			<h6>Deployment Fee: {{ deploymentFee }}</h6>
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

		<!-- Members -->
		<VCol cols="12">
			<div class="mb-4 px-3 py-3 bg-light">
				<h3 class="text-primary">Members</h3>

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
							class="w-100"
							@click="addMember()"
						>
							Add
						</VBtn>
					</VCol>
				</VRow>
			</div>
		</VCol>

		<!-- Admins -->
		<VCol cols="12">
			<div class="mb-4 px-3 py-3 bg-light">
				<h3 class="text-primary">Admins</h3>

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
							class="w-100"
							@click="addAdmin()"
						>
							Add
						</VBtn>
					</VCol>
				</VRow>
			</div>
		</VCol>

		<!-- Sig Manager -->
		<VCol v-if="false" cols="12">
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

		<VCol cols="12">
			<VBtn color="primary" class="w-100 rounded-xl elevation-0" :disabled="deploying" @click="deployYieldSyncV1Vault()">
				<h2>Deploy</h2>
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
